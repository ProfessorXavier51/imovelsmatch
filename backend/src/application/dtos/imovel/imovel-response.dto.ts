/**
 * DTO de resposta para Imóveis
 */

import { Imovel } from '../../../domain/entities/imovel.entity';
import { TipoImovel, TipoOperacao } from '@prisma/client';

export class ImovelResponseDTO {
  id: string;
  titulo: string;
  slug: string;
  descricao?: string;
  tipoImovel: TipoImovel;
  operacao: TipoOperacao;
  valor: number;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep?: string;
  quartos: number;
  vagas: number;
  areaM2?: number;
  publicado: boolean;
  destaque: boolean;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(imovel: Imovel): ImovelResponseDTO {
    const dto = new ImovelResponseDTO();
    dto.id = imovel.id || '';
    dto.titulo = imovel.titulo;
    dto.slug = imovel.slug;
    dto.descricao = imovel.descricao;
    dto.tipoImovel = imovel.tipoImovel as TipoImovel;
    dto.operacao = imovel.operacao as TipoOperacao;
    dto.valor = imovel.valor;
    dto.endereco = imovel.endereco;
    dto.bairro = imovel.bairro;
    dto.cidade = imovel.cidade;
    dto.estado = imovel.estado;
    dto.cep = imovel.cep;
    dto.quartos = imovel.quartos;
    dto.vagas = imovel.vagas;
    dto.areaM2 = imovel.areaM2;
    dto.publicado = imovel.publicado;
    dto.destaque = imovel.destaque;
    dto.createdAt = imovel.createdAt || new Date();
    dto.updatedAt = imovel.updatedAt || new Date();
    return dto;
  }

  static fromEntityArray(imoveis: Imovel[]): ImovelResponseDTO[] {
    return imoveis.map(i => ImovelResponseDTO.fromEntity(i));
  }
}
