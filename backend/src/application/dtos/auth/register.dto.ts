// ============================================
// 📦 DTO: register.dto.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Valida os dados pra fazer um novo crachá no sistema.
//
// 📚 ANALOGIA: A FICHA DE EMPREGO 📋
// - Nome completo.
// - E-mail que funcione.
// - Uma senha que não seja só "123". Tem que ter pelo menos 6 letras!
// ============================================

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  /**
   * 📝 NOME COMPLETO
   */
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsNotEmpty({ message: 'Nome é obrigatório, como vamos te chamar?' })
  @IsString()
  nome: string;

  /**
   * 📧 E-MAIL
   */
  @ApiProperty({ example: 'joao@gmail.com', description: 'Email único do usuário' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Esse email não existe não bicho' })
  email: string;

  /**
   * 🔑 SENHA BRAVA
   * 🎯 Regra dura: Menos de 6 caracteres é vacilo na segurança.
   */
  @ApiProperty({ example: 'senha123', description: 'Senha (mínimo 6 caracteres)' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString()
  @MinLength(6, { message: 'A senha tá muito fácil. Pelo menos 6 letras/números' })
  senha: string;
}
