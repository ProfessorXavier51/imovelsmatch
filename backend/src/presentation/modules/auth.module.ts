// ============================================
// 🗂️ MODULE: auth.module.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Agrupa tudo relacionado a autenticação (JWT, login, registro).
//
// 📚 ANALOGIA: O DEPARTAMENTO DE SEGURANÇA 🔐
// - Tem portaria (AuthController)
// - Tem cadastro de novos (RegisterUseCase)
// - Tem validação de crachá (LoginUseCase + JwtStrategy)
// - Tem impressora de crachás (JwtModule)
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra centralizar toda a lógica de autenticação.
// Sem isso, cada módulo teria que implementar login sozinho (bagunça total!).
// ============================================

// 📦 ONDE: Importa decorator Module do NestJS
// 🎯 O QUE: Module organiza funcionalidades relacionadas
import { Module } from '@nestjs/common';

// 📦 ONDE: Importa módulo JWT do NestJS
// 🎯 O QUE: JwtModule gera e valida tokens JWT
// 🤔 POR QUÊ: Pra criar os tokens de autenticação
import { JwtModule } from '@nestjs/jwt';

// 📦 ONDE: Importa módulo Passport do NestJS
// 🎯 O QUE: PassportModule integra estratégias de autenticação
// 🤔 POR QUÊ: Pra usar JwtStrategy
import { PassportModule } from '@nestjs/passport';

// 📦 ONDE: Importa controller de autenticação
// 🎯 O QUE: AuthController gerencia rotas /auth/register e /auth/login
// 🤔 POR QUÊ: Pra expor endpoints HTTP de autenticação
import { AuthController } from '../controllers/auth.controller';

// 📦 ONDE: Importa use cases de autenticação
// 🎯 O QUE: RegisterUseCase = lógica de cadastro, LoginUseCase = lógica de login
// 🤔 POR QUÊ: Pra separar lógica de negócio da lógica HTTP
import { RegisterUseCase } from '../../application/use-cases/auth/register.use-case';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';

// 📦 ONDE: Importa estratégia JWT
// 🎯 O QUE: JwtStrategy valida tokens JWT nas requisições
// 🤔 POR QUÊ: Pra proteger rotas que precisam de autenticação
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';

// 📦 ONDE: Importa módulo de banco de dados
// 🎯 O QUE: DatabaseModule fornece acesso aos repositórios
// 🤔 POR QUÊ: Use cases precisam do UserRepository
import { DatabaseModule } from '../../infrastructure/database/database.module';

/**
 * 🏗️ MODULE: AuthModule
 * 
 * 🎯 O QUE É? Módulo de autenticação e autorização.
 * 📚 COMO? Configura JWT, registra use cases e controller.
 * 📍 ONDE? Importado no AppModule.
 * 🤔 POR QUÊ? Pra centralizar toda lógica de autenticação.
 * ⏰ QUANDO? Sempre que precisar de login/registro/proteção de rotas.
 */
@Module({
  // ========================================
  // 📥 IMPORTS (Módulos que este módulo usa)
  // ========================================
  imports: [
    // 🗄️ DatabaseModule: Fornece UserRepository
    // 🎯 O QUE: Acesso ao banco de dados
    // 🤔 POR QUÊ: Use cases precisam salvar/buscar usuários
    DatabaseModule,
    
    // 🛂 PassportModule: Estratégias de autenticação
    // 🎯 O QUE: Framework de autenticação
    // 🤔 POR QUÊ: Pra usar JwtStrategy
    PassportModule,
    
    // 🔑 JwtModule: Geração e validação de tokens
    // 🎯 O QUE: Configura JWT com secret e expiração
    // 🤔 POR QUÊ: Pra criar tokens de autenticação
    JwtModule.register({
      // 🔐 SECRET: Chave secreta pra assinar tokens
      // 🎯 O QUE: String usada pra criptografar/descriptografar JWT
      // 🤔 POR QUÊ: Sem isso, qualquer um pode falsificar tokens
      // ⚠️ ATENÇÃO: NUNCA commitar a chave real! Usar .env
      secret: process.env.JWT_SECRET || 'secret-key-change-in-production',
      
      // ⏰ EXPIRAÇÃO: Quanto tempo o token é válido
      // 🎯 O QUE: Token expira em 7 dias
      // 🤔 POR QUÊ: Pra forçar re-login periodicamente (segurança)
      signOptions: { expiresIn: '7d' },
    }),
  ],

  // ========================================
  // 🎮 CONTROLLERS (Rotas HTTP)
  // ========================================
  controllers: [
    // 🚪 AuthController: Gerencia /auth/register e /auth/login
    // 🎯 O QUE: Expõe endpoints de autenticação
    // 🤔 POR QUÊ: Pra frontend poder cadastrar e logar usuários
    AuthController,
  ],

  // ========================================
  // 📦 PROVIDERS (Classes injetáveis)
  // ========================================
  providers: [
    // 📝 RegisterUseCase: Lógica de cadastro
    // 🎯 O QUE: Cria novo usuário no banco
    // 🤔 POR QUÊ: Pra separar lógica de negócio do controller
    RegisterUseCase,
    
    // 🔑 LoginUseCase: Lógica de login
    // 🎯 O QUE: Valida credenciais e gera token
    // 🤔 POR QUÊ: Pra separar lógica de negócio do controller
    LoginUseCase,
    
    // 🛡️ JwtStrategy: Validação de tokens
    // 🎯 O QUE: Extrai e valida JWT das requisições
    // 🤔 POR QUÊ: Pra proteger rotas com @UseGuards(JwtAuthGuard)
    JwtStrategy,
  ],

  // ========================================
  // 📤 EXPORTS (O que outros módulos podem usar)
  // ========================================
  exports: [
    // 🔑 JwtModule: Exporta pra outros módulos usarem
    // 🎯 O QUE: Permite outros módulos gerarem tokens
    // 🤔 POR QUÊ: Caso algum módulo precise gerar JWT manualmente
    // 📚 EXEMPLO: ResetPasswordModule pode precisar gerar token de reset
    JwtModule,
  ],
})
export class AuthModule {}

// ============================================
// 📚 FLUXO DE AUTENTICAÇÃO
// ============================================
//
// 🔄 REGISTRO (POST /auth/register):
// 1. Frontend envia { nome, email, senha }
// 2. AuthController.register() recebe
// 3. RegisterUseCase.execute() valida e cria usuário
// 4. Senha é criptografada com bcrypt
// 5. Usuário salvo no banco
// 6. Retorna dados do usuário (sem senha!)
//
// 🔄 LOGIN (POST /auth/login):
// 1. Frontend envia { email, senha }
// 2. AuthController.login() recebe
// 3. LoginUseCase.execute() valida credenciais
// 4. Compara senha com bcrypt
// 5. Se válido, gera token JWT
// 6. Retorna { access_token, user }
//
// 🔄 ROTA PROTEGIDA (GET /clientes):
// 1. Frontend envia com header: Authorization: Bearer <token>
// 2. JwtAuthGuard intercepta requisição
// 3. JwtStrategy.validate() extrai e valida token
// 4. Se válido, injeta user no request
// 5. Controller acessa request.user
// 6. Retorna dados
//
// ============================================
