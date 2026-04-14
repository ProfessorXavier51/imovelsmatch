// ============================================
// 📦 CONFIG: winston.config.ts
// ============================================
// 🎯 O QUE É?
// Configuração do Winston Logger
//
// 📚 ANALOGIA: É como um DIÁRIO PROFISSIONAL 📔
// - Registra tudo que acontece no sistema
// - Organiza por níveis (erro, aviso, info)
// - Salva em arquivos separados
//
// 🤔 POR QUÊ WINSTON?
// - Logs estruturados e organizados
// - Salva em arquivos (não perde quando reinicia)
// - Diferentes níveis de log (error, warn, info, debug)
// - Fácil de filtrar e buscar
// ============================================

import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

/**
 * 📝 CONFIGURAÇÃO: Winston Logger
 * 
 * 🎯 O QUE FAZ?
 * - Define como os logs serão salvos
 * - Configura formato dos logs
 * - Define onde salvar (console + arquivos)
 * 
 * 📚 NÍVEIS DE LOG:
 * - error = Erros graves (ex: banco caiu)
 * - warn = Avisos (ex: API lenta)
 * - info = Informações (ex: usuário logou)
 * - debug = Debug (ex: variável X = 10)
 * 
 * 📁 ARQUIVOS CRIADOS:
 * - logs/error.log = Só erros
 * - logs/combined.log = Todos os logs
 */
export const winstonConfig: WinstonModuleOptions = {
  transports: [
    // ========================================
    // CONSOLE (Terminal)
    // ========================================
    // 🖥️ Mostra logs coloridos no terminal
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `${timestamp} [${context}] ${level}: ${message}`;
        }),
      ),
    }),

    // ========================================
    // ARQUIVO: error.log
    // ========================================
    // 🔴 Salva APENAS erros graves
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    // ========================================
    // ARQUIVO: combined.log
    // ========================================
    // 📋 Salva TODOS os logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};

// ============================================
// 📝 EXEMPLO DE USO:
// ============================================
// 
// // No service:
// constructor(
//   @Inject(WINSTON_MODULE_PROVIDER) 
//   private logger: Logger
// ) {}
//
// // Logar informação:
// this.logger.log('Usuário criado com sucesso', 'UserService');
//
// // Logar erro:
// this.logger.error('Erro ao criar usuário', 'UserService');
//
// // Logar aviso:
// this.logger.warn('API lenta', 'UserService');
// ============================================
