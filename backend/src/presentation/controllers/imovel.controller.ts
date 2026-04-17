// ============================================
// 📦 CONTROLLER: imovel.controller.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Gerencia todas as rotas de imóveis (CRUD completo).
//
// 📚 ANALOGIA: BALCÃO DE ATENDIMENTO DA IMOBILIÁRIA 🏢
// - Cadastrar imóvel novo
// - Buscar imóvel por ID
// - Listar todos os imóveis com filtros
// - Atualizar dados do imóvel
// - Deletar imóvel
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra expor as funcionalidades de imóveis via API REST.
// O frontend chama essas rotas pra gerenciar imóveis.
// ============================================

import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { CreateImovelDTO } from '../../application/dtos/imovel/create-imovel.dto';
import { UpdateImovelDTO } from '../../application/dtos/imovel/update-imovel.dto';
import { ImovelResponseDTO } from '../../application/dtos/imovel/imovel-response.dto';
import { CreateImovelUseCase } from '../../application/use-cases/imovel/create-imovel.use-case';
import { ListImoveisUseCase } from '../../application/use-cases/imovel/list-imoveis.use-case';

/**
 * 🏗️ CONTROLLER: ImovelController
 *
 * 🎯 O QUE FAZ?
 * Gerencia operações CRUD de imóveis.
 *
 * 📚 ANALOGIA: Recepção da Imobiliária
 * - Recebe solicitações do cliente (frontend)
 * - Delega pro caso de uso apropriado
 * - Retorna resposta formatada
 */
@ApiTags('imoveis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('imoveis')
export class ImovelController {
  constructor(
    private createImovelUseCase: CreateImovelUseCase,
    private listImoveisUseCase: ListImoveisUseCase,
  ) {}

  /**
   * 🏗️ ROTA: POST /imoveis
   *
   * 🎯 O QUE FAZ? Cadastra um novo imóvel.
   *
   * 📥 ENTRADA: CreateImovelDTO (título, tipo, valor, etc)
   * 📤 SAÍDA: Imóvel criado com ID
   * 🔒 SEGURANÇA: Requer JWT
   */
  @Post()
  @ApiOperation({ summary: 'Criar novo imóvel' })
  @ApiResponse({ status: 201, description: 'Imóvel criado com sucesso' })
  async create(@Body() dto: CreateImovelDTO) {
    return this.createImovelUseCase.execute(dto);
  }

  /**
   * 📋 ROTA: GET /imoveis
   *
   * 🎯 O QUE FAZ? Lista imóveis com filtros e paginação.
   *
   * 📥 QUERY PARAMS:
   * - cidade, estado, bairro
   * - valorMinimo, valorMaximo
   * - tipoImovel, operacao
   * - page, pageSize
   *
   * 📤 SAÍDA: Lista paginada de imóveis
   */
  @Get()
  @ApiOperation({ summary: 'Listar imóveis' })
  async findAll(@Query() query: any) {
    const filters = {
      cidade: query.cidade,
      estado: query.estado,
      bairro: query.bairro,
      operacao: query.operacao,
      tipoImovel: query.tipoImovel,
      valorMinimo: query.valorMinimo ? Number(query.valorMinimo) : undefined,
      valorMaximo: query.valorMaximo ? Number(query.valorMaximo) : undefined,
      quartosMinimo: query.quartosMinimo ? Number(query.quartosMinimo) : undefined,
      vagasMinimo: query.vagasMinimo ? Number(query.vagasMinimo) : undefined,
      publicado: query.publicado !== undefined ? query.publicado === 'true' : undefined,
      search: query.search,
    };

    const page = query.page ? Number(query.page) : 1;
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;

    const result = await this.listImoveisUseCase.execute(filters, page, pageSize);

    // Converter Entities → DTOs
    return {
      ...result,
      data: ImovelResponseDTO.fromEntityArray(result.data),
    };
  }

  /**
   * 🔍 ROTA: GET /imoveis/:id
   *
   * 🎯 O QUE FAZ? Busca um imóvel específico por ID.
   *
   * 📥 ENTRADA: ID do imóvel
   * 📤 SAÍDA: Dados completos do imóvel
   */
  @Get(':id')
  @ApiOperation({ summary: 'Buscar imóvel por ID' })
  async findOne(@Param('id') id: string) {
    // TODO: Implementar FindImovelUseCase
    return { message: 'Buscar imóvel - implementar' };
  }

  /**
   * 🔄 ROTA: PATCH /imoveis/:id
   *
   * 🎯 O QUE FAZ? Atualiza dados de um imóvel.
   *
   * 📥 ENTRADA:
   * - ID do imóvel
   * - UpdateImovelDTO (campos a atualizar)
   *
   * 📤 SAÍDA: Imóvel atualizado
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar imóvel' })
  async update(@Param('id') id: string, @Body() dto: UpdateImovelDTO) {
    // TODO: Implementar UpdateImovelUseCase
    return { message: 'Atualizar imóvel - implementar' };
  }

  /**
   * 🗑️ ROTA: DELETE /imoveis/:id
   *
   * 🎯 O QUE FAZ? Remove um imóvel do sistema.
   *
   * 📥 ENTRADA: ID do imóvel
   * 📤 SAÍDA: 204 No Content (sucesso sem corpo)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar imóvel' })
  async delete(@Param('id') id: string) {
    // TODO: Implementar DeleteImovelUseCase
    return { message: 'Deletar imóvel - implementar' };
  }
}

// ============================================
// 📝 EXEMPLOS DE USO:
// ============================================
//
// 1. CRIAR IMÓVEL:
// POST /imoveis
// {
//   "titulo": "Casa 3 quartos",
//   "slug": "casa-3-quartos-sp",
//   "tipoImovel": "CASA",
//   "operacao": "VENDA",
//   "valor": 500000,
//   "endereco": "Rua das Flores, 123",
//   "bairro": "Centro",
//   "cidade": "São Paulo",
//   "estado": "SP"
// }
//
// 2. LISTAR IMÓVEIS:
// GET /imoveis?cidade=São Paulo&valorMaximo=600000
//
// 3. BUSCAR IMÓVEL:
// GET /imoveis/123
//
// 4. ATUALIZAR IMÓVEL:
// PATCH /imoveis/123
// { "valor": 550000 }
//
// 5. DELETAR IMÓVEL:
// DELETE /imoveis/123
// ============================================
