// ============================================
// 📦 CONFIG: cache.config.ts
// ============================================
// 🎯 O QUE É?
// Configuração do Cache (Memória rápida)
//
// 📚 ANALOGIA: É como uma GAVETA DE ATALHOS 🗄️
// - Guarda coisas que você usa muito
// - Acesso super rápido (não precisa buscar no banco)
// - Economiza tempo e recursos
//
// 🤔 POR QUÊ CACHE?
// - Respostas 100x mais rápidas
// - Reduz carga no banco de dados
// - Melhora experiência do usuário
// - Economiza dinheiro (menos queries)
//
// 💡 EXEMPLO:
// - Sem cache: Buscar lista de imóveis = 500ms
// - Com cache: Buscar lista de imóveis = 5ms
// ============================================

import { CacheModuleOptions } from '@nestjs/cache-manager';

/**
 * 🗄️ CONFIGURAÇÃO: Cache
 * 
 * 🎯 O QUE FAZ?
 * - Define tempo de vida dos dados em cache
 * - Configura limite de itens
 * 
 * ⏱️ TTL (Time To Live):
 * - Tempo que o dado fica em cache
 * - Depois expira e busca do banco novamente
 * - 300 segundos = 5 minutos
 * 
 * 📊 MAX ITEMS:
 * - Máximo de itens no cache
 * - Quando enche, remove os mais antigos
 * 
 * 💡 QUANDO USAR CACHE?
 * - Listas que mudam pouco (ex: tipos de imóvel)
 * - Dados consultados frequentemente
 * - Cálculos pesados
 * 
 * ⚠️ QUANDO NÃO USAR?
 * - Dados que mudam muito (ex: estoque)
 * - Dados sensíveis (ex: senha)
 * - Dados únicos por usuário
 */
export const cacheConfig: CacheModuleOptions = {
  // TTL em segundos (5 minutos)
  ttl: 300,
  
  // Máximo de itens no cache
  max: 100,
  
  // isGlobal: true = Disponível em todos os módulos
  isGlobal: true,
};

// ============================================
// 📝 EXEMPLO DE USO:
// ============================================
// 
// // No service:
// constructor(
//   @Inject(CACHE_MANAGER) 
//   private cacheManager: Cache
// ) {}
//
// // Salvar no cache:
// await this.cacheManager.set('imoveis-destaques', imoveis, 300);
//
// // Buscar do cache:
// const cached = await this.cacheManager.get('imoveis-destaques');
// if (cached) return cached;
//
// // Limpar cache:
// await this.cacheManager.del('imoveis-destaques');
// ============================================
