/**
 * Use Case: Get Dashboard Statistics
 * Retorna estatísticas completas para o dashboard
 */

import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class GetDashboardStatsUseCase {
  constructor(private prisma: PrismaService) {}

  async execute() {
    // Contagens básicas
    const totalClientes = await this.prisma.cliente.count();
    const totalImoveis = await this.prisma.imovel.count();
    const totalNegociacoes = await this.prisma.negociacao.count();

    // Contagens por status
    const clientesAtivos = await this.prisma.cliente.count({ where: { ativo: true } });
    const clientesInativos = await this.prisma.cliente.count({ where: { ativo: false } });
    
    const imoveisPublicados = await this.prisma.imovel.count({ where: { publicado: true } });
    const imoveisDestaque = await this.prisma.imovel.count({ where: { destaque: true } });

    // Por tipo de interesse
    const clientesComprar = await this.prisma.cliente.count({ 
      where: { tipoInteresse: 'COMPRAR', ativo: true } 
    });
    const clientesAlugar = await this.prisma.cliente.count({ 
      where: { tipoInteresse: 'ALUGAR', ativo: true } 
    });

    // Por operação
    const imoveisVenda = await this.prisma.imovel.count({ 
      where: { operacao: 'VENDA', publicado: true } 
    });
    const imoveisAluguel = await this.prisma.imovel.count({ 
      where: { operacao: 'ALUGUEL', publicado: true } 
    });

    // Negociações por etapa
    const negociacoesPorEtapa = await this.prisma.negociacao.groupBy({
      by: ['etapa'],
      _count: { id: true }
    });

    // Atividade recente (últimos 7 dias)
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

    const clientesRecentes = await this.prisma.cliente.count({
      where: { createdAt: { gte: seteDiasAtras } }
    });
    const imoveisRecentes = await this.prisma.imovel.count({
      where: { createdAt: { gte: seteDiasAtras } }
    });
    const negociacoesRecentes = await this.prisma.negociacao.count({
      where: { createdAt: { gte: seteDiasAtras } }
    });

    // Top cidades com mais imóveis
    const topCidades = await this.prisma.imovel.groupBy({
      by: ['cidade', 'estado'],
      where: { publicado: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    });

    // Top bairros com mais imóveis
    const topBairros = await this.prisma.imovel.groupBy({
      by: ['bairro', 'cidade'],
      where: { publicado: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    });

    // Faixa de valor dos imóveis à venda
    const imoveisVendaPreco = await this.prisma.imovel.findMany({
      where: { operacao: 'VENDA', publicado: true },
      select: { valor: true }
    });
    
    const faixasVenda = {
      ate100k: imoveisVendaPreco.filter(i => Number(i.valor) <= 100000).length,
      de100ka300k: imoveisVendaPreco.filter(i => Number(i.valor) > 100000 && Number(i.valor) <= 300000).length,
      de300ka500k: imoveisVendaPreco.filter(i => Number(i.valor) > 300000 && Number(i.valor) <= 500000).length,
      de500ka1m: imoveisVendaPreco.filter(i => Number(i.valor) > 500000 && Number(i.valor) <= 1000000).length,
      acima1m: imoveisVendaPreco.filter(i => Number(i.valor) > 1000000).length,
    };

    // Faixa de valor dos imóveis para aluguel
    const imoveisAluguelPreco = await this.prisma.imovel.findMany({
      where: { operacao: 'ALUGUEL', publicado: true },
      select: { valor: true }
    });

    const faixasAluguel = {
      ate1k: imoveisAluguelPreco.filter(i => Number(i.valor) <= 1000).length,
      de1ka2k: imoveisAluguelPreco.filter(i => Number(i.valor) > 1000 && Number(i.valor) <= 2000).length,
      de2ka3k: imoveisAluguelPreco.filter(i => Number(i.valor) > 2000 && Number(i.valor) <= 3000).length,
      de3ka5k: imoveisAluguelPreco.filter(i => Number(i.valor) > 3000 && Number(i.valor) <= 5000).length,
      acima5k: imoveisAluguelPreco.filter(i => Number(i.valor) > 5000).length,
    };

    return {
      resumo: {
        totalClientes,
        totalImoveis,
        totalNegociacoes,
        clientesAtivos,
        imoveisPublicados,
        imoveisDestaque
      },
      clientes: {
        total: totalClientes,
        ativos: clientesAtivos,
        inativos: clientesInativos,
        comprar: clientesComprar,
        alugar: clientesAlugar,
        novosEstaSemana: clientesRecentes
      },
      imoveis: {
        total: totalImoveis,
        publicados: imoveisPublicados,
        destaque: imoveisDestaque,
        venda: imoveisVenda,
        aluguel: imoveisAluguel,
        novosEstaSemana: imoveisRecentes,
        faixasVenda,
        faixasAluguel
      },
      negociacoes: {
        total: totalNegociacoes,
        porEtapa: negociacoesPorEtapa.map(n => ({
          etapa: n.etapa,
          quantidade: n._count.id
        })),
        novasEstaSemana: negociacoesRecentes
      },
      geografico: {
        topCidades: topCidades.map(c => ({
          cidade: c.cidade,
          estado: c.estado,
          quantidade: c._count.id
        })),
        topBairros: topBairros.map(b => ({
          bairro: b.bairro,
          cidade: b.cidade,
          quantidade: b._count.id
        }))
      }
    };
  }
}
