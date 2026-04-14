// ============================================
// 🎬 USE CASE: find-cliente.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Descobre onde tá escondida a capivara do cliente específico pelo ID.
//
// 📚 ANALOGIA: MODO JEDI DA BUSCA 🔦
// - Você bota a chave na fechadura (ID)
// - A porta da ficha se abre e você saca todos os detalhes.
// 
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Porque não dá pra trazer 5.000 clientes da base quando o atendente quer só exibir o perfil do "Tio João" na tela. Isso aqui resgata a pessoa e ponto final.
// ============================================

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/entities/cliente.entity';

/**
 * 🏗️ CLASSE: FindClienteUseCase
 *
 * 🎯 O QUE FAZ?
 * É o dedo-duro do sistema. Pega um RG (ID) e grita os dados da pessoa!
 */
@Injectable()
export class FindClienteUseCase {
  
  /**
   * 🏭 MÉTODO: Construtor
   *
   * 🎯 O QUE FAZ? Injeta o cara das buscas pesadas, o nosso Estoquista/Bibliotecário.
   */
  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,
  ) {}

  /**
   * 🎬 MÉTODO: execute
   *
   * 🎯 O QUE FAZ? Vai fundo na estante, acha a pasta da pessoa pelo número da etiqueta (ID) e entrega na sua mão.
   */
  async execute(id: string): Promise<Cliente> {
    // 1️⃣ Pede pro porteiro catar o registro na base.
    const cliente = await this.clienteRepository.findById(id);

    // 2️⃣ Bateu na trave e não achou? XINGA GERAL jogando um erro 404!
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} sumiu do mapa, mano!`);
    }

    // 3️⃣ Achou? Perfeito, entrega o pacotinho no capricho (A entidade).
    return cliente;
  }
}
