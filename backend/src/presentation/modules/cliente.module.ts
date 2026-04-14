// ============================================
// 🗂️ MODULE: cliente.module.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Agrupa tudo relacionado a clientes (controller, use cases).
//
// 📚 ANALOGIA: É o DEPARTAMENTO DE CLIENTES 🏢
// - Tem atendentes (controller)
// - Tem especialistas (use cases)
// - Usa arquivistas (repositories do DatabaseModule)
//
// 🤔 POR QUÊ MODULE?
// Para organizar funcionalidades:
// - Tudo de cliente num lugar só
// - Fácil de encontrar e manter
// - Dependency Injection automática
// ============================================

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { ClienteController } from '../controllers/cliente.controller';
import {
  CreateClienteUseCase,
  FindClienteUseCase,
  UpdateClienteUseCase,
  DeleteClienteUseCase,
  ListClientesUseCase,
} from '../../application/use-cases/cliente';

/**
 * 🏗️ MODULE: ClienteModule
 *
 * 📚 ANALOGIA: É o SETOR DE ATENDIMENTO AO CLIENTE 🧑‍💼
 * - Tem balcão de atendimento (controller)
 * - Tem equipe especializada (use cases)
 * - Usa arquivo da empresa (database module)
 *
 * 🎯 O QUE FAZ?
 * - Registra controller de clientes
 * - Registra todos os use cases
 * - Importa DatabaseModule (para usar repositories)
 *
 * 🔄 COMO FUNCIONA?
 * 1. Importa DatabaseModule (traz IClienteRepository)
 * 2. Cria todos os use cases
 * 3. Injeta IClienteRepository nos use cases
 * 4. Cria controller
 * 5. Injeta use cases no controller
 */
@Module({
  // ========================================
  // IMPORTS (O que este módulo precisa)
  // ========================================
  // 📥 Lista de módulos que vamos usar
  imports: [
    // 🗄️ DatabaseModule: Fornece PrismaService e Repositories
    // 📚 Analogia: Acesso à sala de arquivos
    DatabaseModule,
  ],

  // ========================================
  // CONTROLLERS (Rotas HTTP)
  // ========================================
  // 🎮 Lista de controllers deste módulo
  controllers: [
    // 🧑‍💼 ClienteController: Gerencia rotas /clientes
    // 📚 Analogia: Balcão de atendimento
    ClienteController,
  ],

  // ========================================
  // PROVIDERS (Use Cases)
  // ========================================
  // 📦 Lista de classes que podem ser injetadas
  providers: [
    // 🎬 Use Case: Criar cliente
    // 📚 Analogia: Especialista em cadastro
    CreateClienteUseCase,

    // 🎬 Use Case: Buscar cliente
    // 📚 Analogia: Especialista em consulta
    FindClienteUseCase,

    // 🎬 Use Case: Atualizar cliente
    // 📚 Analogia: Especialista em edição
    UpdateClienteUseCase,

    // 🎬 Use Case: Deletar cliente
    // 📚 Analogia: Especialista em cancelamento
    DeleteClienteUseCase,

    // 🎬 Use Case: Listar clientes
    // 📚 Analogia: Especialista em relatórios
    ListClientesUseCase,

    // 💡 DEPENDENCY INJECTION:
    // NestJS injeta automaticamente:
    // - IClienteRepository nos use cases
    // - Use cases no controller
    //
    // 📚 ANALOGIA: É como DELIVERY
    // - Você pede (constructor)
    // - NestJS entrega (injeta)
    // - Você usa
  ],

  // ========================================
  // EXPORTS (O que este módulo exporta)
  // ========================================
  // 📤 Lista do que outros módulos podem usar
  exports: [
    // Por enquanto, não exportamos nada
    // Use cases são privados deste módulo
    // Apenas o controller é público (rotas HTTP)
    
    // 💡 QUANDO EXPORTAR?
    // Se outro módulo precisar dos use cases:
    // - ImovelModule pode precisar de ListClientesUseCase
    // - Aí exportamos aqui
  ],
})
export class ClienteModule {}

// ============================================
// 📚 FLUXO COMPLETO DE UMA REQUISIÇÃO
// ============================================
//
// 🔄 EXEMPLO: POST /clientes
//
// 1. 📡 Frontend envia POST /clientes
//    ↓
// 2. 🎮 NestJS roteia para ClienteController.create()
//    ↓
// 3. ✅ NestJS valida CreateClienteDTO (class-validator)
//    ↓
// 4. 🎬 Controller chama CreateClienteUseCase.execute()
//    ↓
// 5. 📚 Use case usa IClienteRepository
//    ↓
// 6. 🗄️ Repository (PrismaClienteRepository) acessa banco
//    ↓
// 7. 💾 Prisma executa INSERT no MySQL
//    ↓
// 8. 📦 Repository retorna Entity Cliente
//    ↓
// 9. 🎬 Use case retorna Entity para Controller
//    ↓
// 10. 🎮 Controller converte Entity → ClienteResponseDTO
//    ↓
// 11. 📡 NestJS serializa DTO → JSON
//    ↓
// 12. ✅ Frontend recebe HTTP 201 + JSON
//
// ============================================
// 📚 DEPENDENCY INJECTION (Injeção de Dependências)
// ============================================
//
// 🎯 COMO FUNCIONA?
//
// 1. ClienteController precisa de use cases:
//    constructor(
//      private createUseCase: CreateClienteUseCase,
//      ...
//    )
//
// 2. CreateClienteUseCase precisa de repository:
//    constructor(
//      @Inject('IClienteRepository')
//      private repo: IClienteRepository
//    )
//
// 3. NestJS resolve automaticamente:
//    - Cria PrismaService
//    - Cria PrismaClienteRepository (injeta PrismaService)
//    - Cria CreateClienteUseCase (injeta Repository)
//    - Cria ClienteController (injeta Use Cases)
//
// 📚 ANALOGIA: É como MONTAR UM LEGO
// - Cada peça se encaixa na outra
// - NestJS monta tudo automaticamente
// - Você só define as peças (providers)
//
// ============================================
