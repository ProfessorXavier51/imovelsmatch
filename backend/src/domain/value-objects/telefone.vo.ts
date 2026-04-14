// ============================================
// 📦 VALUE OBJECT: telefone.vo.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Representa e cuida rigorosamente de todas as transformações de "Números de Telefone" pra galera!
//
// 📚 ANALOGIA: É como O "SABE-TUDO" DO TECLADO 📱
// - O cliente digita uma bagunça: (11) 9,999-9999   (Cheio de símbolos)
// - Ele recebe, esmaga tudo os pontinhos e guarda limpinho: 11999999999
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Sem isso:
// - Uns salvam "11999", outros "(11) 99". Imagina o desastre para enviar SMS nisso depois?
//
// Com isso:
// - Nós temos total garantia de que não entra no sistema coisas pequenas de três letras ou texto bobo. O Telefone no sistema só vive com DDD forte!
//
// 🎮 QUANDO USAR?
// - Para todas as entidades que tiverem telefone (ex: Contato do Cliente).
//
// 📝 COMO USAR (Exemplo simples)?
// const tel = new Telefone('(11) 99999-9999');
// console.log(tel.value); // Ele mastiga e joga devolta '11999999999' super liso.
// ============================================

// ============================================
// IMPORTAÇÕES (Trazendo ferramentas que vamos usar)
// ============================================
// 📦 DomainException 
// 💭 O QUE É? O grito que a gente vai soltar se o cliente mandar o telefone sem DDD.
import { DomainException } from '../exceptions/domain.exception';

/**
 * 🏗️ CLASSE: Telefone
 *
 * 📚 ANALOGIA: É a nossa Operadora de Telemarketing! Organiza as linhas todas da mesma forma antes de bater ponto.
 *
 * 🎯 O QUE FAZ?
 * Representa todos telefones (Celulares com nove dígitos ou Fixos com oito).
 */
export class Telefone {
  // 📦 _value
  //
  // 💭 O QUE É? A alma limpinha dele! Apenas Números crus que sobram depois da lavagem.
  //
  // 🤔 POR QUÊ private/readonly?
  // Porque mexer nas coisas fora não é permitido. "Gravamos em pedra" o telefone mastigado.
  private readonly _value: string;

  /**
   * 🎬 MÉTODO: Construtor
   *
   * 🎯 O QUE FAZ?
   * Transforma aquela coisa suja de traços num número fortíssimo que ninguém derruba!
   */
  constructor(value: string) {
    // ========================================
    // PASSO 1: O "tira-manchas"
    // ========================================
    // 🎯 O que faz? Some com todos os tracos '-', pontos '.' do meio!
    // 📚 Analogia: Igual tirar as cascas de um amendoim!
    const normalized = this.normalize(value);

    // ========================================
    // PASSO 2: A barreira Policial
    // ========================================
    // 🎯 O que faz? Garante que sobraram pelo menos os 10 (ou 11) números que formam o DDD e tals.
    this.validate(normalized);

    // ========================================
    // PASSO 3: Protege e salva!
    // ========================================
    this._value = normalized;
  }

  /**
   * 🎬 MÉTODO: normalize (Privado)
   *
   * 🎯 O QUE FAZ?
   * Arranca sem dó e sem piedade tudo o que é símbolo inútil ou espaço vazio!
   */
  private normalize(value: string): string {
    // /\D/g é o feitiço (regex) de arrancar TUDO que for "Não Numero". E bota vazio ('') pro espaço!
    return value.replace(/\D/g, '');
  }

  /**
   * 🎬 MÉTODO: validate (Privado)
   *
   * 🎯 O QUE FAZ?
   * Bate o cartão! Sabe que o número chegou limpo e conta se o tamanho de números obedece as regras do Brasil.
   */
  private validate(value: string): void {
    // 1. Checa as VAZIEZAS 👻
    if (!value || value.length === 0) {
      throw new DomainException('Telefone não pode ser vazio');
    }

    // 2. Confirma a Regra do Brasil de "Fixo (10)" e de "Celular (11)"
    if (value.length < 10 || value.length > 11) {
      throw new DomainException(
        'Telefone deve ter 10 dígitos (fixo) ou 11 dígitos (celular)'
      );
    }

    // 3. Verifica DDD para checar se ele de fato inventou a área do estado!
    const ddd = parseInt(value.substring(0, 2));

    // DDD não existe se for menos de 11 (SP)
    if (ddd < 11 || ddd > 99) {
      throw new DomainException('DDD inválido (deve ser entre 11 e 99)');
    }

    // 4. Se ele garantiu que é celular, checamos a novidade dos anos 2000s do número 9 no Brasil afora!
    if (value.length === 11) {
      // Puxa depois do 11x... no caso x!
      const primeiroDigito = value.charAt(2);

      // ⚠️ Cuidado! Só pra celular, se não começar com 9 é Fake!
      if (primeiroDigito !== '9') {
        throw new DomainException(
          'Celular deve começar com 9 após o DDD'
        );
      }
    }
  }

  /**
   * 🎬 MÉTODO: value (Getter)
   *
   * 🎯 O QUE FAZ?
   * Visor onde a gente enxerga o telefone cru pro mundo (119999...)
   */
  get value(): string {
    return this._value;
  }

  /**
   * 🎬 MÉTODO: formatted
   *
   * 🎯 O QUE FAZ?
   * Ele pega a pedra polida e joga num molde bonitinho (11) 9....
   * 
   * 📚 ANALOGIA: É como O EMBRULHO DE PRESENTE 🎁
   * Por dentro tem os dígitos crus e chatos que ninguém lê bem. A gente bota fita pro olho humano gostar de enxergar nas telinhas do celular de quem vê o app!!
   */
  public formatted(): string {
    // Se o telefone for celular, bota um traço dferente do fixo!
    if (this._value.length === 11) {
      // Magia de colar o ( xx ) na frente, e o tracinho depois do quinto numero!
      return `(${this._value.substring(0, 2)}) ${this._value.substring(2, 7)}-${this._value.substring(7)}`;
    } else {
      // Igual de cima, só que o traço vem no meio certinho pros 4 restos de placa de fixo!
      return `(${this._value.substring(0, 2)}) ${this._value.substring(2, 6)}-${this._value.substring(6)}`;
    }
  }

  /**
   * 🎬 MÉTODO: isCelular
   *
   * 🎯 O QUE FAZ?
   * Devolve uma resposta rápida se o nosso telefone é de celular sim ou não!
   * É só ver o tamanho de letras se bate 11 que já tiramos a febre fácil fácil.
   */
  public isCelular(): boolean {
    return this._value.length === 11;
  }

  /**
   * 🎬 MÉTODO: equals
   *
   * 🎯 O QUE FAZ?
   * Serve pra saber se temos números de telefones literalmente espelhados!
   * Batemos um com ele e diz sim ou não! Perfeito pra não salvar duas vezes a mesma coisa na base...
   */
  public equals(other: Telefone): boolean {
    return this._value === other._value;
  }

  /**
   * 🎬 MÉTODO: toString
   *
   * 🎯 O QUE FAZ?
   * Transforma pro Typescript cru como se fosse simples string caso tentem empurrar em Logs!
   */
  public toString(): string {
    return this._value;
  }
}
