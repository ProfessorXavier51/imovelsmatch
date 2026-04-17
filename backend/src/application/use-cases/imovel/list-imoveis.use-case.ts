// ============================================
// 🎬 USE CASE: list-imoveis.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Lista imóveis com filtros e paginação.
//
// 📚 ANALOGIA: O CORRETOR QUE BUSCA IMÓVEIS 🔍
// - Cliente pede: "Quero apartamentos em SP até 500k"
// - Corretor filtra, pagina e retorna os resultados
// ============================================

import { Injectable, Inject } from '@nestjs/common';
import {
  IImovelRepository,
  ImovelFilters,
  PaginationOptions,
  PaginatedResult,
} from '../../../domain/repositories/imovel.repository.interface';
import { Imovel } from '../../../domain/entities/imovel.entity';

/**
 * 🏗️ CLASSE: ListImoveisUseCase
 *
 * 🎯 O QUE FAZ?
 * Lista imóveis com filtros, paginação e ordenação.
 */
@Injectable()
export class ListImoveisUseCase {
  
  constructor(
    @Inject('IImovelRepository')
    private readonly imovelRepository: IImovelRepository,
  ) {}

  /**
   * 🎬 MÉTODO: execute
   *
   * 🎯 O QUE FAZ? Busca imóveis filtrados e paginados.
   */
  async execute(
    filters?: ImovelFilters,
    page: number = 1,
    pageSize: number = 10,
    sortField?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<PaginatedResult<Imovel>> {
    
    // Validações de página
    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = 10;
    if (pageSize > 100) pageSize = 100;

    const pagination: PaginationOptions = {
      page,
      pageSize,
      sortField,
      sortOrder,
    };

    return this.imovelRepository.findAll(filters || {}, pagination);
  }
}
