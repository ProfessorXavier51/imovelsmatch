// ============================================
// 📦 VALUE OBJECT: email.vo.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Cuida de gerenciar, formatar e garantir a segurança de um e-mail válido no sistema.
//
// 📚 ANALOGIA: É como O SEGURANÇA DA BALADA 🕺
// - Você digita: "joao@gmail.com" ✅ Pode entrar! (Tudo certo)
// - Você digita: "joao.gmail.com" ❌ Volta pro fim da fila! (Esqueceu o @)
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Sem isso:
// - A gente teria verificação de "@" espalhada em 5 lugares diferentes. E se o cara cadastrar "nada aver" no banco de dados, ia ferrar nosso marketing!
// 
// Com isso:
// - Se o objeto "Email" passar, você não precisa NUNCA MAIS validar isso de novo.
//
// 💡 O QUE É VALUE OBJECT?
// É tipo o "Dinheiro". Eu não importo com a ID da nota de 50, se você me der uma ou outra eu aceito igual, as duas valem 50. Value Object é um objeto simples só pelo seu "valor" (e-mail), o qual não queremos ficar alterando toda hora.
//
// 🎮 QUANDO USAR?
// - Para todas as entidades dos nossos projetos que pedirem "email".
//
// 📝 COMO USAR (Exemplo simples)?
// const email = new Email('joao@example.com');
// console.log(email.value); // Puxa 'joao@example.com' certinho
// ============================================

// ============================================
// IMPORTAÇÕES (Trazendo ferramentas que vamos usar)
// ============================================
// 📦 DomainException
// 💭 O QUE É? A nossa "multa oficial" quando as regras não fecham!
// 🎯 QUANDO/ONDE USAR? Vamos lançar ela se alguém tentar passar um email torto pro nosso construtor.
import { DomainException } from '../exceptions/domain.exception';

/**
 * 🏗️ CLASSE: Email
 *
 * 📚 ANALOGIA: É uma armadura intransponível para textos!
 * Você passa o email por ela. Se aguentar a porrada, é guardado aí dentro!
 *
 * 🎯 O QUE FAZ?
 * Representa um e-mail ultra-validado da hora que nasce até a hora que morre.
 *
 * 🤔 POR QUÊ EXISTE?
 * Obriga o programador a tratar essas coisas cruciais pra ele não enviar spam falhado!
 */
export class Email {
  // 📦 _value
  //
  // 💭 O QUE É? O lugar de verdade onde o email final fica salvo.
  //
  // 📚 ANALOGIA: É como O COFRE. Nós validamos tudo na porta e jogamos a joia ali dentro!
  //
  // 🤔 POR QUÊ private/readonly?
  // Private: Ninguém lá de fora enxerga ou fuça.
  // Readonly: "Gravado Em Pedra", imutável. Preencheu, não muda NUNCA MAIS! Crie um novo se precisar.
  private readonly _value: string;

  /**
   * 🎬 MÉTODO: Construtor 
   *
   * 🎯 O QUE FAZ?
   * Prepara o e-mail com banho de cheiro antes de jogar ele lá pro estado protegido.
   *
   * 📚 ANALOGIA: É A FILA DA TRIAGEM 🩺
   * A gente olha cara-crachá, normaliza a força e aí sim, salva pro futuro.
   *
   * 🔄 FLUXO (Passo a passo):
   * 1. Passa pelas leis das validações fortíssimas.
   * 2. Tira todos os espaços de texto soltos indesejados.
   * 3. Transforma em minúscula para padronizar perfeitamente.
   */
  constructor(value: string) {
    // ========================================
    // PASSO 1: Famosa averiguação!
    // ========================================
    // 🎯 O que faz? Checa se o formato de texto fecha com email de verdade.
    // 🤔 Por quê? Pra jogar nosso erro se a pessoa preenceu torto, parando tudo aqui!
    this.validate(value);

    // ========================================
    // PASSO 2: Normalização Mágica!
    // ========================================
    // 🎯 O que faz? Traz pro minúsculo ("JOAO" vira "joao") e tira espaço das pontas (trim).
    // 🤔 Por quê? Pra evitar emails duplicados apenas porque alguém preencheu tudo em CAIXA ALTA... Aff!
    this._value = value.trim().toLowerCase();
  }

  /**
   * 🎬 MÉTODO: validate (Privadão nosso)
   *
   * 🎯 O QUE FAZ?
   * Cão de guarda do nosso e-mail para validar as regras pesadas de texto.
   *
   * 📚 ANALOGIA: É O TESTE DO BAFÔMETRO 🗣️
   * Ele roda um scanner. Se deitar fora do formato, levanta o cartão de "DomainException" na cara do rapaz.
   *
   * 🤔 POR QUÊ ASSIM?
   * Separar responsabilidade da classe. Ela só serve embutida no nosso construtor.
   */
  private validate(value: string): void {
    // ========================================
    // VERIFICAÇÃO 1: Nada de Fantasmas! 👻
    // ========================================
    // Se jogar nada ou tentar dar bobeira com null
    if (!value || value.trim().length === 0) {
      throw new DomainException('E-mail não pode ser vazio');
    }

    // ========================================
    // VERIFICAÇÃO 2: Laser Scanner de "Arrobas e Pontos"
    // ========================================
    // Regex, o terror dos novatos. O que importa é que isso é uma matemática para verificar: 
    // Tem que ter palavra, "@", domínio, mais palavra e final bonito. (ex: teste@gmail.com)
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Se falhou no teste, toma castigo!
    if (!emailRegex.test(value)) {
      throw new DomainException('Formato de e-mail inválido');
    }
  }

  /**
   * 🎬 MÉTODO: value (Getter)
   *
   * 🎯 O QUE FAZ?
   * Janelinha protegida para espiar o conteúdo da nossa caixinha travada no '_value'!
   * 
   * 🤔 POR QUÊ ASSIM?
   * Porque só queremos que as pessoas VEJAM o valor do email sem chances de alterar a rodo!
   */
  get value(): string {
    return this._value;
  }

  /**
   * 🎬 MÉTODO: equals
   *
   * 🎯 O QUE FAZ?
   * Diz se "Meu email" tem de fato o mesmíssimo valor de texto de "Outro email", pra caso a gente precise comparar um formulário, por exemplo!
   *
   * 📚 ANALOGIA: É como CONTAR QUANTO TEM NAS DUAS CARTEIRAS 💰
   * Não me importo se o dinheiro tá no seu bolso ou no meu. Seu Email é o email "teste"? Opa, o meu também! Somos irmãos!
   *
   * 🎮 QUANDO USAR?
   * Sempre que for procurar se dois objetos são um reflexo do outro por conta de textos iguais!
   */
  public equals(other: Email): boolean {
    return this._value === other._value;
  }

  /**
   * 🎬 MÉTODO: toString
   *
   * 🎯 O QUE FAZ?
   * Uma maneira universal de entregar e mostrar esse nosso E-mail como sendo um simples pacotinho de texto!
   *
   * 🤔 POR QUÊ ASSIM?
   * Muitas vezes o Javascript fica maluco quando a gente imprime um arquivo Object. Jogando este método o Javascript enxerga string perfeitamente!
   */
  public toString(): string {
    return this._value;
  }
}
