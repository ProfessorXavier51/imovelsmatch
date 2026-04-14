// ============================================
// 🔌 SERVICE: prisma.service.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Ele é o nosso PORTEIRO VIGIA que liga e desliga a nossa máquina matriz: o Banco de Dados.
//
// 📚 ANALOGIA: É como a IGNIÇÃO DO CARRO 🚗
// - OnModuleInit = Girar a chave pra ligar e começar a queimar gasolina pra interagir na viagem
// - OnModuleDestroy = Tirar a chave quando voltamos pra garagem. Ninguém quer deixar carro ligado de bobeira pegando fogo!
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// É tipo o "Controle de Video-Game". Ele que comanda e empurra toda requisição mágica pros buracos do sistema do banco puxando do PrismaClient.
// ============================================

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * 🏗️ CLASSE: PrismaService
 *
 * 🎯 O QUE FAZ?
 * Herda a parada insana que é o PrismaClient (Nossa grande mágica de falar com banco). 
 * Se injeta nas nossas paradas e garante as fases de acordar e dormir nas conexões pesadonas.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * 🏭 MÉTODO: Construtor
   *
   * 🎯 O QUE FAZ?
   * Bate continência pro classe Pai dele pedindo os Logs de visualização do terminal para mostrar nossa dor de cabeça em bonitas letrinhas!
   */
  constructor() {
    super({
      // Log de tudo: query de SQL inteira, falhas tristes (error) e dores leves (warn)!
      log: ['query', 'error', 'warn'],
      // Coisa mais limpa do Universo
      errorFormat: 'pretty',
    });
  }

  /**
   * 🎬 MÉTODO: onModuleInit (O Start Motor)
   *
   * 🎯 O QUE FAZ?
   * Aquele susto e tranco violento quando inicializa o app do Nest e joga o cabo de força direto pra tomada do MySQL/Postgres da vida.
   */
  async onModuleInit() {
    // Engata a primeira marchar. "Let's Go!"
    await this.$connect();
    console.log('✅ Prisma conectado ao banco de dados com a maestria de um jovem!');
  }

  /**
   * 🎬 MÉTODO: onModuleDestroy (O Good-bye)
   *
   * 🎯 O QUE FAZ?
   * Arranca da parede o cordão quando derrubam a o nosso humilde servidor, pra não deixar nada engasgado rolando solto. Fecha tudo sem cerimônias.
   */
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('✅ Prisma desconectado. Vai dormir!');
  }

  /**
   * 🎬 MÉTODO: cleanDatabase (Varredura Purificadora)
   *
   * 🎯 O QUE FAZ?
   * Tsunami. Destrói literalmente TODO e qualquer resquício de dados vivo!
   * 
   * ⚠️ AVISO MORTAL QUÍMICO TOXICO: Usar na vida real significa Demissão Ilimitada nas chamas!
   * É só pra limpar base em testes para não acumular fantasmas!
   */
  async cleanDatabase(): Promise<void> {
    // 🛡️ Segurança de cofre suíço!
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '🚨 Ta maluco! cleanDatabase() numa produção! Demissão em massa!'
      );
    }

    // 🌪️ Deletagem em cascata pros pais pararem no final depois dos filhotes:
    await this.clienteEtiqueta.deleteMany();
    await this.anotacao.deleteMany();
    await this.atividade.deleteMany();
    await this.negociacao.deleteMany();
    await this.matchLog.deleteMany();
    await this.etiqueta.deleteMany();
    await this.cliente.deleteMany();
    await this.imovel.deleteMany();
    await this.user.deleteMany();

    console.log('🧹 Banco de dados limpo. Zero stress!');
  }

  /**
   * 🎬 MÉTODO: executeRaw 
   *
   * 🎯 O QUE FAZ?
   * Se o Prisma for meninão fresco de não conseguir fazer uma query muito nojenta, a gente injeta no braço a string do SQL puro sem filtros! 
   * Cuidado porque é aí que hacker safado te come pela perna com Injection se não sanitizar!
   */
  async executeRaw(query: string, params?: any[]): Promise<any> {
    return await this.$queryRawUnsafe(query, ...(params || []));
  }
}
