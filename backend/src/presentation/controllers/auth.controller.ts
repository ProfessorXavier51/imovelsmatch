// ============================================
// 📦 CONTROLLER: auth.controller.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Gerencia autenticação: cadastro de usuários e login com JWT.
//
// 📚 ANALOGIA: A PORTARIA DO PRÉDIO 🏢
// - Register = Fazer cadastro pra morar no prédio
// - Login = Passar o crachá na catraca todo dia
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra controlar quem pode acessar o sistema.
// Só quem tem conta pode entrar.
//
// 🎮 QUANDO USAR?
// - Primeira vez: POST /auth/register
// - Todo acesso: POST /auth/login
// ============================================

// 📦 ONDE: Importa decorators do NestJS pra criar rotas HTTP
// 🎯 O QUE: Controller = classe de rotas, Post = método POST, Body = corpo da requisição
// 🎯 O QUE: HttpCode = define código HTTP customizado, HttpStatus = constantes de status HTTP
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

// 📦 ONDE: Importa decorators do Swagger pra documentar a API
// 🎯 O QUE: ApiTags = agrupa rotas, ApiOperation = descreve operação, ApiResponse = documenta respostas
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// 📦 ONDE: Importa DTO de registro (validação de dados de cadastro)
// 🎯 O QUE: RegisterDTO valida nome, email e senha
// 🤔 POR QUÊ: Pra garantir que os dados de cadastro estão corretos
import { RegisterDTO } from '../../application/dtos/auth/register.dto';

// 📦 ONDE: Importa DTO de login (validação de dados de login)
// 🎯 O QUE: LoginDTO valida email e senha
// 🤔 POR QUÊ: Pra garantir que os dados de login estão corretos
import { LoginDTO } from '../../application/dtos/auth/login.dto';

// 📦 ONDE: Importa caso de uso de registro
// 🎯 O QUE: RegisterUseCase contém a lógica de criar usuário
// 🤔 POR QUÊ: Pra separar lógica de negócio da lógica HTTP
import { RegisterUseCase } from '../../application/use-cases/auth/register.use-case';

// 📦 ONDE: Importa caso de uso de login
// 🎯 O QUE: LoginUseCase contém a lógica de autenticar usuário
// 🤔 POR QUÊ: Pra separar lógica de negócio da lógica HTTP
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';

/**
 * 🏗️ CLASSE: AuthController
 * 
 * 🎯 O QUE É? Controlador de autenticação (cadastro e login).
 * 📚 COMO? Recebe requisições HTTP e delega pros use cases.
 * 📍 ONDE? Rota base: /auth
 * 🤔 POR QUÊ? Pra expor endpoints de autenticação via API REST.
 * ⏰ QUANDO? Sempre que o frontend precisar cadastrar ou logar usuário.
 */
@ApiTags('auth') // 🏷️ O QUE: Agrupa rotas no Swagger sob a tag "auth"
@Controller('auth') // 🌐 O QUE: Define prefixo de rota "/auth"
export class AuthController {
  
  /**
   * 🏗️ CONSTRUTOR
   * 
   * 🎯 O QUE FAZ? Injeta os casos de uso de registro e login.
   * 📚 COMO? O NestJS vê "private" e automaticamente injeta as dependências.
   * 🤔 POR QUÊ? Pra poder usar os use cases dentro do controller.
   * ⏰ QUANDO? Na criação da instância do controller (boot do app).
   */
  constructor(
    private registerUseCase: RegisterUseCase, // 📝 Caso de uso de registro injetado
    private loginUseCase: LoginUseCase, // 🔑 Caso de uso de login injetado
  ) {}

  /**
   * 📝 MÉTODO: register
   * 
   * 🎯 O QUE FAZ? Cadastra um novo usuário no sistema.
   * 📚 COMO? Valida dados → Cria usuário → Retorna dados sem senha.
   * 📍 ONDE? Rota: POST /auth/register
   * 🤔 POR QUÊ? Pra permitir que novos usuários se cadastrem.
   * ⏰ QUANDO? Quando alguém quer criar uma conta.
   * 
   * 📥 ENTRADA: RegisterDTO (nome, email, senha)
   * 📤 SAÍDA: { id, nome, email, role }
   * ⚠️ ERRO: 409 Conflict se email já existir
   */
  @Post('register') // 🌐 O QUE: Define método HTTP POST na rota /auth/register
  @ApiOperation({ summary: 'Registrar novo usuário' }) // 📋 O QUE: Documenta operação no Swagger
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' }) // ✅ Resposta de sucesso
  @ApiResponse({ status: 409, description: 'Email já cadastrado' }) // ❌ Resposta de erro (conflito)
  async register(
    @Body() dto: RegisterDTO // 📥 O QUE: Injeta e valida corpo da requisição
  ) {
    // ========================================
    // 🔍 PASSO 1: CRIAR USUÁRIO
    // ========================================
    // 🎯 O QUE: Chama o caso de uso de registro
    // 📚 COMO: Passa o DTO validado como parâmetro
    // 🤔 POR QUÊ: Pra criar o usuário no banco de dados
    // ⏰ QUANDO: Após validar os dados do DTO
    // ⚠️ NOTA: Se email já existir, lança ConflictException (409)
    const user = await this.registerUseCase.execute(dto);
    
    // ========================================
    // 📤 PASSO 2: RETORNAR DADOS DO USUÁRIO
    // ========================================
    // 🎯 O QUE: Retorna dados do usuário criado (SEM A SENHA!)
    // 📚 COMO: Monta objeto com apenas os campos públicos
    // 🤔 POR QUÊ: Nunca devemos retornar a senha (segurança)
    // ⏰ QUANDO: Após criar o usuário com sucesso
    return {
      id: user.id, // 🆔 ID único do usuário
      nome: user.nome, // 📝 Nome completo
      email: user.email, // 📧 Email
      role: user.role, // 👤 Papel (ADMIN ou USER)
    };
  }

  /**
   * 🔑 MÉTODO: login
   * 
   * 🎯 O QUE FAZ? Autentica um usuário e retorna token JWT.
   * 📚 COMO? Valida credenciais → Gera token → Retorna token + dados.
   * 📍 ONDE? Rota: POST /auth/login
   * 🤔 POR QUÊ? Pra permitir que usuários façam login.
   * ⏰ QUANDO? Quando alguém quer acessar o sistema.
   * 
   * 📥 ENTRADA: LoginDTO (email, senha)
   * 📤 SAÍDA: { access_token, user }
   * ⚠️ ERRO: 401 Unauthorized se credenciais inválidas
   */
  @Post('login') // 🌐 O QUE: Define método HTTP POST na rota /auth/login
  @HttpCode(HttpStatus.OK) // 🎯 O QUE: Define código HTTP 200 (ao invés de 201 padrão do POST)
  @ApiOperation({ summary: 'Login' }) // 📋 O QUE: Documenta operação no Swagger
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' }) // ✅ Resposta de sucesso
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' }) // ❌ Resposta de erro (não autorizado)
  async login(
    @Body() dto: LoginDTO // 📥 O QUE: Injeta e valida corpo da requisição
  ) {
    // ========================================
    // 🔑 PASSO 1: AUTENTICAR E GERAR TOKEN
    // ========================================
    // 🎯 O QUE: Chama o caso de uso de login
    // 📚 COMO: Passa email e senha do DTO
    // 🤔 POR QUÊ: Pra validar credenciais e gerar token JWT
    // ⏰ QUANDO: Imediatamente após receber a requisição
    // ⚠️ NOTA: Se credenciais inválidas, lança UnauthorizedException (401)
    // 📤 RETORNA: { access_token: "jwt...", user: { id, email, role } }
    return this.loginUseCase.execute(dto.email, dto.senha);
  }
}
