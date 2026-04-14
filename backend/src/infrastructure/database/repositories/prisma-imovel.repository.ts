// ============================================
// 📦 REPOSITORY: prisma-imovel.repository.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É o pedreiro que de fato constrói, busca e quebra os imóveis no banco de dados.
//
// 📚 ANALOGIA: O ARQUIVISTA DA IMOBILIÁRIA 🗄️
// - A Interface diz o que ele TEM que fazer.
// - Esse arquivo aqui é O SEGREDO de como ele faz: usando o Prisma.
// - Se a gente mandar trocar o Prisma por outro, é aqui que a gente demite e contrata um novo.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra separar a regra de negócio do código sujo de banco de dados. Aqui a gente mexe com tabela, lá fora a gente mexe com classe.
// ============================================

import { Injectable } from '@nestjs/common';
import { IImovelRepository, ImovelFilters, PaginationOptions, PaginatedResult } from '../../../domain/repositories/imovel.repository.interface';
import { Imovel } from '../../../domain/entities/imovel.entity';
import { PrismaService } from '../prisma/prisma.service';

/**
 * 🏗️ CLASSE: PrismaImovelRepository
 *
 * 🎯 O QUE FAZ? A implementação real do cartório de imóveis usando Prisma ORM.
 */
@Injectable()
export class PrismaImovelRepository implements IImovelRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * 💾 MÉTODO: create
   *
   * 🎯 O QUE FAZ? Bota o barraco no sistema de verdade.
   */
  async create(imovel: Imovel): Promise<Imovel> {
    const created = await this.prisma.imovel.create({
      data: {
        titulo: imovel.titulo,
        slug: imovel.slug,
        tipoImovel: imovel.tipoImovel as any,
        operacao: imovel.operacao as any,
        valor: imovel.valor,
        endereco: imovel.endereco,
        bairro: imovel.bairro,
        cidade: imovel.cidade,
        estado: imovel.estado,
        cep: imovel.cep,
        quartos: imovel.quartos,
        vagas: imovel.vagas,
        areaM2: imovel.areaM2,
        descricao: imovel.descricao,
        fotos: imovel.fotos,
        publicado: imovel.publicado,
        destaque: imovel.destaque,
      },
    });
    // 🔙 Retorna uma Entidade chique, não o JSON sujo do Prisma!
    return this.toDomain(created);
  }

  /**
   * 🔍 MÉTODO: findById
   *
   * 🎯 O QUE FAZ? Procura a matrícula da casa pelo ID.
   */
  async findById(id: string): Promise<Imovel | null> {
    const imovel = await this.prisma.imovel.findUnique({ where: { id } });
    return imovel ? this.toDomain(imovel) : null;
  }

  /**
   * 🔗 MÉTODO: findBySlug
   *
   * 🎯 O QUE FAZ? Procura a casa por aquele link bonito (ex: /casa-branca-sp)
   */
  async findBySlug(slug: string): Promise<Imovel | null> {
    const imovel = await this.prisma.imovel.findUnique({ where: { slug } });
    return imovel ? this.toDomain(imovel) : null;
  }

  /**
   * 🔄 MÉTODO: update
   *
   * 🎯 O QUE FAZ? Puxa os dados atualizados e joga cimento fresquinho no banco.
   */
  async update(imovel: Imovel): Promise<Imovel> {
    const updated = await this.prisma.imovel.update({
      where: { id: imovel.id },
      data: {
        titulo: imovel.titulo,
        slug: imovel.slug,
        tipoImovel: imovel.tipoImovel as any,
        operacao: imovel.operacao as any,
        valor: imovel.valor,
        endereco: imovel.endereco,
        bairro: imovel.bairro,
        cidade: imovel.cidade,
        estado: imovel.estado,
        cep: imovel.cep,
        quartos: imovel.quartos,
        vagas: imovel.vagas,
        areaM2: imovel.areaM2,
        descricao: imovel.descricao,
        fotos: imovel.fotos,
        publicado: imovel.publicado,
        destaque: imovel.destaque,
      },
    });
    return this.toDomain(updated);
  }

  /**
   * 🗑️ MÉTODO: delete
   *
   * 🎯 O QUE FAZ? Trator sem dó! Some com o registro.
   */
  async delete(id: string): Promise<void> {
    await this.prisma.imovel.delete({ where: { id } });
  }

  /**
   * 📊 MÉTODO: findAll
   *
   * 🎯 O QUE FAZ? Aquele filtro do Zap Imóveis que a galera adora.
   *
   * 📚 ANALOGIA: A Peneira Gigante
   * - Onde.alguma_coisa (where) = a peneira.
   * - A gente vai enchendo a peneira só com o que o maluco pediu na busca.
   */
  async findAll(filters: ImovelFilters, pagination: PaginationOptions): Promise<PaginatedResult<Imovel>> {
    const where: any = {};

    // 🕵️‍♂️ Peneirando...
    if (filters.publicado !== undefined) where.publicado = filters.publicado;
    if (filters.operacao) where.operacao = filters.operacao;
    if (filters.tipoImovel) where.tipoImovel = filters.tipoImovel;
    if (filters.cidade) where.cidade = { contains: filters.cidade };
    if (filters.estado) where.estado = filters.estado;
    if (filters.bairro) where.bairro = { contains: filters.bairro };
    
    // Grana: Mínimo ou Máximo?
    if (filters.valorMinimo || filters.valorMaximo) {
      where.valor = {};
      if (filters.valorMinimo) where.valor.gte = filters.valorMinimo;
      if (filters.valorMaximo) where.valor.lte = filters.valorMaximo;
    }

    if (filters.quartosMinimo) where.quartos = { gte: filters.quartosMinimo };
    if (filters.vagasMinimo) where.vagas = { gte: filters.vagasMinimo };

    // Barra de pesquisa (Nome, descrição ou endereço batendo)
    if (filters.search) {
      where.OR = [
        { titulo: { contains: filters.search } },
        { descricao: { contains: filters.search } },
        { endereco: { contains: filters.search } },
      ];
    }

    // 🚀 Faz duas coisas ao mesmo tempo: pega a lista fatiada (take/skip) E conta quantos tem no total.
    const [imoveis, total] = await Promise.all([
      this.prisma.imovel.findMany({
        where,
        skip: (pagination.page - 1) * pagination.pageSize,
        take: pagination.pageSize,
        orderBy: { [pagination.sortField || 'createdAt']: pagination.sortOrder || 'desc' },
      }),
      this.prisma.imovel.count({ where }),
    ]);

    return {
      data: imoveis.map((i) => this.toDomain(i)),
      total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: Math.ceil(total / pagination.pageSize),
    };
  }

  /**
   * 🎭 MÉTODO: toDomain
   *
   * 🎯 O QUE FAZ? A sala de maquiagem. Pega o dado cru do SQL e disfarça de Entidade de Domínio.
   */
  private toDomain(prismaImovel: any): Imovel {
    return new Imovel(
      {
        titulo: prismaImovel.titulo,
        slug: prismaImovel.slug,
        tipoImovel: prismaImovel.tipoImovel,
        operacao: prismaImovel.operacao,
        valor: Number(prismaImovel.valor), // SQL vira Float, tem que forçar Number do TS
        endereco: prismaImovel.endereco,
        bairro: prismaImovel.bairro,
        cidade: prismaImovel.cidade,
        estado: prismaImovel.estado,
        cep: prismaImovel.cep,
        quartos: prismaImovel.quartos,
        vagas: prismaImovel.vagas,
        areaM2: prismaImovel.areaM2 ? Number(prismaImovel.areaM2) : undefined,
        descricao: prismaImovel.descricao,
        fotos: Array.isArray(prismaImovel.fotos) ? prismaImovel.fotos : [],
        publicado: prismaImovel.publicado,
        destaque: prismaImovel.destaque,
      },
      prismaImovel.id, // Bota o ID por fôra, pq no Prisma o construtor é frescurento
    );
  }
}
