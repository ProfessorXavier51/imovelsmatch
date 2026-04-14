// ============================================
// 📦 DTO: cliente-response.dto.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É a via do comprovante. O envelope que junta as paradinhas e devolve mastigado pro front.
//
// 📚 ANALOGIA: A NOTINHA DO MERCADO 🧾
// - Você pagou e levou.
// - A mulher te dá um papel listando certinho tudo o que aconteceu (ID gerado, telefone bonitão formatado).
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra não devolver a entidade pelada! O backend tem seus segredos de cofre. Essa classe pega a Entidade braba, esconde a senha, bota a máscara de telefone (ex: (11) 90000-0000) e entrega polidinha na bandeja pro usuário ver. 
// ============================================

import { TipoInteresse } from '../../../shared/enums/tipo-interesse.enum';
import { Cliente } from '../../../domain/entities/cliente.entity';

/**
 * 🏗️ CLASSE: ClienteResponseDTO
 *
 * 🎯 O QUE FAZ? Padroniza a resposta JSON que a nossa API vai cuspir pro mundo lá fora!
 */
export class ClienteResponseDTO {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  telefoneFormatado: string; // 📱 A cereja do bolo! Manda já no jeitão "(XX) XXXXX-XXXX"
  tipoInteresse: TipoInteresse;
  valorMinimo: number;
  valorMaximo: number;
  cidade: string;
  estado?: string;
  bairrosPreferidos: string[];
  tiposImovel: string[];
  observacoes?: string;
  origem?: string;
  ativo: boolean;     // ✅ Se o mano ainda respira no nosso banco ou parou de vez
  createdAt: Date;
  updatedAt: Date;

  /**
   * 🎬 MÉTODO: fromEntity (Conversor Mágico)
   *
   * 🎯 O QUE FAZ? Pega a entidade de ouro (Domain) e cria o pacotinho fuleiro pra atravessar a internet (JSON).
   *
   * 📚 ANALOGIA: BOTANDO NA CAIXA DO SEDEX 📦
   * - A Entidade é frágil e cheia de frescura de negócios.
   * - Isso aqui só extrai a casca dela e põe o adesivinho do Sedex pra voar!
   */
  static fromEntity(cliente: Cliente): ClienteResponseDTO {
    const dto = new ClienteResponseDTO();

    // Arranca identificação do cliente:
    dto.id = cliente.id || '';
    dto.nome = cliente.nome;
    dto.email = cliente.email;
    
    // Entrega do jeito que o banco quer, e do jeito que os olhos querem ver:
    dto.telefone = cliente.telefone || '';
    dto.telefoneFormatado = cliente.telefoneFormatado || '';

    dto.tipoInteresse = cliente.tipoInteresse;
    dto.valorMinimo = cliente.valorMinimo;
    dto.valorMaximo = cliente.valorMaximo;
    dto.cidade = cliente.cidade;
    dto.estado = cliente.estado;
    dto.bairrosPreferidos = cliente.bairrosPreferidos;
    dto.tiposImovel = cliente.tiposImovel;
    dto.observacoes = cliente.observacoes;
    dto.origem = cliente.origem;

    dto.ativo = cliente.ativo;
    dto.createdAt = cliente.createdAt;
    dto.updatedAt = cliente.updatedAt;

    return dto;
  }

  /**
   * 🎬 MÉTODO: fromEntityArray (Embalador de Fardo)
   *
   * 🎯 O QUE FAZ? Em vez de um presentinho só, ele passa na esteira e empacota fardo pesado com 10, 20 caixas juntas.
   */
  static fromEntityArray(clientes: Cliente[]): ClienteResponseDTO[] {
    return clientes.map((cliente) => this.fromEntity(cliente));
  }
}
