// ============================================
// 🗂️ MODULE: database.module.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Configura e exporta tudo relacionado ao banco de dados.
//
// 📚 ANALOGIA: É a SALA DE ARQUIVOS DA EMPRESA 🗄️
// - Tem o porteiro (PrismaService)
// - Tem os arquivistas (Repositories)
// - Outros setores podem pedir acesso
//
// 🤔 POR QUÊ MODULE?
// Para organizar e reutilizar código:
// - Agrupa coisas relacionadas
// - Exporta para outros módulos
// - Dependency Injection automática
// ============================================

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClienteRepository } from './repositories/prisma-cliente.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { PrismaImovelRepository } from './repositories/prisma-imovel.repository';

/**
 * 🏗️ MODULE: DatabaseModule
 *
 * 📚 ANALOGIA: É o DEPARTAMENTO DE TI 💻
 * - Cuida de tudo relacionado a banco de dados
 * - Fornece serviços para outros departamentos
 *
 * 🎯 O QUE FAZ?
 * - Registra PrismaService (conexão com banco)
 * - Registra Repositories (acesso a dados)
 * - Exporta para outros módulos usarem
 *
 * 🔄 COMO FUNCIONA?
 * 1. NestJS cria PrismaService
 * 2. NestJS injeta PrismaService nos Repositories
 * 3. Exporta tudo para outros módulos
 */
@Module({
  // ========================================
  // PROVIDERS (O que este módulo fornece)
  // ========================================
  // 📦 Lista de classes que podem ser injetadas
  providers: [
    // 🔌 PrismaService: Conexão com banco
    // 📚 Analogia: Porteiro do prédio
    PrismaService,

    // 📚 Repository de Cliente (Interface → Implementação)
    // 📚 Analogia: Bibliotecário especializado em clientes
    {
      // Nome da interface (o que outros módulos pedem)
      provide: 'IClienteRepository',
      
      // Implementação concreta (o que é entregue)
      useClass: PrismaClienteRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: 'IImovelRepository',
      useClass: PrismaImovelRepository,
    },
  ],

  // ========================================
  // EXPORTS (O que este módulo exporta)
  // ========================================
  // 📤 Lista do que outros módulos podem usar
  exports: [
    // Exporta PrismaService
    // 🎯 Por quê? Outros repositories podem precisar
    PrismaService,

    // Exporta IClienteRepository
    // 🎯 Por quê? Use cases vão precisar
    'IClienteRepository',
    
    // Exporta IUserRepository
    'IUserRepository',
    
    // Exporta IImovelRepository
    'IImovelRepository',
  ],

  // 💡 QUEM PODE USAR?
  // Qualquer módulo que importar DatabaseModule:
  // - ClienteModule
  // - ImovelModule (futuro)
  // - NegociacaoModule (futuro)
})
export class DatabaseModule {}

// ============================================
// 📚 COMO USAR EM OUTROS MÓDULOS
// ============================================
//
// ✅ EXEMPLO: ClienteModule
//
// @Module({
//   imports: [DatabaseModule], // ← Importa este módulo
//   providers: [
//     CreateClienteUseCase,
//     // Use case pode injetar IClienteRepository:
//     // constructor(@Inject('IClienteRepository') private repo: IClienteRepository)
//   ]
// })
// export class ClienteModule {}
//
// ============================================
