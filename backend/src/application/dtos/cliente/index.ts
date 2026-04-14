// ============================================
// 🗂️ BARREL EXPORT: index.ts (DTOs de Cliente)
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É o famoso balcão de informações. Concentra a burocracia toda das rotas pra exportar de vez!
//
// 📚 ANALOGIA: A PORTA DA GELADEIRA Cheia de ímãs! 🧲
// - Você não precisa rodar a cidade inteira procurando o que tem pra comer.
// - Tudo do cliente despacha daqui, você sabe o que pegar rapidão.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Fica lindo no arquivo final: 
// `import { Crie, Atualize, PegaTudo } from '@application/dtos/cliente';`
// E tira a chateação de ficar importando de vários arquivinhos perdidos.
// ============================================

export * from './create-cliente.dto';
export * from './update-cliente.dto';
export * from './cliente-response.dto';
