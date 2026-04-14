// ============================================
// 📦 DTO: login.dto.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Define os dados obrigatórios para logar no sistema.
//
// 📚 ANALOGIA: A PERGUNTA NA PORTA DA BALADA 🚪
// - O segurança pergunta: "Qual seu e-mail e senha?"
// - Se faltar um dos dois, ele nem olha na sua cara.
// ============================================

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  /**
   * 📧 E-MAIL
   * 🎯 Regra dura: Tem que ser um e-mail válido.
   */
  @ApiProperty({ example: 'joao@gmail.com', description: 'Email do usuário' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido parceiro, bota um de verdade' })
  email: string;

  /**
   * 🔑 SENHA
   * 🎯 Regra dura: Pelo menos escreve alguma coisa aí.
   */
  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'Senha é obrigatória, senão qualquer um entra' })
  @IsString()
  senha: string;
}
