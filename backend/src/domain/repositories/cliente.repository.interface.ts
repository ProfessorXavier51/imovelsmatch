// ============================================
// 📦 INTERFACE: cliente.repository.interface.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Ele é tipo o CONTRATO DO BIBLIOTECÁRIO! Em vez de dizer *como* guardar o livro, ele só diz: "Eu preciso de alguém que guarde livros, traga livros e jogue fora livros."
//
// 📚 ANALOGIA: O ESTOQUISTA NA LOJA DE TÊNIS 👟
// - Você chega e pede: "Me vê um Air Force tamanho 40" (find)
// - Você diz: "Guarda essa caixa de volta" (save)
// - Não importa se o estoquista usa carrinho, escada ou varinha mágica. Ele só assinou o contrato dizendo que CONSEGUE fazer essas tarefas!
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra não depender de um banco de dados específico! Hoje a gente usa MySQL, amanhã quer usar Mongo. Como a gente só pede pro "Estoquista", qualquer um que assinar o contrato tá valendo!
// ============================================

import { Cliente } from '../entities/cliente.entity';
import { TipoInteresse } from '../../shared/enums/tipo-interesse.enum';

/**
 * 🎯 FILTROS DE BUSCA: ClienteFilters
 * 📚 ANALOGIA: Igual os filtros do Shopee! Você marca "Frete Grátis", "Tamanho M", "Novo"...
 * E o sistema traz o que fechou com essas regrinhas! Todos opcionais!
 */
export interface ClienteFilters {
  ativo?: boolean;
  tipoInteresse?: TipoInteresse;
  cidade?: string;
  estado?: string;
  valorMinimo?: number;
  valorMaximo?: number;
  search?: string;
}

/**
 * 🎯 FILTROS DE BUSCA: PaginatedResult
 * 📚 ANALOGIA: A página do Google! Não ia caber 2 bilhões de links de uma vez na tela...
 * Então a gente quebra em páginas menores (data), diz o total e avisa quantas tem pro cara folear (page, pageSize).
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * 🎯 ORDENAÇÃO: SortOptions
 * 📚 ANALOGIA: Igual "Ordenar por Maior Preço" ou "Mais Recentes" lá no app. 
 */
export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * 🏗️ INTERFACE: IClienteRepository
 * 📚 ANALOGIA: É o CONTRATO de trampo do Repositório! 
 * Quem for trabalhar de repositório precisa saber OBRIGATORIAMENTE fazer o que está nas cláusulas abaixos!
 */
export interface IClienteRepository {
  /**
   * 🎬 MÉTODO: create
   * 🎯 O QUE FAZ? Pega um cliente novo e crava no banco.
   * 📚 ANALOGIA: Matricular o aluno e entregar pra ele a carteirinha com o número dele (ID). 
   */
  create(cliente: Cliente): Promise<Cliente>;

  /**
   * 🎬 MÉTODO: findById
   * 🎯 O QUE FAZ? Caça um cliente pelo RG do sistema (ID).
   * 📚 ANALOGIA: Pesquisa direta pelo CPF. Achou? Trás. Não achou? Volta de fininho com as mãos abanando (null).
   */
  findById(id: string): Promise<Cliente | null>;

  /**
   * 🎬 MÉTODO: findByEmail
   * 🎯 O QUE FAZ? Pega o cara através do Email pra checar autenticidade.
   * 📚 ANALOGIA: Jogar o nome na lista da balada. Tá lá? Entra. Não tá? Fica pro lado de fora e chora.
   */
  findByEmail(email: string): Promise<Cliente | null>;

  /**
   * 🎬 MÉTODO: findAll
   * 🎯 O QUE FAZ? Trás uma galera de clientes numa tacada só baseado num peneirão e paginando isso.
   * 📚 ANALOGIA: Mostrar várias pastas do fichário filtrando pelas opções do "ClienteFilters".
   */
  findAll(
    filters?: ClienteFilters,
    page?: number,
    pageSize?: number,
    sort?: SortOptions,
  ): Promise<PaginatedResult<Cliente>>;

  /**
   * 🎬 MÉTODO: update
   * 🎯 O QUE FAZ? Remédio pro cliente que trocou de celular! Passamos a ficha toda sobrepondo o velho.
   * 📚 ANALOGIA: Rasgar a foto antiga e botar uma nova na fichinha!
   */
  update(cliente: Cliente): Promise<Cliente>;

  /**
   * 🎬 MÉTODO: delete
   * 🎯 O QUE FAZ? Manda o infeliz de vala. Tchau e bença. (Apaga mesmo)
   * 📚 ANALOGIA: Dar um "Block" ou Excluir a conta pra todo o sempre.
   */
  delete(id: string): Promise<void>;

  /**
   * 🎬 MÉTODO: findCompatibleWithImovel
   * 🎯 O QUE FAZ? A magia do nosso Tinder imobiliário! Cruza clientes que amam um perfil X com a casa X!
   * 📚 ANALOGIA: MATCH 💖 Ele pega a casa, lê o que ela é e vasculha a lista inteira catando quem bate a química (comprar/alugar/valor/cidade)! A gente sai só com clientes interessadinhos!
   */
  findCompatibleWithImovel(
    imovelId: string,
    operacao: string,
    valor: number,
    cidade: string,
    bairro: string,
    tipo: string,
  ): Promise<Cliente[]>;

  /**
   * 🎬 MÉTODO: countNotificationsToday
   * 🎯 O QUE FAZ? Contador de spam. Queremos saber quantos e-mails fulano levou hoje pra não ser cancelados.
   */
  countNotificationsToday(clienteId: string): Promise<number>;

  /**
   * 🎬 MÉTODO: wasNotified
   * 🎯 O QUE FAZ? Lembra memória. "A gente já cutucou essa pessoa com esse link?" Pra a gente não pagar mico de enviar duas vezes.
   */
  wasNotified(clienteId: string, imovelId: string): Promise<boolean>;
}
// Por quê exportar?
// - Permite usar em use cases
// - Permite criar implementações
// - Permite injetar via DI
//
// Como usar em outro arquivo?
// import { IClienteRepository } from '@domain/repositories/cliente.repository.interface';
// ============================================
