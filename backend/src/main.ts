// ============================================
// 🚀 MAIN: main.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É o PONTO DE ENTRADA da aplicação. Inicia o servidor.
//
// 📚 ANALOGIA: É a CHAVE DE IGNIÇÃO DO CARRO 🔑
// - Você gira a chave (npm run start:dev)
// - Motor liga (NestJS inicia)
// - Carro pronto pra rodar (servidor escutando)
//
// 🤔 POR QUÊ main.ts?
// Convenção do NestJS:
// - Primeiro arquivo executado
// - Cria e configura aplicação
// - Inicia servidor HTTP
// ============================================

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * 🎬 FUNÇÃO: bootstrap
 *
 * 📚 ANALOGIA: É a CERIMÔNIA DE INAUGURAÇÃO 🎉
 * - Prepara tudo
 * - Abre as portas
 * - Começa a atender clientes
 *
 * 🎯 O QUE FAZ?
 * 1. Cria aplicação NestJS
 * 2. Configura validação automática
 * 3. Configura CORS
 * 4. Inicia servidor na porta 3001
 *
 * 🔄 FLUXO:
 * 1. Cria app com AppModule
 * 2. Ativa validação global (DTOs)
 * 3. Ativa CORS (frontend pode acessar)
 * 4. Escuta na porta 3001
 * 5. Mostra mensagem de sucesso
 */
async function bootstrap() {
  // ========================================
  // PASSO 1: Criar aplicação NestJS
  // ========================================
  // 🏗️ O que faz? Cria instância da aplicação
  // 📚 Analogia: Construir o prédio
  const app = await NestFactory.create(AppModule);

  // ========================================
  // PASSO 2: Configurar validação global
  // ========================================
  // ✅ O que faz? Valida DTOs automaticamente
  // 📚 Analogia: Segurança na entrada do prédio
  //
  // 💡 ValidationPipe:
  // - Valida todos os DTOs
  // - Usa decorators do class-validator
  // - Retorna HTTP 400 se inválido
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true = Remove campos não definidos no DTO
      // 📚 Analogia: Só deixa entrar quem está na lista
      whitelist: true,

      // forbidNonWhitelisted: true = Lança erro se enviar campo extra
      // 📚 Analogia: Avisa se alguém tentar entrar sem estar na lista
      forbidNonWhitelisted: true,

      // transform: true = Transforma tipos automaticamente
      // 📚 Analogia: Converte "123" (string) para 123 (number)
      transform: true,

      // 💡 EXEMPLO:
      // Se DTO espera { nome: string, idade: number }
      // E você envia { nome: "João", idade: "25", extra: "foo" }
      // ValidationPipe:
      // - Converte "25" para 25 (transform)
      // - Remove "extra" (whitelist)
      // - Valida nome e idade
    }),
  );

  // ========================================
  // PASSO 3: Configurar CORS
  // ========================================
  // 🌐 O que faz? Permite frontend acessar API
  // 📚 Analogia: Liberar visitantes de outros prédios
  //
  // 💡 CORS (Cross-Origin Resource Sharing):
  // - Frontend (localhost:3000) precisa acessar Backend (localhost:3001)
  // - Sem CORS, navegador bloqueia
  // - Com CORS, navegador permite
  app.enableCors({
    // origin: Quem pode acessar
    // 📚 Analogia: Lista de visitantes autorizados
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',

    // credentials: true = Permite enviar cookies
    // 📚 Analogia: Visitante pode trazer documentos
    credentials: true,

    // methods: Métodos HTTP permitidos
    // 📚 Analogia: O que visitante pode fazer
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],

    // allowedHeaders: Cabeçalhos permitidos
    // 📚 Analogia: Documentos que visitante pode trazer
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ========================================
  // PASSO 4: Configurar Swagger (Documentação)
  // ========================================
  // 📚 O que faz? Cria documentação interativa da API
  // 📚 Analogia: Manual de instruções automático
  const config = new DocumentBuilder()
    .setTitle('ImoveisMatch API')
    .setDescription('API REST para sistema de matching imobiliário com Clean Architecture')
    .setVersion('1.0')
    .addTag('clientes', 'Gerenciamento de clientes interessados em imóveis')
    .addTag('imoveis', 'Gerenciamento de imóveis disponíveis')
    .addTag('matches', 'Sistema de matching automático')
    .addTag('auth', 'Autenticação e autorização')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'ImoveisMatch API Docs',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // ========================================
  // PASSO 5: Definir porta do servidor
  // ========================================
  // 🔌 O que faz? Define em qual porta escutar
  // 📚 Analogia: Número da porta do prédio
  const port = process.env.PORT || 3001;

  // ========================================
  // PASSO 5: Iniciar servidor
  // ========================================
  // 🚀 O que faz? Começa a escutar requisições
  // 📚 Analogia: Abrir as portas do prédio
  await app.listen(port);

  // ========================================
  // PASSO 6: Mostrar mensagem de sucesso
  // ========================================
  // 📢 O que faz? Avisa que está rodando
  console.log('');
  console.log('🎉 ========================================');
  console.log('🚀 SERVIDOR NESTJS RODANDO COM SUCESSO!');
  console.log('========================================');
  console.log('');
  console.log(`📡 URL: http://localhost:${port}`);
  console.log(`🗄️ Banco: MySQL (${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost:3306'})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📚 ROTAS DISPONÍVEIS:');
  console.log(`   POST   http://localhost:${port}/clientes          → Criar cliente`);
  console.log(`   GET    http://localhost:${port}/clientes/:id      → Buscar cliente`);
  console.log(`   GET    http://localhost:${port}/clientes          → Listar clientes`);
  console.log(`   PATCH  http://localhost:${port}/clientes/:id      → Atualizar cliente`);
  console.log(`   DELETE http://localhost:${port}/clientes/:id      → Deletar cliente`);
  console.log('');
  console.log('📖 DOCUMENTAÇÃO:');
  console.log(`   🔗 Swagger UI: http://localhost:${port}/api/docs`);
  console.log('');
  console.log('✅ Pronto para receber requisições!');
  console.log('========================================');
  console.log('');
}

// ========================================
// EXECUTAR BOOTSTRAP
// ========================================
// 🎬 Chama função bootstrap para iniciar tudo
bootstrap();

// ============================================
// 📚 O QUE ACONTECE QUANDO VOCÊ RODA?
// ============================================
//
// 💻 COMANDO: npm run start:dev
//
// 1. 📦 Node.js executa main.ts
//    ↓
// 2. 🎬 Função bootstrap() é chamada
//    ↓
// 3. 🏗️ NestFactory.create(AppModule)
//    ↓
// 4. 🔧 AppModule carrega ConfigModule
//    ↓
// 5. 📄 ConfigModule lê .env
//    ↓
// 6. 🧑‍💼 AppModule carrega ClienteModule
//    ↓
// 7. 🗄️ ClienteModule carrega DatabaseModule
//    ↓
// 8. 🔌 PrismaService conecta ao MySQL
//    ↓
// 9. ✅ ValidationPipe configurado
//    ↓
// 10. 🌐 CORS configurado
//    ↓
// 11. 🚀 Servidor escuta na porta 3001
//    ↓
// 12. 📢 Mensagem de sucesso no console
//    ↓
// 13. ✅ PRONTO! Pode fazer requisições!
//
// ============================================
// 📚 COMO TESTAR?
// ============================================
//
// ✅ TESTE 1: Health Check
// curl http://localhost:3001
// (Deve retornar erro 404 - normal, não tem rota /)
//
// ✅ TESTE 2: Criar cliente
// curl -X POST http://localhost:3001/clientes \
//   -H "Content-Type: application/json" \
//   -d '{
//     "nome": "João Silva",
//     "email": "joao@gmail.com",
//     "telefone": "11999999999",
//     "tipoInteresse": "COMPRAR",
//     "valorMinimo": 200000,
//     "valorMaximo": 500000,
//     "cidade": "São Paulo"
//   }'
//
// ✅ TESTE 3: Listar clientes
// curl http://localhost:3001/clientes
//
// ✅ TESTE 4: Buscar cliente
// curl http://localhost:3001/clientes/{id}
//
// 💡 DICA: Use Postman ou Insomnia para testar!
//
// ============================================
