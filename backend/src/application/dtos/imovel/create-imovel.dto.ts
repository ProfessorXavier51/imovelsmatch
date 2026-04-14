// ============================================
// 📦 DTO: create-imovel.dto.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É a barreira de proteção na hora do corretor cadastrar uma casa.
//
// 📚 ANALOGIA: O FORMULÁRIO DO ANÚNCIO NO ZAP 📋
// - Se o corretor esquecer de botar o preço ou a rua, o sistema grita!
// - Garante que não entra lixo no banco de dados.
// ============================================

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateImovelDTO {
  /**
   * 📝 TÍTULO CHAMATIVO
   */
  @ApiProperty({ example: 'Apartamento 3 quartos no Centro' })
  @IsNotEmpty({ message: 'Tem que ter título patrão!' })
  @IsString()
  titulo: string;

  /**
   * 🔗 URL BONITINHA
   */
  @ApiProperty({ example: 'apartamento-3-quartos-centro' })
  @IsNotEmpty({ message: 'Faltou o Slug (link amigável)' })
  @IsString()
  slug: string;

  /**
   * 🏠 TIPO DE BURACO
   * 🎯 Só aceitamos: CASA, APARTAMENTO, TERRENO, SOBRADO, OUTRO
   */
  @ApiProperty({ enum: ['CASA', 'APARTAMENTO', 'TERRENO', 'SOBRADO', 'OUTRO'] })
  @IsNotEmpty()
  @IsEnum(['CASA', 'APARTAMENTO', 'TERRENO', 'SOBRADO', 'OUTRO'], { message: 'Põe um tipo válido aí' })
  tipoImovel: 'CASA' | 'APARTAMENTO' | 'TERRENO' | 'SOBRADO' | 'OUTRO';

  /**
   * 🎯 QUALÉ A BOA? (Venda ou Aluguel)
   */
  @ApiProperty({ enum: ['VENDA', 'ALUGUEL'] })
  @IsNotEmpty()
  @IsEnum(['VENDA', 'ALUGUEL'])
  operacao: 'VENDA' | 'ALUGUEL';

  /**
   * 💰 GRANA
   */
  @ApiProperty({ example: 350000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1000, { message: 'No mínimo 1.000 conto, senão é golpe' })
  valor: number;

  /**
   * 📍 ENDEREÇO DA BOCA
   */
  @ApiProperty({ example: 'Rua das Flores, 123' })
  @IsNotEmpty()
  @IsString()
  endereco: string;

  @ApiProperty({ example: 'Centro' })
  @IsNotEmpty()
  @IsString()
  bairro: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty({ example: 'SP' })
  @IsNotEmpty()
  @IsString()
  estado: string;

  // ========================================
  // PERFUMARIA (Bônus opcional)
  // ========================================

  @ApiPropertyOptional({ example: '01310100' })
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  quartos?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  vagas?: number;

  @ApiPropertyOptional({ example: 85.5 })
  @IsOptional()
  @IsNumber()
  areaM2?: number;

  @ApiPropertyOptional({ example: 'Apartamento amplo com vista para o parque' })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({ example: ['https://example.com/foto1.jpg'] })
  @IsOptional()
  @IsArray()
  fotos?: string[];
}
