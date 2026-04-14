// ============================================
// 👤 ENTITY: cliente.entity.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Ele é os dados na essência, nua e crua do cliente, como se fosse um CPF andando!
//
// 📚 ANALOGIA: É como uma PESSOA COM RG 🪪
// - Tem a identidade cravada nela (ID)
// - Pode mudar de roupa e corte de cabelo (atualizar dados como bairro, valorMin)
// - Mas continua sendo a mesma pessoa
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// A entidade é a nossa linha de defesa suprema! Se o banco de dados falhar, o Controller pirar e as rotas surtarem, a ENTIDADE jura de pé junto: "De mim não passa uma formiga!". Ela não permite valores negativos de grana, não deixa CPF torto passar nem e-mail xexelento.
// ============================================

import { Email } from '../value-objects/email.vo';
import { Telefone } from '../value-objects/telefone.vo';
import { TipoInteresse } from '../../shared/enums/tipo-interesse.enum';
import { DomainException } from '../exceptions/domain.exception';

/**
 * 🎯 INTERFACES: As Cláusulas Mínimas do Contrato
 * 📚 ANALOGIA: Igual pedir sanduíche no Subway! Tem ingredientes OBRIGATÓRIOS (pão, carne) e os OPCIONAIS (azeitona, queijo suíço).
 */
export interface CreateClienteProps {
  nome: string;
  email: string;
  telefone: string;
  tipoInteresse: TipoInteresse;
  valorMinimo: number;
  valorMaximo: number;
  cidade: string;
  estado?: string;
  bairrosPreferidos?: string[];
  tiposImovel?: string[];
  observacoes?: string;
  origem?: string;
}

/**
 * 🎯 INTERFACE: Formulário de Atualização
 * Tudo vira opcional, já que a gente só quer remendar um pneu sem trocar o carro.
 */
export type UpdateClienteProps = Partial<CreateClienteProps>;

/**
 * 🏗️ CLASSE: Cliente 
 * A armadura suprema do nosso modelo de negócio. Valida e detém os atributos blindados do maluco!
 */
export class Cliente {
  // Apenas a classe mexe nessas paradas. Nada de maluco vindo de fora querer setar um 'cliente._id = 999'. Bloqueio de Firewall ativado (private).
  private readonly _id?: string;
  private _nome: string;
  private _email: Email;
  private _telefone: Telefone;
  private _tipoInteresse: TipoInteresse;
  private _valorMinimo: number;
  private _valorMaximo: number;
  private _cidade: string;
  private _estado?: string;
  private _bairrosPreferidos: string[];
  private _tiposImovel: string[];
  private _observacoes?: string;
  private _ativo: boolean;
  private _origem?: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  /**
   * 🏭 MÉTODO: Construtor (Privado por segurança)
   * A gente trava a porta da frente! Ninguém dá 'new Cliente()' solto. Só usamos factory methods tipo ".create()" ou ".restore()". É regra da casa!
   */
  private constructor(props: CreateClienteProps, id?: string) {
    // 🛡️ Bate-Ponto do BOPE: Valida a porra toda antes de dar o aval
    this.validate(props);

    this._id = id;
    this._nome = props.nome;
    
    // Nossos seguranças da balada entram em ação (Value Objects)
    this._email = new Email(props.email);
    this._telefone = new Telefone(props.telefone);
    
    this._tipoInteresse = props.tipoInteresse;
    this._valorMinimo = props.valorMinimo;
    this._valorMaximo = props.valorMaximo;
    this._cidade = props.cidade;
    this._estado = props.estado;
    this._bairrosPreferidos = props.bairrosPreferidos || [];
    this._tiposImovel = props.tiposImovel || [];
    this._observacoes = props.observacoes;
    this._ativo = true; // Por padrão já acorda ligado na tomada
    this._origem = props.origem;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  /**
   * 🎬 MÉTODO FACTORY: create
   * 🎯 O QUE FAZ? A cegonha chegou e trouxe uma criança novinha pro mundo! (Usado p/ clientes Inéditos!)
   */
  public static create(props: CreateClienteProps): Cliente {
    return new Cliente(props);
  }

  /**
   * 🎬 MÉTODO FACTORY: restore
   * 🎯 O QUE FAZ? O zumbi reviveu e saiu do banco de dados! Ele não é novo, só está sendo carregado em memória pra gente interagir. Puxamos ele pelo ID.
   */
  public static restore(props: CreateClienteProps, id: string): Cliente {
    return new Cliente(props, id);
  }

  /**
   * 🎬 MÉTODO: validate (A Catraca Blindada)
   * 🎯 O QUE FAZ? O juiz de futebol soltando cartão vermelho pra valores lixo. 
   */
  private validate(props: CreateClienteProps): void {
    if (!props.nome || props.nome.trim().length < 3) {
      throw new DomainException('Nome do cliente deve ter no mínimo 3 caracteres');
    }
    if (props.valorMinimo < 0 || props.valorMaximo < 0) {
      throw new DomainException('Valores não podem ser negativos e dívidas não rolam!');
    }
    if (props.valorMinimo > props.valorMaximo) {
      throw new DomainException('Valor mínimo não pode ser maior que valor máximo! Matemática básica po!');
    }
    if (!props.cidade || props.cidade.trim().length === 0) {
      throw new DomainException('Cidade é obrigatória, o tinder da casa não funciona em limbo!');
    }
  }

  // ============================================
  // GETTERS: A janelinha de vidro pra gente conseguir xeretar o valor privado das variáveis sem ter poder de alterar.
  // ============================================
  get id(): string | undefined { return this._id; }
  get nome(): string { return this._nome; }
  get email(): string { return this._email.value; } // Desempacota do Guarda Costas
  get telefone(): string { return this._telefone.value; }
  get telefoneFormatado(): string { return this._telefone.formatted(); }
  get tipoInteresse(): TipoInteresse { return this._tipoInteresse; }
  get valorMinimo(): number { return this._valorMinimo; }
  get valorMaximo(): number { return this._valorMaximo; }
  get cidade(): string { return this._cidade; }
  get estado(): string | undefined { return this._estado; }
  get bairrosPreferidos(): string[] { return [...this._bairrosPreferidos]; } // Clona pra ninguém mexer no original
  get tiposImovel(): string[] { return [...this._tiposImovel]; }
  get observacoes(): string | undefined { return this._observacoes; }
  get ativo(): boolean { return this._ativo; }
  get origem(): string | undefined { return this._origem; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  // ============================================
  // MÉTODOS DE NEGÓCIO: O comportamento que ele mesmo executa sobre si mesmo.
  // ============================================

  /**
   * 🎬 MÉTODO: update
   * 🎯 O QUE FAZ? A cirurgia plástica. Remenda o que pedirem pra remendar, valida tudo de novo e passa pro abraço com timestamp novo.
   */
  public update(props: UpdateClienteProps): void {
    if (props.nome) this._nome = props.nome;
    if (props.email) this._email = new Email(props.email);
    if (props.telefone) this._telefone = new Telefone(props.telefone);
    if (props.tipoInteresse) this._tipoInteresse = props.tipoInteresse;
    
    if (props.valorMinimo !== undefined) this._valorMinimo = props.valorMinimo;
    if (props.valorMaximo !== undefined) this._valorMaximo = props.valorMaximo;
    
    if (props.cidade) this._cidade = props.cidade;
    if (props.estado !== undefined) this._estado = props.estado;
    if (props.bairrosPreferidos) this._bairrosPreferidos = props.bairrosPreferidos;
    if (props.tiposImovel) this._tiposImovel = props.tiposImovel;
    if (props.observacoes !== undefined) this._observacoes = props.observacoes;
    
    this._updatedAt = new Date();

    // Re-valida tudo no fim da plástica!
    this.validate({
      nome: this._nome,
      email: this._email.value,
      telefone: this._telefone.value,
      tipoInteresse: this._tipoInteresse,
      valorMinimo: this._valorMinimo,
      valorMaximo: this._valorMaximo,
      cidade: this._cidade,
    });
  }

  /**
   * 🎬 MÉTODO: ativar/desativar
   * 🎯 O QUE FAZ? Como desligar no botão as notificações (ex: cliente que já achou casa não quer mais spam).
   */
  public ativar(): void {
    this._ativo = true;
    this._updatedAt = new Date();
  }

  public desativar(): void {
    this._ativo = false;
    this._updatedAt = new Date();
  }

  /**
   * 🎬 MÉTODO: valorEstaEmFaixa
   * 🎯 O QUE FAZ? Joga na régua dele se a cota do imóvel do parceiro bate com as finanças dele!
   */
  public valorEstaEmFaixa(valor: number): boolean {
    return valor >= this._valorMinimo && valor <= this._valorMaximo;
  }

  /**
   * 🎬 MÉTODO: temInteresseEmBairro
   * 🎯 O QUE FAZ? Filtra se o mano curte morar naquele mato/concreto (faz bate volta da lista dele).
   */
  public temInteresseEmBairro(bairro: string): boolean {
    if (this._bairrosPreferidos.length === 0) return true; // Famoso "Aceito qualquer caçamba"
    return this._bairrosPreferidos.some(
      (b) => b.toLowerCase() === bairro.toLowerCase()
    );
  }

  /**
   * 🎬 MÉTODO: temInteresseEmTipo
   * 🎯 O QUE FAZ? Caça na listinha de caprichos se ele aceita "Kitnet" ou só quer "Mansão".
   */
  public temInteresseEmTipo(tipo: string): boolean {
    if (this._tiposImovel.length === 0) return true; // Qualquer barrão serve
    return this._tiposImovel.includes(tipo);
  }
}
