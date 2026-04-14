// ============================================
// 🗂️ BARREL EXPORT: index.ts (Use Cases de Cliente)
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Agrupa todos os Use Cases de Cliente para facilitar imports.
//
// 📚 ANALOGIA: É como o MENU DE SERVIÇOS 📋
// - Cadastrar cliente
// - Buscar cliente
// - Atualizar cliente
// - Deletar cliente
// - Listar clientes
//
// Tudo num lugar só!
// ============================================

// 🎬 Use Case: Criar cliente
export * from './create-cliente.use-case';

// 🎬 Use Case: Buscar cliente por ID
export * from './find-cliente.use-case';

// 🎬 Use Case: Atualizar cliente
export * from './update-cliente.use-case';

// 🎬 Use Case: Deletar cliente
export * from './delete-cliente.use-case';

// 🎬 Use Case: Listar clientes
export * from './list-clientes.use-case';
