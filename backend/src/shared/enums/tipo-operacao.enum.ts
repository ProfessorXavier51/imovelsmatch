// ============================================
// 📋 ENUM: tipo-operacao.enum.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Define as únicas formas que um imóvel pode ser ofertado pra gente (VENDA ou ALUGUEL).
//
// 📚 ANALOGIA: É como as MARCAÇÕES DE TAMANHO DE ROUPA 👕
// - Você só pode classificar uma casa como "Pra Vender" ou "Pra Alugar". 
// - Assim como roupa é P, M ou G. Não dá pra inventar tamanho!
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Sem isso:
// - Toda hora você teria que checar se guardaram "Venda", "Vender", "venda", algo maluco.
//
// Com isso:
// - O TypeScript obriga que os imóveis tenham o selo oficial e padronizado do nosso sistema.
//
// 💡 DIFERENÇA (Atenção aqui, jovem!)
// - **TipoInteresse**: Fica nos clientes! É o que ELES querem (ex: Quero COMPRAR)
// - **TipoOperacao**: Fica nos imóveis! É o que o PRÉDIO oferece (ex: Estou à VENDA)
//
// 🎮 QUANDO USAR?
// - Ao criar ou alterar as propriedades de um imóvel ou pesquisar casas!
//
// 📝 COMO USAR (Exemplo simples)?
// import { TipoOperacao } from '@shared/enums/tipo-operacao.enum';
// const operacaoDoImovelDaDonaMaria = TipoOperacao.VENDA;
// ============================================

/**
 * 🏗️ ENUM: TipoOperacao
 *
 * 📚 ANALOGIA: Como os corredores de um supermercado 🛒
 * O imóvel tem que estar no corredor de VENDA ou no corredor de ALUGUEL. O sistema não tem um terceiro corredor.
 *
 * 🎯 O QUE FAZ?
 * - Lista as operações permitidas no sistema para tratar um imóvel.
 *
 * 🤔 POR QUÊ EXISTE?
 * Para garantir que todo imóvel tenha sua natureza especificada corretamente de forma engessada, evitando erros de digitação.
 */
export enum TipoOperacao {
  // ========================================
  // PASSO 1: Opção de Venda
  // ========================================
  // 🎯 O que faz? Classifica que o imóvel está à venda e que alguém pode comprá-lo para sempre.
  VENDA = 'VENDA',

  // ========================================
  // PASSO 2: Opção de Aluguel
  // ========================================
  // 🎯 O que faz? Classifica que o imóvel tá disponível só pra pagar o boleto todo mês e morar temporário.
  ALUGUEL = 'ALUGUEL',
}

/**
 * 🎬 MÉTODO: getTipoOperacaoLabel
 *
 * 🎯 O QUE FAZ?
 * Transforma o nosso ENUM em uma palavra bonitinha pra mostrar nas plaquinhas da tela do aplicativo.
 *
 * 📚 ANALOGIA: É como O TRADUTOR DO SISTEMA DE SOM 📢
 * Você lança o código fechado "VENDA" e ele "fala" bonitinho e capitalizado "Venda" pro usuário não ver texto em caixa alta feio.
 *
 * 🔄 FLUXO (Passo a passo):
 * 1. Pega a opção de código (ex: VENDA).
 * 2. Baseado nela (switch), escolhe retornarmos um textinho limpo "Venda".
 *
 * 🤔 POR QUÊ ASSIM?
 * Tirar essa responsabilidade das telas do Front e deixar mastigadinho.
 *
 * @param operacao - O tipo que foi selecionado.
 * @returns Um texto formatado com inicial maiúscula.
 */
export function getTipoOperacaoLabel(operacao: TipoOperacao): string {
  // O switch bate olho na chave para escolher o corredor certo e retornar o texto.
  switch (operacao) {
    case TipoOperacao.VENDA:
      return 'Venda';
    case TipoOperacao.ALUGUEL:
      return 'Aluguel';
    default:
      return operacao;
  }
}

/**
 * 🎬 MÉTODO: getAllTiposOperacao
 *
 * 🎯 O QUE FAZ?
 * Devolve uma lista com todas as opções de operação como um pacote único de textos.
 *
 * 📚 ANALOGIA: É como LISTAR AS VOGAIS NO QUADRO NEGRO 📋
 * Em vez de perguntar se uma letra é vogal, eu mostro A,E,I,O,U de uma vez!
 *
 * 🤔 POR QUÊ ASSIM?
 * Super fácil de preencher listas de pesquisa sem precisar reescrever as palavras nas telas!
 */
export function getAllTiposOperacao(): TipoOperacao[] {
  // Arranca os valores limpos das chaves do enum.
  return Object.values(TipoOperacao);
}

/**
 * 🎬 MÉTODO: isValidTipoOperacao
 *
 * 🎯 O QUE FAZ?
 * Pega um texto (vindo da internet) e verifica se ele é de fato uma de nossas Operações oficias!
 *
 * 📚 ANALOGIA: É como A CATRACA DO METRÔ 🚇
 * Se o bilhete (texto) for válido, a luz fica verde (true) e passa! Se não, ela nem mexe (false).
 *
 * 🤔 POR QUÊ ASSIM?
 * Protege o banco de dados e as validações para pararem na porta dados estranhos (ex: "DOACAO").
 */
export function isValidTipoOperacao(value: string): boolean {
  // Traz todo mundo e confere se a senha dita tá no meio da galera.
  return getAllTiposOperacao().includes(value as TipoOperacao);
}
