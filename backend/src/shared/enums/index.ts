// ============================================
// 🗂️ BARREL EXPORT: index.ts (Enums)
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Agrupa todas as opções de enums num lugar só para facilitar quem vai usar.
//
// 📚 ANALOGIA: É como um MENU DO MCDONALDS 🍟
// - Em vez de você pedir o pão de um lado, a carne de outro e a batata de outro...
// - Você olha o Menu (este arquivo) e ele te dá o combo completo.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Sem isso:
// - Você teria que fazer 10 imports separados para usar 10 enums diferentes.
// - Seu código ficaria gigante só de importações no topo.
//
// Com isso:
// - Você faz um import só apontando pra pasta `enums` e pega o que quiser!
//
// 💡 BARREL EXPORT (Exportação em Barril)
// É simplesmente um arquivo `index.ts` que junta um monte de exportações. É como 
// jogar tudo dentro de um barril pra pessoa pegar de uma vez.
//
// 🎮 QUANDO USAR?
// - Quando você tem vários arquivos parecidos numa mesma pasta e quer exportar todos juntos.
//
// 📝 COMO USAR (Exemplo simples)?
// // Sem esse arquivo seria assim:
// import { TipoInteresse } from '@shared/enums/tipo-interesse.enum';
// import { TipoOperacao } from '@shared/enums/tipo-operacao.enum';
//
// // Mas com esse arquivo mágico, fica limpinho assim:
// import { TipoInteresse, TipoOperacao } from '@shared/enums';
// ============================================

// ========================================
// PASSO 1: Exportando Tipo de Interesse
// ========================================
// 🎯 O que faz? Repassa toda a lista de "Tipos de Interesse" para quem pedir o Menu.
// 🤔 Por quê? Pra ninguém ter que abrir o arquivo original pra usar.
// 📚 Analogia: É como a lanchonete oferecer a opção do Combo 1.
export * from './tipo-interesse.enum';

// ========================================
// PASSO 2: Exportando Tipo de Operação
// ========================================
// 🎯 O que faz? Repassa toda a lista de "Tipos de Operação" para quem pedir.
// 🤔 Por quê? Manter tudo organizado no mesmo lugar.
// 📚 Analogia: É como a lanchonete oferecer a opção do Combo 2.
export * from './tipo-operacao.enum';
