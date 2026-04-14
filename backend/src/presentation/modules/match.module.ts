// ============================================
// 📦 MODULE: match.module.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Organiza o sistema de matching (compatibilidade).
//
// 📚 ANALOGIA: DEPARTAMENTO DE MATCHMAKING 💘
// - Tem o atendente (Controller)
// - Tem o algoritmo do amor (Use Case)
// - Usa o banco de dados pra buscar clientes
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra separar a lógica de matching do resto do sistema.
// Facilita manutenção e testes.
// ============================================

import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { MatchController } from '../controllers/match.controller';
import { FindMatchesForImovelUseCase } from '../../application/use-cases/match/find-matches-for-imovel.use-case';

/**
 * 🏗️ MODULE: MatchModule
 *
 * 🎯 O QUE FAZ?
 * Gerencia o sistema de matching entre imóveis e clientes.
 *
 * 📦 COMPONENTES:
 * - MatchController: Recebe requisições de matching
 * - FindMatchesForImovelUseCase: Algoritmo de compatibilidade
 *
 * 📥 IMPORTA:
 * - DatabaseModule: Acesso aos repositórios (Cliente, Imóvel)
 *
 * 🎯 FUNCIONALIDADES:
 * - Encontrar clientes compatíveis com imóvel
 * - Filtrar por cidade, valor, tipo, bairro
 * - Retornar lista ordenada de matches
 */
@Module({
  imports: [DatabaseModule], // Precisa dos repositórios
  controllers: [MatchController],
  providers: [FindMatchesForImovelUseCase],
})
export class MatchModule {}
