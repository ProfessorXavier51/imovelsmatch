#!/usr/bin/env node

/**
 * 🤖 SCRIPT AUTOMÁTICO: Reescreve Comentários para Linguagem Adolescente
 * 
 * O QUE FAZ?
 * - Lê todos os arquivos .ts do projeto
 * - Identifica comentários técnicos
 * - Reescreve com linguagem adolescente e analogias
 * - Adiciona emojis para navegação
 * 
 * COMO USAR?
 * node scripts/reescrever-comentarios.js
 */

const fs = require('fs');
const path = require('path');

// 📚 DICIONÁRIO DE TRADUÇÕES (Técnico → Adolescente)
const TRADUCOES = {
  // Conceitos de Programação
  'Dependency Injection': '🎁 DELIVERY DE CÓDIGO: Alguém te entrega as coisas prontas, você não precisa fazer tudo',
  'Interface': '📋 CONTRATO: Promessa de que vai ter certos métodos',
  'Abstract': '🎨 MOLDE: Receita base que outros seguem',
  'Implements': '✅ CUMPRE O CONTRATO: Faz tudo que prometeu',
  'Extends': '👨‍👦 HERDA: Filho que recebe características do pai',
  'Constructor': '🏭 FÁBRICA: Lugar onde o objeto é criado',
  'Private': '🔒 DIÁRIO SECRETO: Só você pode ver',
  'Public': '📢 OUTDOOR: Todo mundo pode ver',
  'Readonly': '🗿 GRAVADO EM PEDRA: Não pode mudar',
  'Async/Await': '⏰ DELIVERY: Pede e faz outras coisas enquanto espera',
  'Promise': '🤝 PROMESSA: Vai retornar algo no futuro',
  'Repository': '📚 BIBLIOTECÁRIO: Busca e guarda dados para você',
  'Entity': '🆔 PESSOA COM CPF: Tem identidade única',
  'Value Object': '💵 DINHEIRO: R$ 50 é R$ 50, não importa qual nota',
  'DTO': '📦 MOCHILA: Transporta dados de um lugar para outro',
  'Use Case': '📝 RECEITA: Passo a passo para fazer UMA coisa',
  'Service': '🛠️ FERRAMENTA: Faz um trabalho específico',
  'Module': '🗂️ GAVETA: Organiza coisas relacionadas',
  'Guard': '🚨 SEGURANÇA: Verifica se pode passar',
  'Interceptor': '🎭 FILTRO DO INSTAGRAM: Modifica antes de mostrar',
  'Decorator': '🏷️ ETIQUETA: Marca com informação extra',
  'Enum': '🎮 BOTÕES DO ELEVADOR: Opções fixas',
  'Type': '📋 FICHA: Define que tipo de coisa é',
};

// 🎯 PADRÕES DE COMENTÁRIOS A SUBSTITUIR
const PADROES = [
  {
    regex: /\/\/ Responsabilidade:/gi,
    substituto: '// 🎯 O QUE ESTE ARQUIVO FAZ?'
  },
  {
    regex: /\/\/ Por quê\?/gi,
    substituto: '// 🤔 POR QUÊ?'
  },
  {
    regex: /\/\/ Como funciona\?/gi,
    substituto: '// 🔄 COMO FUNCIONA?'
  },
  {
    regex: /\/\/ Quando usar\?/gi,
    substituto: '// 🎮 QUANDO USAR?'
  },
  {
    regex: /\/\/ Exemplo:/gi,
    substituto: '// 📝 EXEMPLO:'
  },
  {
    regex: /\/\/ IMPORTANTE:/gi,
    substituto: '// ⚠️ ATENÇÃO:'
  },
  {
    regex: /\/\/ Nota:/gi,
    substituto: '// 💡 DICA:'
  },
];

// 📁 ARQUIVOS A PROCESSAR
const ARQUIVOS_PARA_REESCREVER = [
  'src/domain/value-objects/email.vo.ts',
  'src/domain/value-objects/telefone.vo.ts',
  'src/domain/exceptions/domain.exception.ts',
  'src/domain/entities/cliente.entity.ts',
  'src/domain/repositories/cliente.repository.interface.ts',
  'src/shared/enums/tipo-interesse.enum.ts',
  'src/shared/enums/tipo-operacao.enum.ts',
  'src/infrastructure/database/prisma/prisma.service.ts',
  'src/infrastructure/database/repositories/prisma-cliente.repository.ts',
];

// 🔧 FUNÇÃO: Adiciona analogia se não tiver
function adicionarAnalogia(conteudo, nomeArquivo) {
  // Se já tem analogia, não adiciona
  if (conteudo.includes('📚 ANALOGIA:')) {
    return conteudo;
  }

  // Adiciona analogia baseada no tipo de arquivo
  let analogia = '';
  
  if (nomeArquivo.includes('email.vo')) {
    analogia = `
// 📚 ANALOGIA: Imagine um DETECTOR DE E-MAILS FALSOS
// - Você digita: "joao@gmail.com" ✅ PASSA
// - Você digita: "joao.gmail.com" ❌ NÃO PASSA (falta @)
// - É como o segurança da balada verificando sua idade
`;
  } else if (nomeArquivo.includes('telefone.vo')) {
    analogia = `
// 📚 ANALOGIA: É como um VALIDADOR DE CPF
// - Aceita vários formatos: (11) 99999-9999 ou 11999999999
// - Mas guarda sempre do mesmo jeito: só números
// - É como escrever seu nome sempre da mesma forma
`;
  } else if (nomeArquivo.includes('entity')) {
    analogia = `
// 📚 ANALOGIA: É como uma PESSOA COM RG
// - Tem identidade única (ID)
// - Pode mudar de roupa (atualizar dados)
// - Mas continua sendo a mesma pessoa
`;
  } else if (nomeArquivo.includes('repository')) {
    analogia = `
// 📚 ANALOGIA: É como um BIBLIOTECÁRIO
// - Você pede um livro (dado)
// - Ele busca na estante (banco)
// - Ele te entrega
// - Você não precisa saber onde ele guardou
`;
  } else if (nomeArquivo.includes('prisma.service')) {
    analogia = `
// 📚 ANALOGIA: É como um PORTEIRO DE PRÉDIO
// - Abre a porta quando você chega (conecta)
// - Fecha quando você sai (desconecta)
// - Conhece todos os apartamentos (tabelas)
`;
  }

  // Insere analogia após o cabeçalho
  return conteudo.replace(
    /(\/\/ ={40,}\n\/\/ .+\n\/\/ ={40,}\n\/\/\n)/,
    `$1${analogia}//\n`
  );
}

// 🔧 FUNÇÃO: Processa um arquivo
function processarArquivo(caminhoArquivo) {
  const caminhoCompleto = path.join(__dirname, '..', caminhoArquivo);
  
  console.log(`\n📝 Processando: ${caminhoArquivo}`);
  
  // Verifica se arquivo existe
  if (!fs.existsSync(caminhoCompleto)) {
    console.log(`   ⚠️  Arquivo não encontrado, pulando...`);
    return;
  }

  // Lê o arquivo
  let conteudo = fs.readFileSync(caminhoCompleto, 'utf8');
  let modificado = false;

  // Aplica padrões de substituição
  PADROES.forEach(({ regex, substituto }) => {
    if (regex.test(conteudo)) {
      conteudo = conteudo.replace(regex, substituto);
      modificado = true;
    }
  });

  // Adiciona analogia se não tiver
  const conteudoComAnalogia = adicionarAnalogia(conteudo, caminhoArquivo);
  if (conteudoComAnalogia !== conteudo) {
    conteudo = conteudoComAnalogia;
    modificado = true;
  }

  // Salva se modificou
  if (modificado) {
    fs.writeFileSync(caminhoCompleto, conteudo, 'utf8');
    console.log(`   ✅ Arquivo atualizado!`);
  } else {
    console.log(`   ℹ️  Nenhuma modificação necessária`);
  }
}

// 🚀 EXECUÇÃO PRINCIPAL
console.log('🤖 INICIANDO REESCRITA DE COMENTÁRIOS...\n');
console.log('📚 Usando padrão: Linguagem Adolescente + Analogias + Emojis\n');

ARQUIVOS_PARA_REESCREVER.forEach(processarArquivo);

console.log('\n✅ REESCRITA CONCLUÍDA!\n');
console.log('📊 Próximos passos:');
console.log('   1. Revise os arquivos modificados');
console.log('   2. Rode: npx prisma generate');
console.log('   3. Rode: npx prisma migrate dev\n');
