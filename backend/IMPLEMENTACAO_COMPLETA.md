# 🚀 GUIA COMPLETO DE IMPLEMENTAÇÃO - IMOVELSMATCH BACKEND

## 📋 ÍNDICE
1. [AuthModule - Autenticação JWT](#1-authmodule)
2. [ImovelModule - CRUD de Imóveis](#2-imovelmodule)
3. [UploadModule - Cloudinary](#3-uploadmodule)
4. [MatchModule - Sistema de Matching](#4-matchmodule)
5. [NotificationModule - Email + WhatsApp](#5-notificationmodule)
6. [Redis Cache](#6-redis-cache)
7. [Rate Limiting](#7-rate-limiting)
8. [Logger Winston](#8-logger-winston)
9. [WebSocket Gateway](#9-websocket-gateway)
10. [Testes E2E](#10-testes-e2e)

---

## 1. AUTHMODULE

### ✅ Já Criado:
- ✅ `src/domain/entities/user.entity.ts`
- ✅ `src/domain/repositories/user.repository.interface.ts`
- ✅ Schema Prisma atualizado com campo `role`

### 📦 Dependências Instaladas:
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npm install -D @types/passport-jwt @types/bcryptjs
```

### 🔧 Arquivos a Criar:

#### 1.1. Repository Implementation
**Arquivo:** `src/infrastructure/database/repositories/prisma-user.repository.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        nome: user.nome,
        email: user.email,
        senha: user.senha,
        role: user.role,
        ativo: user.ativo,
      },
    });
    return this.toDomain(created);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        nome: user.nome,
        email: user.email,
        role: user.role,
        ativo: user.ativo,
      },
    });
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => this.toDomain(u));
  }

  private toDomain(prismaUser: PrismaUser): User {
    return new User(
      {
        nome: prismaUser.nome,
        email: prismaUser.email,
        senha: prismaUser.senha,
        role: prismaUser.role as 'ADMIN' | 'USER',
      },
      prismaUser.id,
    );
  }
}
```

#### 1.2. DTOs
**Arquivo:** `src/application/dtos/auth/register.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ example: 'joao@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;
}
```

**Arquivo:** `src/application/dtos/auth/login.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'joao@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  @IsString()
  senha: string;
}
```

#### 1.3. Use Cases
**Arquivo:** `src/application/use-cases/auth/register.use-case.ts`

```typescript
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(data: { nome: string; email: string; senha: string }): Promise<User> {
    const exists = await this.userRepository.findByEmail(data.email);
    if (exists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const user = new User({
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
    });

    return this.userRepository.create(user);
  }
}
```

**Arquivo:** `src/application/use-cases/auth/login.use-case.ts`

```typescript
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(email: string, senha: string): Promise<{ access_token: string; user: any }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.ativo) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    };
  }
}
```

#### 1.4. JWT Strategy
**Arquivo:** `src/infrastructure/auth/jwt.strategy.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret-key-change-in-production',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
```

#### 1.5. Guards
**Arquivo:** `src/infrastructure/auth/jwt-auth.guard.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**Arquivo:** `src/infrastructure/auth/roles.guard.ts`

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.some((role) => user.role === role);
  }
}
```

#### 1.6. Decorators
**Arquivo:** `src/infrastructure/auth/roles.decorator.ts`

```typescript
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

#### 1.7. Controller
**Arquivo:** `src/presentation/controllers/auth.controller.ts`

```typescript
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDTO } from '../../application/dtos/auth/register.dto';
import { LoginDTO } from '../../application/dtos/auth/login.dto';
import { RegisterUseCase } from '../../application/use-cases/auth/register.use-case';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async register(@Body() dto: RegisterDTO) {
    const user = await this.registerUseCase.execute(dto);
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  async login(@Body() dto: LoginDTO) {
    return this.loginUseCase.execute(dto.email, dto.senha);
  }
}
```

#### 1.8. Module
**Arquivo:** `src/presentation/modules/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUseCase } from '../../application/use-cases/auth/register.use-case';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';
import { DatabaseModule } from '../../infrastructure/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-key-change-in-production',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [RegisterUseCase, LoginUseCase, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
```

#### 1.9. Atualizar DatabaseModule
Adicionar provider do UserRepository em `src/infrastructure/database/database.module.ts`:

```typescript
{
  provide: 'IUserRepository',
  useClass: PrismaUserRepository,
},
```

#### 1.10. Atualizar AppModule
Importar AuthModule em `src/app.module.ts`:

```typescript
imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  ClienteModule,
  AuthModule, // ← Adicionar
],
```

#### 1.11. Adicionar ao .env
```env
JWT_SECRET=seu-secret-super-seguro-aqui
```

### ✅ Testar Auth:
```bash
# Registrar
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Admin","email":"admin@test.com","senha":"123456"}'

# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","senha":"123456"}'

# Usar token em rotas protegidas
curl http://localhost:3001/clientes \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 2. IMOVELMODULE

### 🔧 Estrutura:
- Entity: `src/domain/entities/imovel.entity.ts`
- Repository Interface: `src/domain/repositories/imovel.repository.interface.ts`
- Repository Implementation: `src/infrastructure/database/repositories/prisma-imovel.repository.ts`
- DTOs: `src/application/dtos/imovel/*.dto.ts`
- Use Cases: `src/application/use-cases/imovel/*.use-case.ts`
- Controller: `src/presentation/controllers/imovel.controller.ts`
- Module: `src/presentation/modules/imovel.module.ts`

### 📝 Schema Prisma já existe!
O model `Imovel` já está definido no schema.prisma

---

## 3. UPLOADMODULE - Cloudinary

### 📦 Dependências:
```bash
npm install cloudinary multer
npm install -D @types/multer
```

### 🔧 Arquivos:
- Service: `src/infrastructure/upload/cloudinary.service.ts`
- Controller: `src/presentation/controllers/upload.controller.ts`
- Module: `src/presentation/modules/upload.module.ts`

---

## 4. MATCHMODULE

### 🔧 Estrutura:
- Service: `src/application/services/match.service.ts`
- Use Case: `src/application/use-cases/match/find-matches.use-case.ts`
- Controller: `src/presentation/controllers/match.controller.ts`
- Module: `src/presentation/modules/match.module.ts`

---

## 5. NOTIFICATIONMODULE

### 📦 Dependências:
```bash
npm install @nestjs-modules/mailer nodemailer axios
npm install -D @types/nodemailer
```

### 🔧 Estrutura:
- Email Service: `src/infrastructure/notification/email.service.ts`
- WhatsApp Service: `src/infrastructure/notification/whatsapp.service.ts`
- Module: `src/presentation/modules/notification.module.ts`

---

## 6. REDIS CACHE

### 📦 Dependências:
```bash
npm install @nestjs/cache-manager cache-manager cache-manager-redis-store redis
npm install -D @types/cache-manager
```

---

## 7. RATE LIMITING

### 📦 Dependências:
```bash
npm install @nestjs/throttler
```

---

## 8. LOGGER WINSTON

### 📦 Dependências:
```bash
npm install nest-winston winston
```

---

## 9. WEBSOCKET

### 📦 Dependências:
```bash
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
npm install -D @types/socket.io
```

---

## 10. TESTES E2E

### 📦 Dependências:
```bash
npm install -D @nestjs/testing supertest @types/supertest
```

---

## 🚀 ORDEM DE IMPLEMENTAÇÃO RECOMENDADA:

1. ✅ **AuthModule** (Base para segurança)
2. **ImovelModule** (CRUD principal)
3. **UploadModule** (Para fotos dos imóveis)
4. **MatchModule** (Lógica de negócio principal)
5. **NotificationModule** (Notificações)
6. **Redis + Rate Limiting** (Performance e segurança)
7. **Logger** (Monitoramento)
8. **WebSocket** (Real-time)
9. **Testes E2E** (Qualidade)

---

## 📝 COMANDOS ÚTEIS:

```bash
# Gerar migration
npx prisma migrate dev --name add_user_role

# Gerar Prisma Client
npx prisma generate

# Rodar servidor
npm run start:dev

# Rodar testes
npm test

# Ver documentação
http://localhost:3001/api/docs
```
