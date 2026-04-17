// ============================================
// 📦 CONTROLLER: match.controller.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Encontra clientes compatíveis com um imóvel (matching).
//
// 📚 ANALOGIA: O CUPIDO DA IMOBILIÁRIA 💘
// - Você cadastra uma casa.
// - O Cupido procura quem tá procurando casa parecida.
// - Retorna lista de clientes que deram "match".
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra automatizar o trabalho do corretor!
// Em vez de ligar pra todo mundo, o sistema já mostra
// quem tem perfil compatível com aquele imóvel.
//
// 🎮 QUANDO USAR?
// Quando cadastrar um imóvel novo e quiser saber
// quais clientes podem se interessar.
// ============================================

// 📦 ONDE: Importa decorators do NestJS pra criar rotas HTTP
// 🎯 O QUE: Controller = classe de rotas, Get = método GET, Param = parâmetro da URL, UseGuards = proteção
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

// 📦 ONDE: Importa decorators do Swagger pra documentar a API
// 🎯 O QUE: ApiTags = agrupa rotas, ApiBearerAuth = requer token, ApiOperation = descreve, ApiResponse = documenta respostas
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

// 📦 ONDE: Importa o guarda JWT pra proteger a rota
// 🎯 O QUE: JwtAuthGuard valida se o usuário está autenticado
// 🤔 POR QUÊ: Só usuários logados podem buscar matches
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';

// 📦 ONDE: Importa o caso de uso de matching
// 🎯 O QUE: FindMatchesForImovelUseCase contém a lógica de encontrar clientes compatíveis
// 🤔 POR QUÊ: Pra separar lógica de negócio da lógica HTTP
import { FindMatchesForImovelUseCase } from '../../application/use-cases/match/find-matches-for-imovel.use-case';

/**
 * 🏗️ CLASSE: MatchController
 *
 * 🎯 O QUE É? Controlador de matching (compatibilidade imóvel x cliente).
 * 📚 COMO? Recebe ID do imóvel → Busca clientes compatíveis → Retorna lista.
 * 📍 ONDE? Rota base: /matches
 * 🤔 POR QUÊ? Pra expor endpoint de matching via API REST.
 * ⏰ QUANDO? Quando o corretor quer saber quem se interessa por um imóvel.
 */
@ApiTags('matches') // 🏷️ O QUE: Agrupa rotas no Swagger sob a tag "matches"
@ApiBearerAuth() // 🔑 O QUE: Indica que precisa de token JWT no Swagger
@UseGuards(JwtAuthGuard) // 👮 O QUE: Aplica proteção JWT em TODAS as rotas deste controller
@Controller('matches') // 🌐 O QUE: Define prefixo de rota "/matches"
export class MatchController {

  /**
   * 🏗️ CONSTRUTOR
   * 
   * 🎯 O QUE FAZ? Injeta o caso de uso de matching.
   * 📚 COMO? O NestJS vê "private" e automaticamente injeta a dependência.
   * 🤔 POR QUÊ? Pra poder usar o use case dentro do controller.
   * ⏰ QUANDO? Na criação da instância do controller (boot do app).
   */
  constructor(
    private findMatchesUseCase: FindMatchesForImovelUseCase // 💘 Caso de uso de matching injetado
  ) { }

  /**
   * 💘 MÉTODO: findMatchesForImovel
   * 
   * 🎯 O QUE FAZ? Busca clientes compatíveis com um imóvel.
   * 📚 COMO? Busca imóvel por ID → Aplica filtros → Retorna matches.
   * � ONDE? Rota: GET /matches/imovel/:id
   * 🤔 POR QUÊ? Pra automatizar a busca de clientes interessados.
   * ⏰ QUANDO? Quando o corretor quer saber quem combina com o imóvel.
   * 
   * � ENTRADA: id (ID do imóvel)
   * 📤 SAÍDA: Array de clientes compatíveis
   * 
   * 🔍 CRITÉRIOS DE MATCH:
   * - Cidade e estado iguais
   * - Tipo de interesse compatível (COMPRAR/ALUGAR)
   * - Valor dentro do orçamento do cliente
   * - Bairro preferido (se especificado)
   * - Tipo de imóvel desejado (se especificado)
   * 
   * 📚 EXEMPLO DE USO:
   * GET http://localhost:3001/matches/imovel/550e8400-e29b-41d4-a716-446655440000
   * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   * 
   * 📤 RESPOSTA:
   * {
   *   "matches": [
   *     { "id": "...", "nome": "João Silva", "email": "joao@gmail.com", ... },
   *     { "id": "...", "nome": "Maria Santos", "email": "maria@gmail.com", ... }
   *   ]
   * }
   */
  @Get('imovel/:id') // 🌐 O QUE: Define método HTTP GET na rota /matches/imovel/:id
  @ApiOperation({ summary: 'Buscar clientes compatíveis com imóvel' }) // 📋 O QUE: Documenta operação no Swagger
  @ApiResponse({ status: 200, description: 'Lista de clientes que deram match' }) // ✅ Resposta de sucesso
  async findMatchesForImovel(
    @Param('id') id: string // 📥 O QUE: Extrai o parâmetro 'id' da URL
  ) {
    // ========================================
    // ⚠️ TODO: IMPLEMENTAR BUSCA DO IMÓVEL
    // ========================================
    // 🎯 O QUE: Buscar imóvel por ID no banco
    // 📚 COMO: const imovel = await this.imovelRepository.findById(id);
    // 🤔 POR QUÊ: Precisa dos dados do imóvel pra fazer matching
    // ⏰ QUANDO: Antes de chamar o use case

    // ========================================
    // ⚠️ TODO: CHAMAR USE CASE DE MATCHING
    // ========================================
    // 🎯 O QUE: Encontrar clientes compatíveis
    // 📚 COMO: return this.findMatchesUseCase.execute(imovel);
    // 🤔 POR QUÊ: Use case contém a lógica de matching
    // ⏰ QUANDO: Após buscar o imóvel

    // ========================================
    // 📤 RESPOSTA TEMPORÁRIA (MOCK)
    // ========================================
    // 🎯 O QUE: Retorna mensagem indicando que precisa implementar
    // 📚 COMO: Objeto com mensagem
    // 🤔 POR QUÊ: Pra não quebrar a API enquanto não implementa
    // ⏰ QUANDO: Enquanto não tiver ImovelRepository injetado
    return {
      message: 'Buscar matches para imóvel - implementar busca do imóvel primeiro',
      // 📝 NOTA: Quando implementar, vai retornar:
      // matches: Cliente[] (array de clientes compatíveis)
    };
  }
}
