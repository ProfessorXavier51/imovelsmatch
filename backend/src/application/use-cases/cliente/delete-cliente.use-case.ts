// ============================================
// 🎬 USE CASE: delete-cliente.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Faz a limpa total! Apaga o cliente do sistema e joga a chave fora.
//
// 📚 ANALOGIA: É como O "DELETE" DO INSTAGRAM 🗑️
// - O cara cansou da plataforma e mandou apagar.
// - O sistema vai lá, arranca ele da Matrix e não deixa rastro.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// LGPD chata rolando solta! Se o mano não quer mais brincar, a gente precisa apagar a ficha dele pra vida fluir. Sem choro e sem volta!
// ============================================

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IClienteRepository } from '../../../domain/repositories/cliente.repository.interface';

/**
 * 🏗️ CLASSE: DeleteClienteUseCase
 *
 * 🎯 O QUE FAZ?
 * O executor da sentença final. Deleta o cliente para todo o sempre.
 */
@Injectable()
export class DeleteClienteUseCase {
  
  /**
   * 🏭 MÉTODO: Construtor (Apresentando o Carrasco)
   *
   * 🎯 O QUE FAZ? Puxa o 'Bibliotecário' (Repositório) pra poder rasgar a ficha de vez.
   */
  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,
  ) {}

  /**
   * 🎬 MÉTODO: execute
   *
   * 🎯 O QUE FAZ? Dá o comando pro repositório tacar fogo na ficha e deletar as memórias!
   *
   * 📚 ANALOGIA: APAGANDO O CONTATO DO EX 💔
   * - Você caça o contato (ID) na agenda.
   * - O sistema avisa: "Certeza?".
   * - Tu aperta o vermelho e acabou-se de vez.
   */
  async execute(id: string): Promise<void> {
    // 1️⃣ CAÇADOR DE RECOMPENSA: Bate o olho na lista pra ver se o cabra existe antes de tentar mandar pro ralo!
    const cliente = await this.clienteRepository.findById(id);

    // Se o sujeito for fantasma (null), xinga o usuário avisando que não achou!
    if (!cliente) {
      throw new NotFoundException(`Foi malzada! O Cliente com ID ${id} não tá na base`);
    }

    // 2️⃣ FACA NA CAVEIRA: Apaga o lazarento do banco (vai de vala junto com o histórico todo do Cascade)
    await this.clienteRepository.delete(id);

    // E a gente volta a vida normal de cabeça limpa (return void).
  }
}
