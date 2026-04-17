// ============================================
// 📦 CONTROLLER: auth.controller.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É tipo a catraca da empresa. Cuida de cadastrar gente nova e olhar o crachá de quem quer entrar.
//
// 📚 ANALOGIA: A PORTARIA DA BALADA 🏢
// - Register = O cara na fila assinando a ficha pra poder entrar.
// - Login = Mostrar a identidade pro leão de chácara liberar a pulseirinha VIP (JWT).
// ============================================

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDTO } from '../../application/dtos/auth/register.dto';
import { LoginDTO } from '../../application/dtos/auth/login.dto';
import { RegisterUseCase } from '../../application/use-cases/auth/register.use-case';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  /**
   * 📝 ROTA: POST /auth/register
   * 
   * 🎯 O QUE FAZ? Bota gente nova pra dentro do sistema.
   * 📚 ANALOGIA: Assinar a Ficha de Inscrição.
   */
  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  async register(@Body() dto: RegisterDTO) {
    // 1. Manda a papelada pro especialista (Use Case) analisar
    const user = await this.registerUseCase.execute(dto);
    
    // 2. Retorna a via da carteirinha, MAS ESCONDE A SENHA por misericórdia.
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    };
  }

  /**
   * 🔑 ROTA: POST /auth/login
   * 
   * 🎯 O QUE FAZ? Confere a senha e entrega a pulseirinha (Token).
   * 📚 ANALOGIA: Leão de chácara testando as senhas.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK) // Não é "Created 201", é "OK 200". Login a gente só aprova.
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() dto: LoginDTO) {
    // Entrega o combo pro Use Case se virar com a senha e devolver o Token
    return this.loginUseCase.execute(dto.email, dto.senha);
  }
}
