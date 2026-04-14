// ============================================
// 📦 ENTITY: imovel.entity.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Define o que é um Imóvel no nosso sistema e as regras de negócio pra ele existir.
//
// 📚 ANALOGIA: A ESCRITURA DO BARRACO 📜
// - Não é qualquer papel de pão que vira uma escritura.
// - Tem que ter título, valor e endereço, senão a prefeitura (o banco) rejeita na hora!
// - A Entidade é essa escritura oficial. Se estiver errada, o juiz (DomainException) te barra.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra garantir que ninguém cadastre uma "Mansão" custando R$ -50,00 ou sem endereço. A entidade se defende sozinha das loucuras do usuário!
// ============================================

import { DomainException } from '../exceptions/domain.exception';

/**
 * 🏗️ INTERFACE: CreateImovelProps
 *
 * 📚 ANALOGIA: O Rascunho do Corretor
 * - A listinha de coisas básicas que precisa ter pra começar a vender a casa.
 */
export interface CreateImovelProps {
  titulo: string;
  slug: string;
  tipoImovel: 'CASA' | 'APARTAMENTO' | 'TERRENO' | 'SOBRADO' | 'OUTRO';
  operacao: 'VENDA' | 'ALUGUEL';
  valor: number;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep?: string;
  quartos?: number;
  vagas?: number;
  areaM2?: number;
  descricao?: string;
  fotos?: string[];
  publicado?: boolean;
  destaque?: boolean;
}

export type UpdateImovelProps = Partial<CreateImovelProps>;

/**
 * 🏗️ CLASSE: Imovel
 *
 * 🎯 O QUE FAZ?
 * É o próprio tijolo digital! Guarda todos os dados do imóvel e se recusa a aceitar dado bosta.
 */
export class Imovel {
  private _id?: string;
  private _titulo: string;
  private _slug: string;
  private _tipoImovel: 'CASA' | 'APARTAMENTO' | 'TERRENO' | 'SOBRADO' | 'OUTRO';
  private _operacao: 'VENDA' | 'ALUGUEL';
  private _valor: number;
  private _endereco: string;
  private _bairro: string;
  private _cidade: string;
  private _estado: string;
  private _cep?: string;
  private _quartos: number;
  private _vagas: number;
  private _areaM2?: number;
  private _descricao?: string;
  private _fotos: string[];
  private _publicado: boolean;
  private _destaque: boolean;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  /**
   * 🏭 MÉTODO: Construtor
   *
   * 🎯 O QUE FAZ? O pedreiro levantando a casa pela primeira vez. 
   */
  constructor(props: CreateImovelProps, id?: string) {
    this._id = id;
    this._titulo = props.titulo;
    this._slug = props.slug;
    this._tipoImovel = props.tipoImovel;
    this._operacao = props.operacao;
    this._valor = props.valor;
    this._endereco = props.endereco;
    this._bairro = props.bairro;
    this._cidade = props.cidade;
    this._estado = props.estado;
    this._cep = props.cep;
    this._quartos = props.quartos || 0;
    this._vagas = props.vagas || 0;
    this._areaM2 = props.areaM2;
    this._descricao = props.descricao;
    this._fotos = props.fotos || [];
    this._publicado = props.publicado || false;
    this._destaque = props.destaque || false;
    this._createdAt = new Date();
    this._updatedAt = new Date();

    // Já chama o fiscal de obras pra ver se a parede tá torta!
    this.validate();
  }

  /**
   * 🔍 MÉTODO: validate
   *
   * 🎯 O QUE FAZ? O Fiscal da Prefeitura. Olha se as regras de negócio tão sendo respeitadas.
   */
  private validate(): void {
    if (!this._titulo || this._titulo.trim().length < 5) {
      throw new DomainException('Mano, o título do anúncio tem que ter no mínimo 5 caracteres');
    }

    if (this._valor <= 0) {
      throw new DomainException('Tá dando a casa de graça? O valor tem que ser maior que zero');
    }

    if (!this._endereco || this._endereco.trim().length < 5) {
      throw new DomainException('Endereço tá muito curto da rua, tem no mínimo 5 letras');
    }
  }

  /**
   * 🔄 MÉTODO: update
   *
   * 🎯 O QUE FAZ? O famoso "Reforma Fácil". Troca só o piso que tá quebrado.
   */
  update(props: UpdateImovelProps): void {
    if (props.titulo !== undefined) this._titulo = props.titulo;
    if (props.slug !== undefined) this._slug = props.slug;
    if (props.tipoImovel !== undefined) this._tipoImovel = props.tipoImovel;
    if (props.operacao !== undefined) this._operacao = props.operacao;
    if (props.valor !== undefined) this._valor = props.valor;
    if (props.endereco !== undefined) this._endereco = props.endereco;
    if (props.bairro !== undefined) this._bairro = props.bairro;
    if (props.cidade !== undefined) this._cidade = props.cidade;
    if (props.estado !== undefined) this._estado = props.estado;
    if (props.cep !== undefined) this._cep = props.cep;
    if (props.quartos !== undefined) this._quartos = props.quartos;
    if (props.vagas !== undefined) this._vagas = props.vagas;
    if (props.areaM2 !== undefined) this._areaM2 = props.areaM2;
    if (props.descricao !== undefined) this._descricao = props.descricao;
    if (props.fotos !== undefined) this._fotos = props.fotos;
    if (props.publicado !== undefined) this._publicado = props.publicado;
    if (props.destaque !== undefined) this._destaque = props.destaque;

    this._updatedAt = new Date();
    
    // Chama o fiscal de novo pós-reforma
    this.validate();
  }

  /**
   * 📣 MÉTODO: publicar / despublicar
   *
   * 🎯 O QUE FAZ? Pendura ou tira a placa de "ALUGA-SE / VENDE-SE" no portão!
   */
  publicar(): void {
    this._publicado = true;
    this._updatedAt = new Date();
  }

  despublicar(): void {
    this._publicado = false;
    this._updatedAt = new Date();
  }

  // ========================================
  // GETTERS (Lendo a escritura sem estragar o papel original)
  // ========================================
  get id(): string | undefined { return this._id; }
  get titulo(): string { return this._titulo; }
  get slug(): string { return this._slug; }
  get tipoImovel(): string { return this._tipoImovel; }
  get operacao(): string { return this._operacao; }
  get valor(): number { return this._valor; }
  get endereco(): string { return this._endereco; }
  get bairro(): string { return this._bairro; }
  get cidade(): string { return this._cidade; }
  get estado(): string { return this._estado; }
  get cep(): string | undefined { return this._cep; }
  get quartos(): number { return this._quartos; }
  get vagas(): number { return this._vagas; }
  get areaM2(): number | undefined { return this._areaM2; }
  get descricao(): string | undefined { return this._descricao; }
  get fotos(): string[] { return this._fotos; }
  get publicado(): boolean { return this._publicado; }
  get destaque(): boolean { return this._destaque; }
  get createdAt(): Date | undefined { return this._createdAt; }
  get updatedAt(): Date | undefined { return this._updatedAt; }
}
