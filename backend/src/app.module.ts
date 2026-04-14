// ============================================
// 🗂️ MODULE: app.module.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É o módulo RAIZ da aplicação. Importa todos os outros módulos.
//
// 📚 ANALOGIA: É a MATRIZ DA EMPRESA 🏢
// - Coordena todos os departamentos
// - Cada departamento é um módulo
// - Tudo começa aqui
//
// 🤔 POR QUÊ AppModule?
// É o ponto de entrada do NestJS:
// - Primeiro módulo carregado
// - Importa todos os outros
// - Configura aplicação global
// ============================================

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import { APP_GUARD } from '@nestjs/core';
import { ClienteModule } from './presentation/modules/cliente.module';
import { AuthModule } from './presentation/modules/auth.module';
import { ImovelModule } from './presentation/modules/imovel.module';
import { UploadModule } from './presentation/modules/upload.module';
import { MatchModule } from './presentation/modules/match.module';
import { NotificationsGateway } from './infrastructure/websocket/notifications.gateway';
import { cacheConfig } from './infrastructure/cache/cache.config';
import { throttlerConfig } from './infrastructure/throttler/throttler.config';
import { winstonConfig } from './infrastructure/logger/winston.config';

/**
 * 🏗️ MODULE: AppModule
 *
 * 📚 ANALOGIA: É o PRÉDIO INTEIRO 🏢
 * - Tem vários andares (módulos)
 * - Cada andar tem sua função
 * - Tudo conectado
 *
 * 🎯 O QUE FAZ?
 * - Importa ConfigModule (variáveis de ambiente)
 * - Importa ClienteModule (funcionalidades de cliente)
 * - Importa outros módulos futuros
 *
 * 🔄 COMO FUNCIONA?
 * 1. NestJS carrega AppModule
 * 2. AppModule importa ConfigModule
 * 3. AppModule importa ClienteModule
 * 4. Cada módulo carrega suas dependências
 * 5. Aplicação pronta para rodar!
 */
@Module({
  // ========================================
  // IMPORTS (Módulos da aplicação)
  // ========================================
  // 📥 Lista de módulos que compõem a aplicação
  imports: [
    // ========================================
    // 1. ConfigModule (Variáveis de Ambiente)
    // ========================================
    // 🔧 Carrega variáveis do arquivo .env
    // 📚 Analogia: Configurações da empresa
    ConfigModule.forRoot({
      // isGlobal: true = Disponível em todos os módulos
      // 📚 Analogia: Regras que valem pra empresa toda
      isGlobal: true,

      // envFilePath: Caminho do arquivo .env
      // 📚 Analogia: Onde ficam as senhas e configurações
      envFilePath: '.env',

    }),

    // ========================================
    // AuthModule - Autenticação JWT
    // ========================================
    // � O que faz? Login, registro e autenticação
    // 📚 Analogia: Portaria do prédio
    AuthModule,

    // ========================================
    // ClienteModule - Gerenciamento de Clientes
    // ========================================
    // 🏢 O que faz? Tudo relacionado a clientes
    // 📚 Analogia: Departamento de Clientes
    ClienteModule,

    // ========================================
    // ImovelModule - Gerenciamento de Imóveis
    // ========================================
    // 🏠 O que faz? CRUD de imóveis
    // 📚 Analogia: Departamento de Imóveis
    ImovelModule,

    // ========================================
    // UploadModule - Upload de Imagens
    // ========================================
    // 📸 O que faz? Upload de fotos para Cloudinary
    // 📚 Analogia: Departamento de Fotografia
    UploadModule,

    // ========================================
    // MatchModule - Sistema de Matching
    // ========================================
    // 🎯 O que faz? Encontra clientes para imóveis
    // 📚 Analogia: Departamento de Matchmaking
    MatchModule,

    // ========================================
    // CacheModule - Cache em Memória
    // ========================================
    // �️ O que faz? Armazena dados em memória rápida
    // 📚 Analogia: Gaveta de atalhos
    CacheModule.register(cacheConfig),

    // ========================================
    // ThrottlerModule - Rate Limiting
    // ========================================
    // 🚧 O que faz? Limita requisições por tempo
    // 📚 Analogia: Segurança da balada
    ThrottlerModule.forRoot(throttlerConfig),

    // ========================================
    // WinstonModule - Logger Profissional
    // ========================================
    // 📝 O que faz? Registra logs estruturados
    // 📚 Analogia: Diário profissional
    WinstonModule.forRoot(winstonConfig),
  ],

  // ========================================
  // CONTROLLERS (Rotas Globais)
  // ========================================
  // 🎮 Controllers que não pertencem a nenhum módulo específico
  controllers: [
    // Por enquanto, vazio
    // Todos os controllers estão nos módulos específicos
    
    // 💡 QUANDO USAR?
    // - HealthController (GET /health)
    // - AppController (GET /)
  ],

  // ========================================
  // PROVIDERS (Serviços Globais)
  // ========================================
  // � Serviços disponíveis em toda aplicação
  providers: [
    // ========================================
    // ThrottlerGuard - Proteção Global
    // ========================================
    // 🚧 Aplica rate limiting em TODAS as rotas
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    
    // ========================================
    // NotificationsGateway - WebSocket
    // ========================================
    // 📻 Gateway para notificações em tempo real
    NotificationsGateway,
  ],
})
export class AppModule {}

// ============================================
// 📚 ESTRUTURA DA APLICAÇÃO
// ============================================
//
// 🏢 AppModule (Raiz)
//  │
//  ├── 🔧 ConfigModule (Variáveis de ambiente)
//  │
//  ├── 🧑‍💼 ClienteModule
//  │    ├── 🎮 ClienteController (Rotas HTTP)
//  │    ├── 🎬 CreateClienteUseCase
//  │    ├── 🎬 FindClienteUseCase
//  │    ├── 🎬 UpdateClienteUseCase
//  │    ├── 🎬 DeleteClienteUseCase
//  │    ├── 🎬 ListClientesUseCase
//  │    └── 🗄️ DatabaseModule
//  │         ├── 🔌 PrismaService
//  │         └── 📚 PrismaClienteRepository
//  │
//  ├── 🏠 ImovelModule (futuro)
//  ├── 🤝 NegociacaoModule (futuro)
//  ├── 🔐 AuthModule (futuro)
//  └── 📧 NotificationModule (futuro)
//
// ============================================
// 📚 FLUXO DE INICIALIZAÇÃO
// ============================================
//
// 🔄 QUANDO VOCÊ RODA: npm run start:dev
//
// 1. 🚀 NestJS carrega main.ts
//    ↓
// 2. 🏗️ main.ts cria aplicação com AppModule
//    ↓
// 3. 🔧 AppModule carrega ConfigModule
//    ↓
// 4. 📄 ConfigModule lê .env
//    ↓
// 5. 🧑‍💼 AppModule carrega ClienteModule
//    ↓
// 6. 🗄️ ClienteModule carrega DatabaseModule
//    ↓
// 7. 🔌 DatabaseModule cria PrismaService
//    ↓
// 8. 📚 DatabaseModule cria PrismaClienteRepository
//    ↓
// 9. 🎬 ClienteModule cria Use Cases
//    ↓
// 10. 🎮 ClienteModule cria ClienteController
//    ↓
// 11. ✅ Aplicação pronta!
//    ↓
// 12. 🌐 Servidor escutando em http://localhost:3001
//
// ============================================
