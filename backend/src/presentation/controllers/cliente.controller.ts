// ============================================
// 🎮 CONTROLLER: cliente.controller.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Recebe requisições HTTP sobre clientes e responde.
//
// 📚 ANALOGIA: É o ATENDENTE DO BALCÃO 🧑‍💼
// - Cliente chega (requisição HTTP)
// - Atendente escuta o pedido (método do controller)
// - Atendente chama especialista (use case)
// - Especialista resolve (lógica de negócio)
// - Atendente entrega resultado (resposta HTTP)
//
// 🤔 POR QUÊ CONTROLLER?
// Sem controller:
// - Use cases teriam que conhecer HTTP (bagunça)
// - Não teríamos validação automática
// - Difícil de documentar API
//
// Com controller:
// - Use cases focam em negócio
// - Validação automática (DTOs)
// - Documentação automática (Swagger)
// - Código limpo e organizado
//
// 💡 O QUE É CONTROLLER?
// É a PORTA DE ENTRADA da API:
// - Recebe requisições HTTP
// - Valida dados (DTOs)
// - Chama use cases
// - Retorna respostas HTTP
// ============================================

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import {
  CreateClienteUseCase,
  FindClienteUseCase,
  UpdateClienteUseCase,
  DeleteClienteUseCase,
  ListClientesUseCase,
} from '../../application/use-cases/cliente';
import {
  CreateClienteDTO,
  UpdateClienteDTO,
  ClienteResponseDTO,
} from '../../application/dtos/cliente';
import { ClienteFilters } from '../../domain/repositories/cliente.repository.interface';

/**
 * 🏗️ CLASSE: ClienteController
 *
 * 📚 ANALOGIA: É o BALCÃO DE ATENDIMENTO 🏪
 * - Tem 5 atendentes (métodos)
 * - Cada um faz uma coisa específica
 * - Todos seguem o mesmo padrão
 *
 * 🎯 O QUE FAZ?
 * Gerencia todas as rotas HTTP de clientes.
 *
 * 🔄 ROTAS DISPONÍVEIS:
 * - POST   /clientes          → Criar cliente
 * - GET    /clientes/:id      → Buscar um cliente
 * - GET    /clientes          → Listar clientes
 * - PATCH  /clientes/:id      → Atualizar cliente
 * - DELETE /clientes/:id      → Deletar cliente
 *
 * 💡 DECORATORS DO NESTJS:
 * - @Controller('clientes') = Define prefixo da rota
 * - @Post() = Rota POST
 * - @Get() = Rota GET
 * - @Patch() = Rota PATCH
 * - @Delete() = Rota DELETE
 * - @Body() = Pega dados do corpo da requisição
 * - @Param() = Pega parâmetro da URL
 * - @Query() = Pega query string (?page=1&cidade=SP)
 */
@ApiTags('clientes')
@Controller('clientes')
export class ClienteController {
  // ========================================
  // CONSTRUTOR (Dependency Injection)
  // ========================================

  /**
   * 🏭 MÉTODO: Construtor
   *
   * 🎯 O QUE FAZ?
   * Recebe os 5 use cases (especialistas) que vão fazer o trabalho.
   *
   * 📚 ANALOGIA: É como CONTRATAR A EQUIPE 👥
   * - Atendente contrata especialistas
   * - Cada especialista faz uma coisa
   * - Atendente só coordena
   *
   * 🔌 DEPENDENCY INJECTION:
   * NestJS injeta automaticamente os use cases.
   */
  constructor(
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly findClienteUseCase: FindClienteUseCase,
    private readonly updateClienteUseCase: UpdateClienteUseCase,
    private readonly deleteClienteUseCase: DeleteClienteUseCase,
    private readonly listClientesUseCase: ListClientesUseCase,
  ) {}

  // ========================================
  // ROTA 1: POST /clientes (Criar)
  // ========================================

  /**
   * 🎬 ROTA: POST /clientes
   *
   * 🎯 O QUE FAZ?
   * Cria um novo cliente no sistema.
   *
   * 📚 ANALOGIA: É como FAZER CADASTRO NA ACADEMIA 🏋️
   * - Você preenche formulário (CreateClienteDTO)
   * - Atendente valida dados
   * - Atendente chama especialista (use case)
   * - Especialista cadastra você
   * - Atendente te dá carteirinha (ClienteResponseDTO)
   *
   * 🔄 FLUXO:
   * 1. Frontend envia POST com JSON
   * 2. NestJS valida CreateClienteDTO
   * 3. Controller chama CreateClienteUseCase
   * 4. Use case cria cliente
   * 5. Controller converte Entity → DTO
   * 6. Retorna HTTP 201 Created com cliente
   *
   * 📝 EXEMPLO DE REQUISIÇÃO:
   * POST http://localhost:3001/clientes
   * Content-Type: application/json
   *
   * {
   *   "nome": "João Silva",
   *   "email": "joao@gmail.com",
   *   "telefone": "(11) 99999-9999",
   *   "tipoInteresse": "COMPRAR",
   *   "valorMinimo": 200000,
   *   "valorMaximo": 500000,
   *   "cidade": "São Paulo",
   *   "estado": "SP",
   *   "bairrosPreferidos": ["Centro", "Jardins"],
   *   "tiposImovel": ["CASA", "APARTAMENTO"]
   * }
   *
   * 📝 EXEMPLO DE RESPOSTA (201 Created):
   * {
   *   "id": "550e8400-e29b-41d4-a716-446655440000",
   *   "nome": "João Silva",
   *   "email": "joao@gmail.com",
   *   "telefone": "11999999999",
   *   "telefoneFormatado": "(11) 99999-9999",
   *   ...
   * }
   *
   * ❌ ERROS POSSÍVEIS:
   * - 400 Bad Request: Dados inválidos (validação DTO)
   * - 409 Conflict: Email já cadastrado
   *
   * @param dto - Dados do cliente (CreateClienteDTO)
   * @returns ClienteResponseDTO com cliente criado
   */
  @Post()
  @HttpCode(HttpStatus.CREATED) // HTTP 201
  @ApiOperation({ summary: 'Cadastrar interesse (Público)', description: 'Cadastra um novo cliente interessado em imóveis (rota pública)' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso', type: ClienteResponseDTO })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  async create(@Body() dto: CreateClienteDTO): Promise<ClienteResponseDTO> {
    // Chama use case para criar cliente
    const cliente = await this.createClienteUseCase.execute(dto);

    // Converte Entity → DTO de resposta
    return ClienteResponseDTO.fromEntity(cliente);
  }

  // ========================================
  // ROTA 2: GET /clientes/:id (Buscar um)
  // ========================================

  /**
   * 🎬 ROTA: GET /clientes/:id
   *
   * 🎯 O QUE FAZ?
   * Busca um cliente específico pelo ID.
   *
   * 📚 ANALOGIA: É como PROCURAR CONTATO NO CELULAR 📱
   * - Você digita o nome/número (ID)
   * - Celular procura
   * - Se achar, mostra detalhes
   * - Se não achar, avisa "Não encontrado"
   *
   * 🔄 FLUXO:
   * 1. Frontend envia GET /clientes/uuid-123
   * 2. Controller extrai ID da URL
   * 3. Controller chama FindClienteUseCase
   * 4. Use case busca cliente
   * 5. Controller converte Entity → DTO
   * 6. Retorna HTTP 200 OK com cliente
   *
   * 📝 EXEMPLO DE REQUISIÇÃO:
   * GET http://localhost:3001/clientes/550e8400-e29b-41d4-a716-446655440000
   *
   * 📝 EXEMPLO DE RESPOSTA (200 OK):
   * {
   *   "id": "550e8400-e29b-41d4-a716-446655440000",
   *   "nome": "João Silva",
   *   "email": "joao@gmail.com",
   *   ...
   * }
   *
   * ❌ ERROS POSSÍVEIS:
   * - 404 Not Found: Cliente não existe
   *
   * @param id - ID do cliente (UUID)
   * @returns ClienteResponseDTO com dados do cliente
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar cliente por ID', description: 'Retorna os dados de um cliente específico' })
  @ApiParam({ name: 'id', description: 'ID do cliente (UUID)', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: ClienteResponseDTO })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findOne(@Param('id') id: string): Promise<ClienteResponseDTO> {
    // Chama use case para buscar cliente
    const cliente = await this.findClienteUseCase.execute(id);

    // Converte Entity → DTO de resposta
    return ClienteResponseDTO.fromEntity(cliente);
  }

  // ========================================
  // ROTA 3: GET /clientes (Listar todos)
  // ========================================

  /**
   * 🎬 ROTA: GET /clientes
   *
   * 🎯 O QUE FAZ?
   * Lista clientes com filtros, paginação e ordenação.
   *
   * 📚 ANALOGIA: É como PESQUISAR NO MERCADO LIVRE 🛒
   * - Você filtra por categoria, preço, cidade
   * - Escolhe quantos ver por página
   * - Ordena por relevância
   * - Sistema mostra resultados
   *
   * 🔄 FLUXO:
   * 1. Frontend envia GET com query params
   * 2. Controller extrai filtros da query string
   * 3. Controller chama ListClientesUseCase
   * 4. Use case busca clientes
   * 5. Controller converte Entities → DTOs
   * 6. Retorna HTTP 200 OK com resultado paginado
   *
   * 📝 EXEMPLO DE REQUISIÇÃO 1 (Sem filtros):
   * GET http://localhost:3001/clientes
   * // Retorna primeira página com 10 clientes
   *
   * 📝 EXEMPLO DE REQUISIÇÃO 2 (Com filtros):
   * GET http://localhost:3001/clientes?cidade=São Paulo&ativo=true&page=2&pageSize=20
   *
   * 📝 EXEMPLO DE REQUISIÇÃO 3 (Busca por nome):
   * GET http://localhost:3001/clientes?search=João
   *
   * 📝 EXEMPLO DE REQUISIÇÃO 4 (Ordenação):
   * GET http://localhost:3001/clientes?sortField=nome&sortOrder=asc
   *
   * 📝 EXEMPLO DE RESPOSTA (200 OK):
   * {
   *   "data": [
   *     { "id": "...", "nome": "João Silva", ... },
   *     { "id": "...", "nome": "Maria Santos", ... }
   *   ],
   *   "total": 150,
   *   "page": 1,
   *   "pageSize": 10,
   *   "totalPages": 15
   * }
   *
   * 🎮 QUERY PARAMS DISPONÍVEIS:
   * - page: Número da página (padrão: 1)
   * - pageSize: Itens por página (padrão: 10, máx: 100)
   * - ativo: true/false
   * - tipoInteresse: COMPRAR/ALUGAR
   * - cidade: Nome da cidade
   * - estado: UF (SP, RJ, etc)
   * - valorMinimo: Valor mínimo
   * - valorMaximo: Valor máximo
   * - search: Busca em nome ou email
   * - sortField: Campo para ordenar
   * - sortOrder: asc/desc
   *
   * @param query - Query params da URL
   * @returns Resultado paginado com clientes
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar clientes', description: 'Lista clientes com filtros, paginação e ordenação' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página', example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Itens por página', example: 10 })
  @ApiQuery({ name: 'cidade', required: false, description: 'Filtrar por cidade', example: 'São Paulo' })
  @ApiQuery({ name: 'ativo', required: false, description: 'Filtrar por status ativo', example: true })
  @ApiQuery({ name: 'search', required: false, description: 'Buscar por nome ou email' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso' })
  async findAll(@Query() query: any) {
    // ========================================
    // PASSO 1: Extrair filtros da query string
    // ========================================
    const filters: ClienteFilters = {
      ativo: query.ativo !== undefined ? query.ativo === 'true' : undefined,
      tipoInteresse: query.tipoInteresse,
      cidade: query.cidade,
      estado: query.estado,
      valorMinimo: query.valorMinimo ? Number(query.valorMinimo) : undefined,
      valorMaximo: query.valorMaximo ? Number(query.valorMaximo) : undefined,
      search: query.search,
    };

    // ========================================
    // PASSO 2: Extrair paginação
    // ========================================
    const page = query.page ? Number(query.page) : 1;
    const pageSize = query.pageSize ? Number(query.pageSize) : 10;

    // ========================================
    // PASSO 3: Extrair ordenação
    // ========================================
    const sort = query.sortField
      ? {
          field: query.sortField,
          order: query.sortOrder || 'asc',
        }
      : undefined;

    // ========================================
    // PASSO 4: Chamar use case
    // ========================================
    const result = await this.listClientesUseCase.execute(
      filters,
      page,
      pageSize,
      sort,
    );

    // ========================================
    // PASSO 5: Converter Entities → DTOs
    // ========================================
    return {
      ...result,
      data: ClienteResponseDTO.fromEntityArray(result.data),
    };
  }

  // ========================================
  // ROTA 4: PATCH /clientes/:id (Atualizar)
  // ========================================

  /**
   * 🎬 ROTA: PATCH /clientes/:id
   *
   * 🎯 O QUE FAZ?
   * Atualiza dados de um cliente existente.
   *
   * 📚 ANALOGIA: É como EDITAR PERFIL NO INSTAGRAM 📝
   * - Você abre seu perfil
   * - Muda o que quiser (nome, foto, bio)
   * - Salva alterações
   * - Perfil atualizado!
   *
   * 🔄 FLUXO:
   * 1. Frontend envia PATCH com JSON
   * 2. NestJS valida UpdateClienteDTO
   * 3. Controller chama UpdateClienteUseCase
   * 4. Use case atualiza cliente
   * 5. Controller converte Entity → DTO
   * 6. Retorna HTTP 200 OK com cliente atualizado
   *
   * 📝 EXEMPLO DE REQUISIÇÃO (Atualizar só telefone):
   * PATCH http://localhost:3001/clientes/550e8400-e29b-41d4-a716-446655440000
   * Content-Type: application/json
   *
   * {
   *   "telefone": "(11) 88888-8888"
   * }
   *
   * 📝 EXEMPLO DE REQUISIÇÃO (Atualizar vários campos):
   * PATCH http://localhost:3001/clientes/550e8400-e29b-41d4-a716-446655440000
   *
   * {
   *   "nome": "João Silva Santos",
   *   "valorMinimo": 300000,
   *   "valorMaximo": 600000,
   *   "bairrosPreferidos": ["Jardins", "Pinheiros"]
   * }
   *
   * 📝 EXEMPLO DE RESPOSTA (200 OK):
   * {
   *   "id": "550e8400-e29b-41d4-a716-446655440000",
   *   "nome": "João Silva Santos",
   *   "telefone": "11888888888",
   *   "telefoneFormatado": "(11) 88888-8888",
   *   ...
   * }
   *
   * ❌ ERROS POSSÍVEIS:
   * - 400 Bad Request: Dados inválidos
   * - 404 Not Found: Cliente não existe
   * - 409 Conflict: Email já em uso por outro cliente
   *
   * @param id - ID do cliente
   * @param dto - Dados a atualizar (UpdateClienteDTO)
   * @returns ClienteResponseDTO com cliente atualizado
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar cliente', description: 'Atualiza dados de um cliente existente' })
  @ApiParam({ name: 'id', description: 'ID do cliente (UUID)' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso', type: ClienteResponseDTO })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @ApiResponse({ status: 409, description: 'Email já em uso por outro cliente' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateClienteDTO,
  ): Promise<ClienteResponseDTO> {
    // Chama use case para atualizar cliente
    const cliente = await this.updateClienteUseCase.execute(id, dto);

    // Converte Entity → DTO de resposta
    return ClienteResponseDTO.fromEntity(cliente);
  }

  // ========================================
  // ROTA 5: DELETE /clientes/:id (Deletar)
  // ========================================

  /**
   * 🎬 ROTA: DELETE /clientes/:id
   *
   * 🎯 O QUE FAZ?
   * Deleta um cliente permanentemente do sistema.
   *
   * 📚 ANALOGIA: É como EXCLUIR CONTA DO INSTAGRAM 🗑️
   * - Você pede pra deletar
   * - Sistema verifica se você existe
   * - Deleta todos seus dados
   * - Conta removida permanentemente
   *
   * 🔄 FLUXO:
   * 1. Frontend envia DELETE
   * 2. Controller extrai ID da URL
   * 3. Controller chama DeleteClienteUseCase
   * 4. Use case deleta cliente
   * 5. Retorna HTTP 204 No Content (sem corpo)
   *
   * 📝 EXEMPLO DE REQUISIÇÃO:
   * DELETE http://localhost:3001/clientes/550e8400-e29b-41d4-a716-446655440000
   *
   * 📝 EXEMPLO DE RESPOSTA (204 No Content):
   * (sem corpo - apenas status 204)
   *
   * ❌ ERROS POSSÍVEIS:
   * - 404 Not Found: Cliente não existe
   *
   * ⚠️ ATENÇÃO:
   * - Deleta PERMANENTEMENTE (não tem volta!)
   * - Deleta em CASCADE:
   *   * MatchLogs
   *   * Negociações
   *   * Anotações
   *   * ClienteEtiquetas
   *
   * @param id - ID do cliente a deletar
   * @returns void (HTTP 204 No Content)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT) // HTTP 204
  @ApiOperation({ summary: 'Deletar cliente', description: 'Remove um cliente permanentemente do sistema' })
  @ApiParam({ name: 'id', description: 'ID do cliente (UUID)' })
  @ApiResponse({ status: 204, description: 'Cliente deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    // Chama use case para deletar cliente
    await this.deleteClienteUseCase.execute(id);

    // Não retorna nada (void)
    // NestJS retorna HTTP 204 No Content automaticamente
  }
}

// ============================================
// 📚 RESUMO DAS ROTAS
// ============================================
//
// 🎯 CRUD COMPLETO:
//
// 1. CREATE (Criar):
//    POST /clientes
//    Body: CreateClienteDTO
//    Response: 201 Created + ClienteResponseDTO
//
// 2. READ ONE (Buscar um):
//    GET /clientes/:id
//    Response: 200 OK + ClienteResponseDTO
//
// 3. READ ALL (Listar):
//    GET /clientes?page=1&pageSize=10&cidade=SP
//    Response: 200 OK + PaginatedResult<ClienteResponseDTO>
//
// 4. UPDATE (Atualizar):
//    PATCH /clientes/:id
//    Body: UpdateClienteDTO
//    Response: 200 OK + ClienteResponseDTO
//
// 5. DELETE (Deletar):
//    DELETE /clientes/:id
//    Response: 204 No Content
//
// ============================================
// 📚 CÓDIGOS HTTP USADOS
// ============================================
//
// ✅ SUCESSO:
// - 200 OK: Operação bem-sucedida (GET, PATCH)
// - 201 Created: Recurso criado (POST)
// - 204 No Content: Deletado com sucesso (DELETE)
//
// ❌ ERROS:
// - 400 Bad Request: Dados inválidos (validação DTO)
// - 404 Not Found: Recurso não encontrado
// - 409 Conflict: Conflito (email duplicado)
// - 500 Internal Server Error: Erro no servidor
//
// ============================================
