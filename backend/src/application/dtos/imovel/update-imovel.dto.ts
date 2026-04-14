// ============================================
// 📦 DTO: update-imovel.dto.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É tipo o "Create", só que pra pintar a casa de outra cor. Tu pode mudar um parafuso ou o teto inteiro.
//
// 📚 ANALOGIA: O REMENDO DO PEDREIRO 🎭
// - Pintou só a parede? Manda só a "descricao".
// - Subiu o preço? Manda só o "valor".
// - O "PartialType" pega todas as regras do Create e deixa tudo opcional!
// ============================================

import { PartialType } from '@nestjs/swagger';
import { CreateImovelDTO } from './create-imovel.dto';

export class UpdateImovelDTO extends PartialType(CreateImovelDTO) {}
