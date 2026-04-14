// ============================================
// 📦 INTERFACE: user.repository.interface.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Define O CONTRATO, as tatuagens obrigatórias, pra ser um guardião de usuários no banco de dados.
//
// 📚 ANALOGIA: O MANUAL DE INSTRUÇÕES DA PORTARIA 📖
// - Lista TUDO que o porteiro/estoquista TEM QUE FAZER.
// - Não me importa como ele faz, mas se ele não buscar ou criar usuários do jeito certo, o prédio cai!
//
// 🤔 POR QUÊ INTERFACE?
// É tipo o padrão USB: a gente não quer casar o código com o Prisma logo de cara. Qualquer banco de dados que souber fazer isso aqui, tá contratado!
// ============================================

import { User } from '../entities/user.entity';

/**
 * 📋 INTERFACE: IUserRepository
 *
 * 🎯 O QUE FAZ?
 * Obriga o cara do Banco de Dados a dominar essas skills:
 *
 * 📚 ANALOGIA: TAREFAS DA PORTARIA
 * - create() = Faz o crachá do cara novo
 * - findById() = Puxa a capivara pela numeração do crachá
 * - findByEmail() = Acha o doido pelo e-mail
 * - update() = Bota um nome novo no crachá
 * - delete() = Quebra o crachá no meio (Banido)
 * - findAll() = Mostra geral que frequenta o salão
 */
export interface IUserRepository {
  /**
   * 💾 Fazer Crachá Novo
   */
  create(user: User): Promise<User>;

  /**
   * 🔍 Pesquisar Crachá (Pelo Código/ID)
   */
  findById(id: string): Promise<User | null>;

  /**
   * 📧 Pesquisar Cidadão (Pelo E-mail)
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * 🔄 Atualizar dados da pessoa
   */
  update(user: User): Promise<User>;

  /**
   * 🗑️ Banir do clube
   */
  delete(id: string): Promise<void>;

  /**
   * 📊 Fofocar quem tá na base toda
   */
  findAll(): Promise<User[]>;
}
