// ============================================
// 📋 EXCEÇÃO: domain.exception.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Ele cria o nosso próprio tipo de erro no sistema, focado em "regras de negócio" que foram quebradas.
//
// 📚 ANALOGIA: É como O JUIZ DO JOGO DE FUTEBOL ⚽
// - O juiz levanta o cartão (exceção) para mostrar que alguém desrespeitou as regras.
// - Isso é diferente do "estourou o pneu do carro" (erro de banco de dados). É focado nas regras do jogo!
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Sem isso:
// - Todo erro seria tratado de forma igual. Não saberíamos se o erro foi de conexão ou se o cara digitou o e-mail torto.
//
// Com isso:
// - Conseguimos separar os erros bestas (ex: "CPF inválido") dos erros graves (ex: "Servidor pegou fogo").
//
// 🎮 QUANDO USAR?
// - Quando os dados do domínio (Validação de e-mail, telefone, campos obrigatórios) estiverem errados.
//
// 📝 COMO USAR (Exemplo simples)?
// throw new DomainException('Esse usuário precisa ser maior de idade!');
// ============================================

/**
 * 🏗️ CLASSE: DomainException
 *
 * 📚 ANALOGIA: É um "Error" modificado que grita mais alto quando as regras de negócio apitam!
 *
 * 🎯 O QUE FAZ?
 * Representa os nossos próprios erros bonitinhos e filtrados.
 *
 * 🤔 POR QUÊ EXISTE?
 * Para facilitar a leitura quando os erros caírem no nosso teclado de debug.
 *
 * 📝 EXEMPLO DE USO:
 * throw new DomainException('Campo obrigatório');
 */
export class DomainException extends Error {
  /**
   * 🎬 MÉTODO: Construtor (A primeira coisa que roda)
   *
   * 🎯 O QUE FAZ?
   * Recebe um texto descritivo e monta nosso "cartão amarelo".
   *
   * 📚 ANALOGIA: É como ESCREVER A MULTA 📝
   * O texto descreve o que o cara fez de errado nas regras do servidor.
   *
   * 🔄 FLUXO (Passo a passo):
   * 1. Recebe o motivo da bronca.
   * 2. Repassa pro "Error" pai (classe que originou essa).
   * 3. Registra o nome bonitinho.
   * 4. Guarda onde foi que aconteceu pra consertarmos rápido.
   */
  constructor(message: string) {
    // ========================================
    // PASSO 1: Repassa para classe Error e monta base
    // ========================================
    // 🎯 O que faz? Acorda o Javascript e fala: "Ei, construa um erro comum aí primeiro".
    // 🤔 Por quê? Como herdamos as coisas do Error pai, a gente não pode esquecer de ligar ele primeiro.
    super(message);

    // ========================================
    // PASSO 2: Bota o nome na gola
    // ========================================
    // 🎯 O que faz? Batiza o erro!
    // 📚 Analogia: Igual aquelas etiquetas de roupa com seu nome.
    this.name = 'DomainException';

    // ========================================
    // PASSO 3: Guarda a trilha de migalhas
    // ========================================
    // 🎯 O que faz? Rastreamento do erro no console (Stack trace).
    // 🤔 Por quê? Sem isso a gente só sabe que deu erro, mas não onde. Isso aponta o dedo pra linha exata.
    Error.captureStackTrace(this, this.constructor);
  }
}

