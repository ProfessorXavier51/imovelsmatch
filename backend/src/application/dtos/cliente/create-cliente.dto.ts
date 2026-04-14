// ============================================
// 📦 DTO: create-cliente.dto.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É a tela de cadastro blindada. Define as regras de quem pode entrar no clubinho.
//
// 📚 ANALOGIA: A FICHA DA ACADEMIA 📋
// - Tem os campos que você é OBRIGADO a preencher (Nome, Celular)
// - Tem os que são de boinhas (Observações)
// - Se botar o email sem o "@", a recepcionista devolve a ficha na sua cara!
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra não deixar chegar muito lixo no coitado do Banco de Dados. A barragem acontece na porta da balada. O NestJS usa as regrinhas aqui e só deixa a request prosseguir se tiver tudo "suave na nave".
// ============================================

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoInteresse } from '../../../shared/enums/tipo-interesse.enum';

/**
 * 🏗️ CLASSE: CreateClienteDTO
 *
 * 🎯 O QUE FAZ? A ficha cadastral pesadíssima pra registrar o cliente novo.
 */
export class CreateClienteDTO {
  /**
   * 📝 NOME DO MANO
   * 🎯 Regra dura: Tem que ser texto, não adianta botar emoji isolado e tem que ter mais de 3 letras.
   */
  @ApiProperty({ description: 'Nome completo do cliente', example: 'João Silva', minLength: 3, maxLength: 100 })
  @IsNotEmpty({ message: 'Qual é o seu nome po? É obrigatório' })
  @IsString({ message: 'Nome tem que ser letra, mano' })
  @MinLength(3, { message: 'Nome muito curto, tem que ter no mínimo 3 letras' })
  @MaxLength(100, { message: 'Tá testando o sistema? Máximo 100 caracteres no nome' })
  nome: string;

  /**
   * 📧 E-MAIL
   * 🎯 Regra dura: Se não tiver @ e domínio, já era.
   */
  @ApiProperty({ description: 'Email do cliente (deve ser único)', example: 'joao@gmail.com' })
  @IsNotEmpty({ message: 'Email é obrigatório pra gente te achar' })
  @IsEmail({}, { message: 'Vish, esse email tá meio estranho, coloca um válido' })
  email: string;

  /**
   * 📱 WHATSAPP DA PESSOA
   * 🎯 Regra dura: Só manda o texto, a gente se vira depois pra ajeitar no Value Object.
   */
  @ApiProperty({ description: 'Telefone do cliente (com ou sem máscara)', example: '(11) 99999-9999' })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @IsString({ message: 'Telefone tem que ser texto' })
  telefone: string;

  /**
   * 🎯 O QUE ELE QUER DA VIDA?
   * 🎯 Regra dura: Ou quer ALUGAR ou COMPRAR. Não existe "Passear". 
   */
  @ApiProperty({ description: 'Tipo de interesse do cliente', enum: TipoInteresse, example: TipoInteresse.COMPRAR })
  @IsNotEmpty({ message: 'Como quer interagir? Tipo de interesse é obrigatório' })
  @IsEnum(TipoInteresse, {
    message: 'Oh chefe, só aceitamos COMPRAR ou ALUGAR',
  })
  tipoInteresse: TipoInteresse;

  /**
   * 💰 GRANA MÍNIMA
   * 🎯 Regra dura: Quem não tem pelo menos mil contos tá no lugar errado hoje.
   */
  @ApiProperty({ description: 'Valor mínimo de interesse (em reais)', example: 200000, minimum: 1000 })
  @IsNotEmpty({ message: 'Faltou dizer o mínimo que tu tem pra gastar' })
  @IsNumber({}, { message: 'Grana é número, e não letra!' })
  @Min(1000, { message: 'Tem que ter pelo menos mil conto (1000)' })
  valorMinimo: number;

  /**
   * 💰 GRANA MÁXIMA
   * 🎯 Regra dura: O limite pra fazer a máquina rodar. 
   */
  @ApiProperty({ description: 'Valor máximo de interesse (em reais)', example: 500000, minimum: 1000 })
  @IsNotEmpty({ message: 'Faltou o limite do cartão' })
  @IsNumber({}, { message: 'Mete número nisso aí' })
  @Min(1000, { message: 'Tem que ter pelo menos mil conto (1000)' })
  valorMaximo: number;

  /**
   * 🏙️ CIDADE DO CORRE
   * 🎯 Regra dura: Pelo menos diz onde você respira.
   */
  @ApiProperty({ description: 'Cidade de interesse', example: 'São Paulo', minLength: 2 })
  @IsNotEmpty({ message: 'Qualé a cidade?' })
  @IsString({ message: 'Põe em formato de texto po' })
  @MinLength(2, { message: 'O nome da cidade de 1 letra não rola (Mínimo 2)' })
  cidade: string;

  // ========================================
  // A PARTE QUE É DE BÔNUS (Opcional)
  // ========================================

  /**
   * 🗺️ ESTADO (UF)
   * 🎯 Regra: "SP", "RJ", sacou?
   */
  @IsOptional()
  @IsString({ message: 'O Estado é texto patrão' })
  @MinLength(2, { message: 'Coloca a sigla correta tipo SP, RJ (2 letras)' })
  @MaxLength(2, { message: 'Sigla só tem 2 letras doido' })
  estado?: string;

  /**
   * 🏘️ BAIRROS TOP
   * 🎯 Regra: Se jogar vazio a gente pesquisa no mapa inteiro.
   */
  @IsOptional()
  @IsArray({ message: 'Tem que ser uma listinha (Array) de opções' })
  @IsString({ each: true, message: 'Dentro da lista só aceitamos texto nos bairros' })
  bairrosPreferidos?: string[];

  /**
   * 🏠 O QUE QUER MORAR (CASA, AP, KITNET)
   */
  @IsOptional()
  @IsArray({ message: 'Manda as preferências de imóvel em uma arrumação de lista (Array)' })
  @IsString({ each: true, message: 'Cada tipo de imóvel tem que ser escrito em texto' })
  tiposImovel?: string[];

  /**
   * 📝 CHORO EXTRA / OBSERVAÇÕES
   */
  @IsOptional()
  @IsString({ message: 'Manda o texto com suas exigências aí' })
  @MaxLength(500, {
    message: 'Chega de choro que passou de 500 caracteres, resuma sua angústia',
  })
  observacoes?: string;

  /**
   * 📍 DA ONDE VEIO
   * 🎯 Regra: Pra saber se foi Indicação da tia ou Anúncio.
   */
  @IsOptional()
  @IsString({ message: 'A origem tem que ser explicada em texto' })
  @MaxLength(50, { message: 'Breve demais! No máximo 50 letras na Origem' })
  origem?: string;
}

// ============================================
// 📝 EXEMPLO DE USO:
// ============================================
// 
// // No Controller:
// @Post()
// async create(@Body() dto: CreateClienteDTO) {
//   // NestJS já validou automaticamente!
//   // Se chegou aqui, dados estão válidos
//   return await this.createClienteUseCase.execute(dto);
// }
//
// // Se enviar dados inválidos:
// // Retorna HTTP 400 com mensagem:
// // "Email inválido"
// ============================================
