// ============================================
// 📦 INTERFACE: imovel.repository.interface.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Define A REGRA DO JOGO para quem for mexer com imóveis no banco de dados.
//
// 📚 ANALOGIA: A TABELA DE TAREFAS DO CORRETOR 📋
// - Não importa se o corretor se chama Prisma ou TypeORM...
// - Ele TEM que saber: Cadastrar, Buscar, Atualizar, Deletar e Listar Imóveis!
// - Se faltar uma dessas habilidades, tá demitido (TypeScript não compila).
//
// 🤔 POR QUÊ INTERFACE?
// Pra separar a inteligência do sistema dos "pedreiros". Se um dia a gente cansar do Banco A e quiser usar o Banco B, o sistema continua funcionando suave, pois os dois assinaram esse contrato.
// ============================================

import { Imovel } from '../entities/imovel.entity';

/**
 * 🏗️ INTERFACE: ImovelFilters
 *
 * 🎯 O QUE FAZ? A listinha de filtros marotos da barra de pesquisa!
 */
export interface ImovelFilters {
  publicado?: boolean;
  operacao?: 'VENDA' | 'ALUGUEL';
  tipoImovel?: string;
  cidade?: string;
  estado?: string;
  bairro?: string;
  valorMinimo?: number;
  valorMaximo?: number;
  quartosMinimo?: number;
  vagasMinimo?: number;
  search?: string;
}

/**
 * 🏗️ INTERFACE: PaginationOptions
 *
 * 🎯 O QUE FAZ? As regrinhas de fatiar a busca, pra não travar o celular do cara!
 */
export interface PaginationOptions {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 🏗️ INTERFACE: PaginatedResult
 *
 * 🎯 O QUE FAZ? O pacotinho completo que volta pro front-end (resultado + total + página).
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 📋 INTERFACE: IImovelRepository
 *
 * 🎯 O QUE FAZ? O Contrato. Regra de Ouro:
 * - create() = Bota o barraco no sistema.
 * - findById() = Puxa do banco pelo ID (Chave).
 * - findBySlug() = Puxa do banco pelo Link bonito (URL).
 * - update() = Tinta Nova no imóvel.
 * - delete() = Passar o trator (Derrubar = Delete).
 * - findAll() = A peneira que busca e fatia o que achou.
 */
export interface IImovelRepository {
  create(imovel: Imovel): Promise<Imovel>;
  findById(id: string): Promise<Imovel | null>;
  findBySlug(slug: string): Promise<Imovel | null>;
  update(imovel: Imovel): Promise<Imovel>;
  delete(id: string): Promise<void>;
  findAll(filters: ImovelFilters, pagination: PaginationOptions): Promise<PaginatedResult<Imovel>>;
}
