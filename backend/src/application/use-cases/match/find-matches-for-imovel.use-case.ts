// ============================================
// 📦 USE-CASE: find-matches-for-imovel.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É o milagre do "Match". Você cadastra uma casa e esse arquivo corre a base de clientes doidos atrás de casa e fala: "Deu Namoro!"
//
// 📚 ANALOGIA: O TINDER DOS IMÓVEIS 🔥
// - Casa tá a Venda? Chama quem quer COMPRAR na Mesma Cidade!
// - Passa um pente fino (Filter): "Mano, o cara só tem 100 conto, ele não pode com a mansão de 1 milhão".
// - Bairro e tipo tem que casar bonitinho também. (Senão ele dá "Deslike").
// ============================================

import { Injectable, Inject } from '@nestjs/common';
import { IClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Imovel } from '../../../domain/entities/imovel.entity';
import { TipoInteresse } from '../../../shared/enums/tipo-interesse.enum';

@Injectable()
export class FindMatchesForImovelUseCase {
  constructor(
    @Inject('IClienteRepository')
    private clienteRepository: IClienteRepository,
  ) {}

  /**
   * 🚀 RODANDO O ALGORITMO DO AMOR ❤️
   */
  async execute(imovel: Imovel) {
    // 1. Cortando o mal pela raiz! Busca só a galera que respira (ativo), na MESMA cidade/estado e com o interesse CORRETO.
    const filters = {
      ativo: true,
      tipoInteresse: imovel.operacao === 'VENDA' ? TipoInteresse.COMPRAR : TipoInteresse.ALUGAR,
      cidade: imovel.cidade,
      estado: imovel.estado,
    };

    // Pega a galera! (Mude a paginação futuramente se tiver 10 mil clientes de uma vez 😂)
    const result = await this.clienteRepository.findAll(filters, 1, 100);

    // 2. Agora que o Tinder agrupou, rola a peneira no JavaScript pra ver o bolso e o gosto!
    const matches = result.data.filter((cliente) => {
      
      // Bolso (Valor tá no limite do cara?)
      const valorOk = imovel.valor >= (cliente.valorMinimo || 0) && 
                      imovel.valor <= (cliente.valorMaximo || Infinity);
      
      // Bairro (O cara meteu bairro preferido? Se sim, essa casa tá num desses?)
      const bairroOk = !cliente.bairrosPreferidos?.length || 
                       cliente.bairrosPreferidos.includes(imovel.bairro);
      
      // Tipo (É AP e o cara quer Casa?)
      const tipoOk = !cliente.tiposImovel?.length || 
                     cliente.tiposImovel.includes(imovel.tipoImovel);

      // Só dá match supremo se tudo estiver Ok! 🔥
      return valorOk && bairroOk && tipoOk;
    });

    return matches;
  }
}
