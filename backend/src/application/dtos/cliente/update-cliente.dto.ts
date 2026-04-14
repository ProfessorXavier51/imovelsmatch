// ============================================
// 📦 DTO: update-cliente.dto.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É tipo o "Create", só que tudo picotado. Qualquer bobeira que tu quiser mudar, manda por aqui.
//
// 📚 ANALOGIA: O REMENDO NA FUNILARIA 🎭
// - Se tu quebrou só o retrovisor, arruma só o retrovisor.
// - Não precisa comprar o carro inteiro de novo!
//
// 🤔 POR QUÊ TODOS OS CAMPOS SÃO OPCIONAIS?
// Porque o maluco pode estar afim de mudar apenas a 'cidade'. Se fosse obrigatório, a gente estragava a paciência dele perguntando o nome e e-mail de novo.
// ============================================

import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDTO } from './create-cliente.dto';

/**
 * 🏗️ CLASSE: UpdateClienteDTO
 *
 * 🎯 O QUE FAZ?
 * Puxa aquela matriz bolada do CreateClienteDTO e aplica o feitiço do @IsOptional() em tudo!
 *
 * 📚 ANALOGIA: A MÁGICA DA XEROX COM "CORRETIVO"
 * Tem a mesma estrutura de campos, validações (e-mail tá certinho, nome > 3 chars). Só que se a gente não mandar, o NestJS finge demência e não reclama.
 *
 * Aí você se pergunta: Onde estão as variáveis aqui dentro?
 * NENHUM LUGAR! O `PartialType(CreateClienteDTO)` chupa a poção toda do outro arquivo e economiza uns metros de linha de código. "DRY - Faz uma vez, corno!"
 */
export class UpdateClienteDTO extends PartialType(CreateClienteDTO) {}
