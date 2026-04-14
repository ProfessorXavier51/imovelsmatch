# 🏠 ImoveisMatch - Backend (NestJS)

## 📋 Descrição

Backend do sistema ImoveisMatch desenvolvido com **Clean Architecture**, **SOLID** e **Clean Code**.

## 🏗️ Arquitetura

### **Camadas:**

```
Domain Layer       → Entities, Value Objects, Repository Interfaces
Application Layer  → Use Cases, Events, DTOs
Infrastructure     → Prisma, Services (Email, WhatsApp), HTTP Clients
Presentation       → Controllers, Guards, Interceptors, Filters
```

### **Princípios Aplicados:**

- ✅ **Clean Architecture** - Separação em camadas
- ✅ **SOLID** - Todos os 5 princípios
- ✅ **Clean Code** - Código limpo e documentado
- ✅ **DDD** - Domain-Driven Design
- ✅ **Use Cases** - Lógica de negócio isolada

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Copiar .env.example para .env
cp .env.example .env

# Configurar variáveis de ambiente no .env

# Gerar Prisma Client
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Rodar seeds (dados de teste)
npx prisma db seed
```

## 💻 Desenvolvimento

```bash
# Modo desenvolvimento (watch mode)
npm run start:dev

# Build para produção
npm run build

# Rodar produção
npm run start:prod
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 📦 Estrutura de Pastas

```
src/
├── domain/                    # Camada de Domínio
│   ├── entities/              # Entidades
│   ├── value-objects/         # Value Objects
│   ├── repositories/          # Interfaces de repositórios
│   └── exceptions/            # Exceções de domínio
│
├── application/               # Camada de Aplicação
│   ├── use-cases/             # Casos de uso
│   ├── dtos/                  # DTOs
│   └── events/                # Eventos
│
├── infrastructure/            # Camada de Infraestrutura
│   ├── database/              # Prisma, repositories
│   └── services/              # Email, WhatsApp, Storage
│
├── presentation/              # Camada de Apresentação
│   ├── controllers/           # Controllers
│   ├── guards/                # Guards
│   └── filters/               # Exception filters
│
└── shared/                    # Código compartilhado
    ├── enums/                 # Enums
    └── utils/                 # Utilitários
```

## 🔧 Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM
- **MySQL** - Banco de dados
- **Bull** - Filas
- **Redis** - Cache e filas
- **JWT** - Autenticação
- **Cloudinary** - Upload de imagens
- **Nodemailer** - Envio de e-mails

## 📚 Documentação

Cada arquivo contém comentários detalhados explicando:
- **POR QUÊ** - Motivo da decisão
- **COMO** - Funcionamento técnico
- **QUANDO** - Momento de uso
- **ONDE** - Contexto de aplicação

## 🔒 Segurança

- ✅ Validação de dados (class-validator)
- ✅ Sanitização de inputs
- ✅ JWT para autenticação
- ✅ Guards para autorização
- ✅ Rate limiting
- ✅ CORS configurado

## 📝 Licença

MIT
