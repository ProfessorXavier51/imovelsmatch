/**
 * Controller: Negociações
 * CRUD completo para gerenciamento de negociações e atividades
 */

import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@ApiTags('negociacoes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('negociacoes')
export class NegociacaoController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as negociações' })
  @ApiResponse({ status: 200, description: 'Lista de negociações' })
  async findAll(@Query() query: any) {
    const { clienteId, imovelId, etapa, page = 1, limit = 50 } = query;
    
    const where: any = {};
    if (clienteId) where.clienteId = clienteId;
    if (imovelId) where.imovelId = imovelId;
    if (etapa) where.etapa = etapa;

    const [negociacoes, total] = await Promise.all([
      this.prisma.negociacao.findMany({
        where,
        include: {
          cliente: { select: { id: true, nome: true, email: true, telefone: true } },
          imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true } },
          atividades: {
            orderBy: { createdAt: 'desc' },
            take: 5
          }
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { updatedAt: 'desc' }
      }),
      this.prisma.negociacao.count({ where })
    ]);

    return {
      data: negociacoes,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar negociação por ID' })
  async findOne(@Param('id') id: string) {
    return this.prisma.negociacao.findUnique({
      where: { id },
      include: {
        cliente: { select: { id: true, nome: true, email: true, telefone: true, telefoneWhatsapp: true } },
        imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true, operacao: true, tipoImovel: true } },
        atividades: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova negociação' })
  async create(@Body() data: any) {
    console.log('🔍 Dados recebidos para criar negociação:', data);
    try {
      const result = await this.prisma.negociacao.create({
        data: {
          clienteId: data.clienteId,
          imovelId: data.imovelId,
          responsavelId: data.responsavelId,
          etapa: data.etapa || 'CONTATO_INICIAL',
          percentualMatch: data.percentualMatch || 0,
          valorProposta: data.valorProposta ? String(data.valorProposta) : null,
          observacoes: data.observacoes,
          status: data.status || 'ATIVA'
        },
        include: {
          cliente: { select: { id: true, nome: true, email: true, telefone: true } },
          imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true } }
        }
      });
      console.log('✅ Negociação criada com sucesso:', result.id);
      return result;
    } catch (error: any) {
      console.error('❌ Erro ao criar negociação:', error.message);
      console.error('Stack:', error.stack);
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar negociação' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.prisma.negociacao.update({
      where: { id },
      data: {
        etapa: data.etapa,
        percentualMatch: data.percentualMatch,
        valorProposta: data.valorProposta ? String(data.valorProposta) : undefined,
        observacoes: data.observacoes,
        status: data.status,
        dataFechamento: data.dataFechamento,
        motivoPerda: data.motivoPerda
      },
      include: {
        cliente: { select: { id: true, nome: true, email: true, telefone: true } },
        imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true } }
      }
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover negociação' })
  async delete(@Param('id') id: string) {
    await this.prisma.atividade.deleteMany({ where: { negociacaoId: id } });
    return this.prisma.negociacao.delete({ where: { id } });
  }

  // ============ ATIVIDADES ============

  @Get(':id/atividades')
  @ApiOperation({ summary: 'Listar atividades da negociação' })
  async getAtividades(@Param('id') negociacaoId: string) {
    return this.prisma.atividade.findMany({
      where: { negociacaoId },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Post(':id/atividades')
  @ApiOperation({ summary: 'Adicionar atividade à negociação' })
  async addAtividade(@Param('id') negociacaoId: string, @Body() data: any) {
    const atividade = await this.prisma.atividade.create({
      data: {
        negociacaoId,
        tipo: data.tipo,
        descricao: data.descricao,
        dataAgendada: data.dataAgendada ? new Date(data.dataAgendada) : null,
        status: data.status || 'PENDENTE',
        resultado: data.resultado,
        observacoes: data.observacoes
      }
    });

    // Atualizar a negociação com a data da última atividade
    await this.prisma.negociacao.update({
      where: { id: negociacaoId },
      data: { updatedAt: new Date() }
    });

    return atividade;
  }

  @Put('atividades/:atividadeId')
  @ApiOperation({ summary: 'Atualizar atividade' })
  async updateAtividade(@Param('atividadeId') id: string, @Body() data: any) {
    return this.prisma.atividade.update({
      where: { id },
      data: {
        tipo: data.tipo,
        descricao: data.descricao,
        dataAgendada: data.dataAgendada ? new Date(data.dataAgendada) : undefined,
        status: data.status,
        resultado: data.resultado,
        observacoes: data.observacoes
      }
    });
  }

  @Delete('atividades/:atividadeId')
  @ApiOperation({ summary: 'Remover atividade' })
  async deleteAtividade(@Param('atividadeId') id: string) {
    return this.prisma.atividade.delete({ where: { id } });
  }

  // ============ ESTATÍSTICAS ============

  @Get('stats/pipeline')
  @ApiOperation({ summary: 'Estatísticas do pipeline' })
  async getPipelineStats() {
    const porEtapa = await this.prisma.negociacao.groupBy({
      by: ['etapa'],
      _count: { id: true },
      _avg: { percentualMatch: true }
    });

    const porStatus = await this.prisma.negociacao.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    const totalAtividades = await this.prisma.atividade.count();
    const atividadesPendentes = await this.prisma.atividade.count({
      where: { status: 'PENDENTE', dataAgendada: { gte: new Date() } }
    });
    const atividadesAtrasadas = await this.prisma.atividade.count({
      where: { 
        status: 'PENDENTE', 
        dataAgendada: { lt: new Date() } 
      }
    });

    return {
      porEtapa: porEtapa.map(e => ({
        etapa: e.etapa,
        quantidade: e._count.id,
        matchMedio: Math.round(e._avg.percentualMatch || 0)
      })),
      porStatus: porStatus.map(s => ({
        status: s.status,
        quantidade: s._count.id
      })),
      atividades: {
        total: totalAtividades,
        pendentes: atividadesPendentes,
        atrasadas: atividadesAtrasadas
      }
    };
  }
}
