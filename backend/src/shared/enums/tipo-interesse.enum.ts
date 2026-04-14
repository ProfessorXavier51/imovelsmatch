// ============================================
// ENUM: TipoInteresse
// ============================================
//
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// - Definir tipos de interesse do cliente
// - Garantir apenas valores válidos
// - Fornecer labels para exibição
//
// O que é Enum?
// - Conjunto fixo de valores constantes
// - Type-safe: TypeScript valida em tempo de compilação
// - Evita "magic strings" no código
//
// Por quê usar Enum?
// - Evita erros de digitação ('COMPRAR' vs 'comprar')
// - Autocomplete no IDE
// - Facilita refatoração
// - Documenta valores possíveis
//
// 🎮 QUANDO USAR?
// - Sempre que houver conjunto fixo de valores
// - Campos que aceitam apenas opções específicas
//
// Onde é usado?
// - Entity Cliente (campo tipoInteresse)
// - DTOs de criação/atualização de cliente
// - Filtros de busca
// - Matching de imóveis
//
// Como usar?
// import { TipoInteresse } from '@shared/enums/tipo-interesse.enum';
// const tipo = TipoInteresse.COMPRAR;
// ============================================

/**
 * ENUM TIPOINTERESSE
 *
 * Define os tipos de interesse que um cliente pode ter.
 *
 * Valores possíveis:
 * - COMPRAR: Cliente quer comprar um imóvel
 * - ALUGAR: Cliente quer alugar um imóvel
 */
export enum TipoInteresse {
  // Cliente interessado em comprar imóvel
  // 🎮 QUANDO USAR? Cliente busca imóveis para venda
  // Matching? Busca imóveis com operacao = VENDA
  COMPRAR = 'COMPRAR',

  // Cliente interessado em alugar imóvel
  // 🎮 QUANDO USAR? Cliente busca imóveis para aluguel
  // Matching? Busca imóveis com operacao = ALUGUEL
  ALUGAR = 'ALUGAR',
}

/**
 * HELPER: Retorna label amigável para exibição
 *
 * Por quê função separada?
 * - Centraliza lógica de formatação
 * - Facilita internacionalização futura
 * - Reutilizável em todo o sistema
 *
 * Onde usar?
 * - Frontend: Exibir em selects, tabelas
 * - Backend: Logs, e-mails, notificações
 *
 * @param tipo - Tipo de interesse
 * @returns Label formatado em português
 *
 * Exemplo:
 * getTipoInteresseLabel(TipoInteresse.COMPRAR); // 'Comprar'
 * getTipoInteresseLabel(TipoInteresse.ALUGAR);  // 'Alugar'
 */
export function getTipoInteresseLabel(tipo: TipoInteresse): string {
  // Switch case para mapear enum para label
  // Por quê switch? Mais legível que objeto
  // Por quê não método no enum? TypeScript não permite
  switch (tipo) {
    // Caso COMPRAR
    // Retorna: 'Comprar' (primeira letra maiúscula)
    case TipoInteresse.COMPRAR:
      return 'Comprar';

    // Caso ALUGAR
    // Retorna: 'Alugar'
    case TipoInteresse.ALUGAR:
      return 'Alugar';

    // Default: nunca deve acontecer
    // 🤔 POR QUÊ? TypeScript garante tipo correto
    // Mas mantemos para segurança em runtime
    default:
      return tipo;
  }
}

/**
 * HELPER: Converte tipo de interesse para tipo de operação
 *
 * Por quê esta função?
 * - Cliente tem "interesse" (COMPRAR/ALUGAR)
 * - Imóvel tem "operação" (VENDA/ALUGUEL)
 * - Precisamos mapear um para outro no matching
 *
 * Regra de negócio:
 * - Cliente quer COMPRAR → Busca imóveis em VENDA
 * - Cliente quer ALUGAR → Busca imóveis em ALUGUEL
 *
 * Onde usar?
 * - Use case de matching
 * - Filtros de busca
 * - Queries no repositório
 *
 * @param interesse - Tipo de interesse do cliente
 * @returns Tipo de operação correspondente do imóvel
 *
 * Exemplo:
 * getOperacaoFromInteresse(TipoInteresse.COMPRAR); // TipoOperacao.VENDA
 * getOperacaoFromInteresse(TipoInteresse.ALUGAR);  // TipoOperacao.ALUGUEL
 */
export function getOperacaoFromInteresse(interesse: TipoInteresse): string {
  // Importa enum TipoOperacao
  // Por quê não importar no topo?
  // - Evita dependência circular
  // - Importação lazy (só quando função é chamada)
  const { TipoOperacao } = require('./tipo-operacao.enum');

  // Mapeia interesse para operação
  switch (interesse) {
    // Cliente quer COMPRAR
    // Busca imóveis em VENDA
    case TipoInteresse.COMPRAR:
      return TipoOperacao.VENDA;

    // Cliente quer ALUGAR
    // Busca imóveis em ALUGUEL
    case TipoInteresse.ALUGAR:
      return TipoOperacao.ALUGUEL;

    // Default: retorna o próprio valor
    // Nunca deve acontecer
    default:
      return interesse;
  }
}

/**
 * HELPER: Retorna todos os valores do enum
 *
 * Por quê útil?
 * - Gerar options de select no frontend
 * - Validações
 * - Testes
 *
 * @returns Array com todos os valores
 *
 * Exemplo:
 * getAllTiposInteresse(); // ['COMPRAR', 'ALUGAR']
 */
export function getAllTiposInteresse(): TipoInteresse[] {
  // Object.values retorna array com valores do enum
  // 🔄 COMO FUNCIONA?
  // - TipoInteresse é objeto: { COMPRAR: 'COMPRAR', ALUGAR: 'ALUGAR' }
  // - Object.values pega apenas os valores
  // - Retorna: ['COMPRAR', 'ALUGAR']
  return Object.values(TipoInteresse);
}

/**
 * HELPER: Valida se string é tipo de interesse válido
 *
 * Por quê útil?
 * - Validar input do usuário
 * - Converter string para enum
 * - Evitar erros em runtime
 *
 * @param value - String a validar
 * @returns true se válido, false caso contrário
 *
 * Exemplo:
 * isValidTipoInteresse('COMPRAR'); // true
 * isValidTipoInteresse('VENDER');  // false
 * isValidTipoInteresse('comprar'); // false (case sensitive)
 */
export function isValidTipoInteresse(value: string): boolean {
  // Verifica se valor está no enum
  // 🔄 COMO FUNCIONA?
  // - getAllTiposInteresse() retorna ['COMPRAR', 'ALUGAR']
  // - includes() verifica se array contém o valor
  // - Retorna true ou false
  return getAllTiposInteresse().includes(value as TipoInteresse);
}

// ============================================
// EXEMPLOS DE USO
// ============================================
//
// 1. USAR NO CÓDIGO:
// const interesse = TipoInteresse.COMPRAR;
// if (interesse === TipoInteresse.COMPRAR) {
//   console.log('Cliente quer comprar');
// }
//
// 2. OBTER LABEL:
// const label = getTipoInteresseLabel(TipoInteresse.COMPRAR);
// console.log(label); // 'Comprar'
//
// 3. CONVERTER PARA OPERAÇÃO:
// const operacao = getOperacaoFromInteresse(TipoInteresse.COMPRAR);
// console.log(operacao); // TipoOperacao.VENDA
//
// 4. LISTAR TODOS:
// const todos = getAllTiposInteresse();
// console.log(todos); // ['COMPRAR', 'ALUGAR']
//
// 5. VALIDAR STRING:
// const valido = isValidTipoInteresse('COMPRAR');
// console.log(valido); // true
//
// 6. NO DTO (class-validator):
// import { IsEnum } from 'class-validator';
// class CreateClienteDTO {
//   @IsEnum(TipoInteresse)
//   tipoInteresse: TipoInteresse;
// }
//
// 7. NO FRONTEND (React Select):
// const options = getAllTiposInteresse().map(tipo => ({
//   value: tipo,
//   label: getTipoInteresseLabel(tipo)
// }));
// // [
// //   { value: 'COMPRAR', label: 'Comprar' },
// //   { value: 'ALUGAR', label: 'Alugar' }
// // ]
// ============================================
