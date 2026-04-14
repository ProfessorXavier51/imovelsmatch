// ============================================
// 📦 CONFIG: throttler.config.ts
// ============================================
// 🎯 O QUE É?
// Configuração do Rate Limiting (Limite de requisições)
//
// 📚 ANALOGIA: É como um SEGURANÇA DE BALADA 🚧
// - Controla quantas pessoas entram por vez
// - Evita lotação (sobrecarga do servidor)
// - Bloqueia quem tenta entrar demais
//
// 🤔 POR QUÊ RATE LIMITING?
// - Protege contra ataques DDoS
// - Evita abuso da API
// - Garante qualidade para todos
// - Economiza recursos do servidor
//
// 💡 EXEMPLO:
// - Usuário normal: 10 requisições/minuto = OK
// - Atacante: 1000 requisições/minuto = BLOQUEADO
// ============================================

import { ThrottlerModuleOptions } from '@nestjs/throttler';

/**
 * 🚧 CONFIGURAÇÃO: Rate Limiting
 * 
 * 🎯 O QUE FAZ?
 * - Limita número de requisições por tempo
 * - Bloqueia IPs que excedem o limite
 * - Retorna erro 429 (Too Many Requests)
 * 
 * ⚙️ CONFIGURAÇÃO:
 * - ttl: Janela de tempo (60 segundos = 1 minuto)
 * - limit: Máximo de requisições nesse tempo
 * 
 * 📊 EXEMPLO ATUAL:
 * - 100 requisições a cada 60 segundos
 * - = 100 requisições por minuto
 * - = ~1.6 requisições por segundo
 * 
 * 💡 VALORES RECOMENDADOS:
 * - API pública: 60 req/min
 * - API autenticada: 100 req/min
 * - API admin: 1000 req/min
 * 
 * ⚠️ SE EXCEDER O LIMITE:
 * - HTTP 429: Too Many Requests
 * - Mensagem: "ThrottlerException: Too Many Requests"
 * - Usuário precisa esperar 1 minuto
 */
export const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      // TTL em segundos (60s = 1 minuto)
      ttl: 60000, // em milissegundos
      
      // Limite de requisições
      limit: 100,
    },
  ],
};

// ============================================
// 📝 EXEMPLO DE USO:
// ============================================
// 
// // Aplicar globalmente (em todos os endpoints):
// // No AppModule:
// @Module({
//   imports: [ThrottlerModule.forRoot(throttlerConfig)],
//   providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
// })
//
// // Customizar por rota:
// @Throttle({ default: { limit: 3, ttl: 60000 } })
// @Post('login')
// async login() {
//   // Máximo 3 tentativas de login por minuto
// }
//
// // Desabilitar em rota específica:
// @SkipThrottle()
// @Get('public')
// async public() {
//   // Sem limite
// }
// ============================================
