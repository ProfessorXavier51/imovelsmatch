// ============================================
// 📦 MODULE: imovel.module.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Organiza tudo relacionado a imóveis.
//
// 📚 ANALOGIA: DEPARTAMENTO DE IMÓVEIS 🏢
// - Tem o balcão de atendimento (Controller)
// - Tem os casos de uso (Create, Update, Delete, etc)
// - Usa o banco de dados (DatabaseModule)
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra manter o código organizado e modular.
// Facilita manutenção e testes.
// ============================================

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { ImovelController } from '../controllers/imovel.controller';
import { CreateImovelUseCase } from '../../application/use-cases/imovel/create-imovel.use-case';
import { ListImoveisUseCase } from '../../application/use-cases/imovel/list-imoveis.use-case';

/**
 * 🏗️ MODULE: ImovelModule
 *
 * 🎯 O QUE FAZ?
 * Gerencia todas as operações relacionadas a imóveis.
 *
 * 📦 COMPONENTES:
 * - ImovelController: Rotas HTTP
 * - CreateImovelUseCase: Lógica de criação
 * - (Futuros): Update, Delete, List, Find
 *
 * 📥 IMPORTA:
 * - DatabaseModule: Acesso ao ImovelRepository
 *
 * 🎯 FUNCIONALIDADES:
 * - Cadastrar imóveis
 * - Listar imóveis com filtros
 * - Buscar imóvel por ID
 * - Atualizar dados do imóvel
 * - Deletar imóvel
 * - Upload de fotos (via UploadModule)
 */
@Module({
  imports: [DatabaseModule], // Precisa do repositório
  controllers: [ImovelController],
  providers: [
    CreateImovelUseCase,
    ListImoveisUseCase,
    // TODO: Adicionar outros use cases:
    // - FindImovelUseCase
    // - UpdateImovelUseCase
    // - DeleteImovelUseCase
  ],
})
export class ImovelModule {}

// ============================================
// 📝 PRÓXIMOS PASSOS:
// ============================================
//
// 1. Implementar use cases faltantes:
//    - ListImoveisUseCase (com filtros e paginação)
//    - FindImovelUseCase (buscar por ID)
//    - UpdateImovelUseCase (atualizar dados)
//    - DeleteImovelUseCase (remover imóvel)
//
// 2. Integrar com UploadModule:
//    - Permitir upload de múltiplas fotos
//    - Validar tipos de arquivo
//    - Limitar tamanho
//
// 3. Adicionar validações de negócio:
//    - Não permitir valor negativo
//    - Validar CEP
//    - Validar coordenadas GPS
// ============================================
