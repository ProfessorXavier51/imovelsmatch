// ============================================
// 📦 ENTITY: user.entity.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Define os donos do sistema (corretores, admins).
//
// 📚 ANALOGIA: O CRACHÁ DA EMPRESA 🪪
// - Só quem tem crachá entra no salão.
// - Alguns são VIP (ADMIN), os outros são normais (USER).
// - O e-mail é o carimbo único. Não existe duas pessoas com a mesma cara no crachá.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra separar quem é o Cliente (Lead buscando imóvel) e quem é o Usuário (o Staff que administra).
// ============================================

import { Email } from '../value-objects/email.vo';
import { DomainException } from '../exceptions/domain.exception';

/**
 * 🏗️ INTERFACE: CreateUserProps
 *
 * 📚 ANALOGIA: Formulário do RH pra mandar rodar o crachá
 */
export interface CreateUserProps {
  nome: string;
  email: string;
  senha: string;
  role?: 'ADMIN' | 'USER';
}

export type UpdateUserProps = Partial<Omit<CreateUserProps, 'senha'>>;

/**
 * 🏗️ CLASSE: User
 *
 * 🎯 O QUE FAZ? A Matrix do Corretor. Guarda o dono da conta.
 */
export class User {
  private _id?: string;
  private _nome: string;
  private _email: Email;
  private _senha: string; // Senha zoada com Bcrypt, ninguém sabe ler
  private _role: 'ADMIN' | 'USER';
  private _ativo: boolean;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: CreateUserProps, id?: string) {
    this._id = id;
    this._nome = props.nome;
    // Joga pro segurança validar o e-mail:
    this._email = new Email(props.email);
    this._senha = props.senha;
    this._role = props.role || 'USER'; // Se num disse nada, é peão
    this._ativo = true;
    this._createdAt = new Date();
    this._updatedAt = new Date();

    this.validate();
  }

  /**
   * 🔍 MÉTODO: validate
   *
   * 🎯 O QUE FAZ? Dá a catraca moral no doidão que digita coisa errada
   */
  private validate(): void {
    if (!this._nome || this._nome.trim().length < 3) {
      throw new DomainException('Mano, como que teu nome tem menos de 3 letras? Completa aí');
    }

    if (this._nome.length > 100) {
      throw new DomainException('Chega de história triste, o nome tá gigante bicho! Máximo 100');
    }
  }

  /**
   * 🔄 MÉTODO: update
   */
  update(props: UpdateUserProps): void {
    if (props.nome !== undefined) {
      this._nome = props.nome;
    }

    if (props.email !== undefined) {
      this._email = new Email(props.email);
    }

    if (props.role !== undefined) {
      this._role = props.role;
    }

    this._updatedAt = new Date();
    this.validate();
  }

  // ========================================
  // GETTERS (Buscando o R.G sem amassar o plástico)
  // ========================================
  get id(): string | undefined {
    return this._id;
  }
  get nome(): string {
    return this._nome;
  }
  get email(): string {
    return this._email.value;
  }
  get senha(): string {
    return this._senha;
  }
  get role(): 'ADMIN' | 'USER' {
    return this._role;
  }
  get ativo(): boolean {
    return this._ativo;
  }
  get createdAt(): Date | undefined {
    return this._createdAt;
  }
  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  // ========================================
  // MÉTODOS TOP DA GALÁXIA
  // ========================================

  /**
   * 🔒 MÉTODO: desativar
   *
   * 🎯 O QUE FAZ? Corta o acesso do doido (Demitido!) sem apagar do banco
   */
  desativar(): void {
    this._ativo = false;
    this._updatedAt = new Date();
  }

  /**
   * 🔓 MÉTODO: ativar
   *
   * 🎯 O QUE FAZ? Acendeu a luz de novo e tá trampando!
   */
  ativar(): void {
    this._ativo = true;
    this._updatedAt = new Date();
  }

  /**
   * 👑 MÉTODO: isAdmin
   *
   * 🎯 O QUE FAZ? Pergunta: "Esse maluco tem a chave do servidor?"
   */
  isAdmin(): boolean {
    return this._role === 'ADMIN';
  }
}
