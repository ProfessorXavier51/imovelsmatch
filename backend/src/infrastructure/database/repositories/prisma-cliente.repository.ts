// ============================================
// 📦 REPOSITORY: prisma-cliente.repository.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Ele é O ESTOQUISTA REAL que a gente contratou através daquela interface (IClienteRepository)! 
//
// 📚 ANALOGIA: O ESTOQUISTA/BIBLIOTECÁRIO 🤓
// - É o mano que vai fisicamente na estante (Prisma) e joga a caixa na sua mesa.
// - Ele também anota quando uma caixa nova chegou e joga na prateleira certa.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Porque regras de negócios e bancos de dados não devem se misturar! O nosso Estoquista/Bibliotecário traduz o mundo real (Entity Cliente) para as caixinhas de metal do arquivo vivo (Prisma). 
// ============================================

import { Injectable } from '@nestjs/common';
import {
  IClienteRepository,
  ClienteFilters,
  PaginatedResult,
  SortOptions,
} from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/entities/cliente.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Cliente as PrismaCliente } from '@prisma/client';

/**
 * 🏗️ CLASSE: PrismaClienteRepository
 *
 * 🎯 O QUE FAZ?
 * Assina o papel da IClienteRepository e faz o trampo sujo de criar os selects, inserts e deletes no banco!
 */
@Injectable()
export class PrismaClienteRepository implements IClienteRepository {
  /**
   * 🏭 MÉTODO: Construtor
   *
   * 🎯 O QUE FAZ?
   * Injeta o "Porteiro do Banco" (PrismaService). O estoquista não consegue pegar nada sem falar com a portaria!
   */
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🎬 MÉTODO: create
   *
   * 🎯 O QUE FAZ? Pega nosso Cliente perfeitinho, desmonta em pecinhas que o banco entenda e salva!
   */
  async create(cliente: Cliente): Promise<Cliente> {
    // 1️⃣ Desmonta o LEGO (Entity para Data do Prisma)
    const data = {
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      tipoInteresse: cliente.tipoInteresse,
      valorMinimo: cliente.valorMinimo,
      valorMaximo: cliente.valorMaximo,
      cidade: cliente.cidade,
      estado: cliente.estado,
      bairrosPreferidos: cliente.bairrosPreferidos,
      tiposImovel: cliente.tiposImovel,
      observacoes: cliente.observacoes,
      origem: cliente.origem,
      ativo: cliente.ativo,
    };

    // 2️⃣ Manda pro banco guardar na gaveta e pega o ticket de volta gerado (ID)
    const created = await this.prisma.cliente.create({
      data,
    });

    // 3️⃣ Transforma a resposta do banco de volta num "Cliente" chique e retorna
    return this.toDomain(created);
  }

  /**
   * 🎬 MÉTODO: findById
   *
   * 🎯 O QUE FAZ? Pega o RG (id) e vai revirar os arquivos pra achar o indivíduo.
   */
  async findById(id: string): Promise<Cliente | null> {
    // Pesquisa pelo número único na tabela apontada!
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });

    // Não achou? Fica de boa, só volta com as mãos abanando (null).
    if (!cliente) return null;

    return this.toDomain(cliente);
  }

  /**
   * 🎬 MÉTODO: findByEmail
   *
   * 🎯 O QUE FAZ? Igual o de cima mas varre com o radar procurando um @email idêntico.
   */
  async findByEmail(email: string): Promise<Cliente | null> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { email },
    });

    if (!cliente) return null;

    return this.toDomain(cliente);
  }

  /**
   * 🎬 MÉTODO: findAll
   *
   * 🎯 O QUE FAZ? A pesquisa braba do sistema! Filtra usando as exigências do front, põe tudo numa ordem e fatia na paginação.
   */
  async findAll(
    filters?: ClienteFilters,
    page: number = 1,
    pageSize: number = 10,
    sort?: SortOptions,
  ): Promise<PaginatedResult<Cliente>> {
    const where: any = {};

    // ========================================
    // CHECAGEM DE CLIMA NO RADAR (Filtros WHERE)
    // ========================================
    if (filters) {
      if (filters.ativo !== undefined) where.ativo = filters.ativo;
      if (filters.tipoInteresse) where.tipoInteresse = filters.tipoInteresse;
      
      if (filters.cidade) {
        where.cidade = { contains: filters.cidade, mode: 'insensitive' };
      }
      if (filters.estado) where.estado = filters.estado;
      
      if (filters.valorMinimo !== undefined) {
        where.valorMinimo = { gte: filters.valorMinimo };
      }
      if (filters.valorMaximo !== undefined) {
        where.valorMaximo = { lte: filters.valorMaximo };
      }

      if (filters.search) {
        where.OR = [
          { nome: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } },
        ];
      }
    }

    // ========================================
    // ORDENADOR DA BAGUNÇA (ORDER BY)
    // ========================================
    const orderBy: any = sort
      ? { [sort.field]: sort.order } 
      : { createdAt: 'desc' };

    // ========================================
    // MATEMÁTICA DO PAGINADOR
    // ========================================
    // skip = pular páginas antigas / take = páginas novas pegues pra folhear
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // ========================================
    // A PORRADA DUPLA NO BANCO DE DADOS
    // ========================================
    // Traz total e resultados em paralelo (pra acelerar a resposta)
    const [total, clientes] = await this.prisma.$transaction([
      this.prisma.cliente.count({ where }),
      this.prisma.cliente.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
    ]);

    // Transforma a tralha toda na Entidade Cliente
    const data = clientes.map((c: PrismaCliente) => this.toDomain(c));
    const totalPages = Math.ceil(total / pageSize);

    // Manda a fita pronta de volta.
    return { data, total, page, pageSize, totalPages };
  }

  /**
   * 🎬 MÉTODO: update
   *
   * 🎯 O QUE FAZ? Troca as informações soltas que atualizaram sem apagar a existência da criatura.
   */
  async update(cliente: Cliente): Promise<Cliente> {
    const data = {
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      tipoInteresse: cliente.tipoInteresse,
      valorMinimo: cliente.valorMinimo,
      valorMaximo: cliente.valorMaximo,
      cidade: cliente.cidade,
      estado: cliente.estado,
      bairrosPreferidos: cliente.bairrosPreferidos,
      tiposImovel: cliente.tiposImovel,
      observacoes: cliente.observacoes,
      origem: cliente.origem,
      ativo: cliente.ativo,
      updatedAt: new Date(), 
    };

    // Subescreve no banco pela velha e boa chave ID
    const updated = await this.prisma.cliente.update({
      where: { id: cliente.id },
      data,
    });

    return this.toDomain(updated);
  }

  /**
   * 🎬 MÉTODO: delete
   *
   * 🎯 O QUE FAZ? Expurga o cidadão do banco pra sempre!
   */
  async delete(id: string): Promise<void> {
    // Delete master com Cascade do Prisma nas chaves do banco relacionadas.
    await this.prisma.cliente.delete({
      where: { id },
    });
  }

  /**
   * 🎬 MÉTODO: findCompatibleWithImovel
   *
   * 🎯 O QUE FAZ? A roleta do Tinder: Filtra pesadamente a base de dados pra descobrir clientes que bateriam perfeito com a mansão nova que entrou no pedaço!
   */
  async findCompatibleWithImovel(
    imovelId: string,
    operacao: string,
    valor: number,
    cidade: string,
    bairro: string,
    tipo: string,
  ): Promise<Cliente[]> {
    const tipoInteresse = operacao === 'VENDA' ? 'COMPRAR' : 'ALUGAR';

    const where: any = {
      ativo: true,
      tipoInteresse,
      valorMinimo: { lte: valor }, 
      valorMaximo: { gte: valor }, 
      cidade: { equals: cidade, mode: 'insensitive' },
    };

    // Filtra pelo banco o basicão...
    const clientes = await this.prisma.cliente.findMany({ where });

    // Mete o pente fino aqui na memória pros itens enjoados: Bairros e Tipos de Casa.
    const filtered = clientes.filter((c: PrismaCliente) => {
      const bairrosArray = (c.bairrosPreferidos as string[]) || [];
      const tiposArray = (c.tiposImovel as string[]) || [];
      
      const bairrosOk = bairrosArray.length === 0 || bairrosArray.some(
          (b: string) => b.toLowerCase() === bairro.toLowerCase(),
      );

      const tiposOk = tiposArray.length === 0 || tiposArray.includes(tipo);

      return bairrosOk && tiposOk;
    });

    // Filtra os cara que já foram irritados (pra não enviar spam repetido)
    const notificados = await this.prisma.matchLog.findMany({
      where: { imovelId },
      select: { clienteId: true },
    });

    const notificadosIds = notificados.map((n: { clienteId: string }) => n.clienteId);

    const naoNotificados = filtered.filter(
      (c: PrismaCliente) => !notificadosIds.includes(c.id),
    );

    return naoNotificados.map((c: PrismaCliente) => this.toDomain(c));
  }

  /**
   * 🎬 MÉTODO: countNotificationsToday
   *
   * 🎯 O QUE FAZ? Limita envio de Spam lendo quantos o cara já levou na cara HOJE!
   */
  async countNotificationsToday(clienteId: string): Promise<number> {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 

    return await this.prisma.matchLog.count({
      where: {
        clienteId, 
        createdAt: { gte: hoje },
      },
    });
  }

  /**
   * 🎬 MÉTODO: wasNotified
   *
   * 🎯 O QUE FAZ? Bate na memória se o cara já olhou e disse "passo" sobre o imóvel exato.
   */
  async wasNotified(clienteId: string, imovelId: string): Promise<boolean> {
    const log = await this.prisma.matchLog.findFirst({
      where: { clienteId, imovelId },
    });
    return log !== null;
  }

  /**
   * 🎬 MÉTODO: toDomain (Conversor Mágico)
   *
   * 🎯 O QUE FAZ? Pega o amontoado do Banco e transforma na entidade dourada do Reino do DDD (Domain Driven Design).
   */
  private toDomain(prismaCliente: PrismaCliente): Cliente {
    return Cliente.restore(
      {
        nome: prismaCliente.nome,
        email: prismaCliente.email,
        telefone: prismaCliente.telefone,
        tipoInteresse: prismaCliente.tipoInteresse as any,
        valorMinimo: Number(prismaCliente.valorMinimo),
        valorMaximo: Number(prismaCliente.valorMaximo),
        cidade: prismaCliente.cidade,
        estado: prismaCliente.estado || undefined,
        bairrosPreferidos: prismaCliente.bairrosPreferidos as string[],
        tiposImovel: prismaCliente.tiposImovel as string[],
        observacoes: prismaCliente.observacoes || undefined,
        origem: prismaCliente.origem || undefined,
      },
      prismaCliente.id,
    );
  }
}
