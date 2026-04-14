// ============================================
// 📦 USE-CASE: create-imovel.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Faz a mágica de criar o imóvel passar pela validação (se o link já existe) e guarda no banco.
//
// 📚 ANALOGIA: O DESPACHANTE DA PREFEITURA 🏙️
// - O corretor entrega o formulário.
// - O Despachante grita: "Ô chefinho, já tem uma casa registrada com esse link curto (slug)?"
// - Se sim, devolve os papéis na cara (Conflict).
// - Se não, pede pra Entidade Imovel ser gerada e repassa pro repositório mandar ver.
// ============================================

// 📦 ONDE: Importa decorators do NestJS
// 🎯 O QUE: Injectable marca a classe como injetável (DI)
// 🎯 O QUE: Inject injeta dependências por token
// 🎯 O QUE: ConflictException lança erro HTTP 409 (conflito)
import { Injectable, Inject, ConflictException } from '@nestjs/common';

// 📦 ONDE: Importa a interface do repositório de imóveis
// 🎯 O QUE: Define o contrato que o repositório deve seguir
// 🤔 POR QUÊ: Pra desacoplar a lógica de negócio da implementação do banco
import { IImovelRepository } from '../../../domain/repositories/imovel.repository.interface';

// 📦 ONDE: Importa a entidade de domínio Imovel
// 🎯 O QUE: Classe que representa um imóvel com regras de negócio
// 🤔 POR QUÊ: Pra garantir que os dados estejam válidos antes de salvar
import { Imovel } from '../../../domain/entities/imovel.entity';

/**
 * 🏗️ CLASSE: CreateImovelUseCase
 * 
 * 🎯 O QUE É? O caso de uso de criação de imóvel.
 * 📚 COMO? Valida slug único, cria entidade, salva no banco.
 * 📍 ONDE? Camada de aplicação (use cases).
 * 🤔 POR QUÊ? Pra centralizar a lógica de criação de imóvel.
 * ⏰ QUANDO? Quando o controller recebe requisição POST /imoveis.
 */
@Injectable() // 🏷️ O QUE: Marca como injetável no container do NestJS
export class CreateImovelUseCase {
  
  /**
   * 🏗️ CONSTRUTOR
   * 
   * 🎯 O QUE FAZ? Injeta o repositório de imóveis.
   * 📚 COMO? Usa @Inject com token 'IImovelRepository'.
   * 🤔 POR QUÊ? Pra acessar o banco de dados via repositório.
   * ⏰ QUANDO? Na criação da instância (boot do app).
   */
  constructor(
    @Inject('IImovelRepository') // 🔑 O QUE: Token de injeção do repositório
    private imovelRepository: IImovelRepository, // 📦 Repositório injetado
  ) {}

  /**
   * 🚀 MÉTODO: execute
   * 
   * 🎯 O QUE FAZ? Cria um novo imóvel no sistema.
   * 📚 COMO? Valida slug → Cria entidade → Salva no banco.
   * 📍 ONDE? Chamado pelo ImovelController.
   * 🤔 POR QUÊ? Pra garantir que não haja slugs duplicados.
   * ⏰ QUANDO? Quando o corretor cadastra um imóvel novo.
   * 
   * 📥 ENTRADA: data (dados do imóvel do DTO)
   * 📤 SAÍDA: Imovel (entidade salva com ID)
   * ⚠️ ERRO: ConflictException se slug já existir
   */
  async execute(data: any): Promise<Imovel> {
    
    // ========================================
    // 🔍 PASSO 1: VALIDAÇÃO DE SLUG ÚNICO
    // ========================================
    // 🎯 O QUE: Busca no banco se já existe imóvel com esse slug
    // 📚 COMO: Chama findBySlug do repositório
    // 🤔 POR QUÊ: Slug deve ser único (é usado na URL)
    // ⏰ QUANDO: Antes de criar o imóvel
    const exists = await this.imovelRepository.findBySlug(data.slug);
    
    // 🎯 O QUE: Se encontrou, lança exceção
    // 📚 COMO: Throw ConflictException (HTTP 409)
    // 🤔 POR QUÊ: Não pode ter dois imóveis com mesmo slug
    // ⏰ QUANDO: Se exists não for null
    if (exists) {
      throw new ConflictException('Vish, essa URL amigável já tá em uso! Bota um número aí');
    }

    // ========================================
    // 🏗️ PASSO 2: CRIAÇÃO DA ENTIDADE
    // ========================================
    // 🎯 O QUE: Cria instância da entidade Imovel
    // 📚 COMO: Passa os dados pro construtor
    // 🤔 POR QUÊ: A entidade valida os dados (valor > 0, título >= 5 chars, etc)
    // ⏰ QUANDO: Após validar que slug é único
    // ⚠️ NOTA: Se dados inválidos, a entidade lança DomainException
    const imovel = new Imovel(data);
    
    // ========================================
    // 💾 PASSO 3: PERSISTÊNCIA NO BANCO
    // ========================================
    // 🎯 O QUE: Salva o imóvel no banco de dados
    // 📚 COMO: Chama create do repositório
    // 🤔 POR QUÊ: Pra persistir os dados
    // ⏰ QUANDO: Após criar e validar a entidade
    // 📤 RETORNA: Imóvel salvo com ID gerado
    return this.imovelRepository.create(imovel);
  }
}
