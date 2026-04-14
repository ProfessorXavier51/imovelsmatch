// ============================================
// 🎬 USE CASE: update-cliente.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Muda a roupa, o cabelo e as manias do cliente, salva e já era.
//
// 📚 ANALOGIA: O PIT STOP DA FÓRMULA 1 🏎️
// - O cara encosta (vem pelo ID).
// - Você diz o que muda (troca pneu, bota gasosa).
// - Confere as regras e a parada sai rodando com dado fresco.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Ninguém quer apagar um contato na vida real só porque a pessoa mudou de número de telefone, né? Então a gente atualiza a porra toda sem perder a essência do bixinho.
// ============================================

import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { IClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/entities/cliente.entity';
import { UpdateClienteDTO } from '../../dtos/cliente/update-cliente.dto';

/**
 * 🏗️ CLASSE: UpdateClienteUseCase
 *
 * 🎯 O QUE FAZ?
 * O mecânico-chefe. Abre o capô do cliente, faz o update da versão, valida e guarda a peça!
 */
@Injectable()
export class UpdateClienteUseCase {
  
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
   * 🎯 O QUE FAZ? Pega o remendo, joga no rasgo, valida e atualiza todo mundo.
   */
  async execute(id: string, input: UpdateClienteDTO): Promise<Cliente> {
    
    // 1️⃣ Vai ver se existe o presunto antes de fazer velório e cirurgia:
    const cliente = await this.clienteRepository.findById(id);

    if (!cliente) {
      throw new NotFoundException(`Cliente ID ${id} não existe na galáxia!`);
    }

    // 2️⃣ Se o cara malandro quis trocar o E-mail, a gente bate a lupa se esse email já não é de outro vacilão.
    // 📚 Analogia: Um assento extra no cinema não pode ter a bunda de duas pessoas!
    if (input.email && input.email !== cliente.email) {
      const emailExiste = await this.clienteRepository.findByEmail(input.email);
      
      if (emailExiste) {
        throw new ConflictException('Mano, esse E-mail já tá em uso pelo concorrente!');
      }
    }

    // 3️⃣ Passa os dados mastigados e a entidade mesma se auto-valida (Cirurgia plástica rodando)
    cliente.update(input);

    // 4️⃣ Joga a Entity atualizada de volta pro Repositório escrever as mudanças de vez.
    const clienteAtualizado = await this.clienteRepository.update(cliente);

    // 5️⃣ Devolve o cara com corte de cabelo novo!
    return clienteAtualizado;
  }
}
