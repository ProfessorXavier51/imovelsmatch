// ============================================
// 🎬 USE CASE: list-clientes.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// A grande peneira do sistema! Filtra a galera e fatia pra não travar a tela.
//
// 📚 ANALOGIA: A BUSCA DO MERCADO LIVRE 🛒
// - Você digita "tênis nike" e coloca "até R$200".
// - O site te traz só a "Página 1", não despeja os milhões de tênis na sua cara de uma vez!
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Imagine 20 mil clientes sendo baixados no 4G de um celular ao mesmo tempo? Vai fritar o chip! Esse mano cria as "Páginas 1, 2, 3..." e filtra só o que importa.
// ============================================

import { Injectable, Inject } from '@nestjs/common';
import {
  IClienteRepository,
  ClienteFilters,
  PaginatedResult,
  SortOptions,
} from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/entities/cliente.entity';

/**
 * 🏗️ CLASSE: ListClientesUseCase
 *
 * 🎯 O QUE FAZ?
 * O maestro da paginação. Filtra, recorta e envia os bloquinhos mastigados pro Front-end.
 */
@Injectable()
export class ListClientesUseCase {
  
  /**
   * 🏭 MÉTODO: Construtor
   */
  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,
  ) {}

  /**
   * 🎬 MÉTODO: execute
   *
   * 🎯 O QUE FAZ? Bota os filtros de clima em ação e puxa os clientes na base fatia por fatia (Paginado)!
   */
  async execute(
    filters?: ClienteFilters,
    page: number = 1,
    pageSize: number = 10,
    sort?: SortOptions,
  ): Promise<PaginatedResult<Cliente>> {
    
    // 1️⃣ Trava anti-surto da galera do Front que pode bugar e pedir página "0" ou "-1"
    if (page < 1) {
      page = 1;
    }

    // 2️⃣ Trava de limite de estresse (pra ninguém pedir 1 milhão de clientes de uma vez)
    if (pageSize < 1) {
      pageSize = 10;
    }
    if (pageSize > 100) {
      pageSize = 100; // Limite blindado, não passa de 100 por vez nem a pau!
    }

    // 3️⃣ Joga pro Repositório se virar com as contas e regras complexas do ORM!
    const result = await this.clienteRepository.findAll(
      filters,
      page,
      pageSize,
      sort,
    );

    // 4️⃣ Só pega o envelope com a galera, com as páginas somadas e devolve no balcão.
    return result;
  }
}
