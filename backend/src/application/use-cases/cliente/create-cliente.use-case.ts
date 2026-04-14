// ============================================
// 🎬 USE CASE: create-cliente.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Ele é "O Passo-a-passo" do sistema para a criação de um novo cliente. Apenas e unicamente essa ação!
//
// 📚 ANALOGIA: É como a RECEPCIONISTA DA ACADEMIA 🏋️
// 1. Ela te dá a folha (input)
// 2. Você preenche
// 3. Ela confere se seu CPF já tá cadastrado e te dá bronca se existir (ConflictException)
// 4. Te cadastra maravilhosamente e sorri ("Cliente Salvo")
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra gente não ter bagunça no Controller! Deixamos apenas o especialista em cadastro tomando conta de cadastrar a pessoa. O Controller atende o telefone, mas o cara que de fato resolve o BO é esse nosso UseCase (Especialista em criar clientes).
// ============================================

import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { IClienteRepository } from '../../../domain/repositories/cliente.repository.interface';
import { Cliente } from '../../../domain/entities/cliente.entity';
import { CreateClienteDTO } from '../../dtos/cliente/create-cliente.dto';

/**
 * 🏗️ CLASSE: CreateClienteUseCase
 *
 * 🎯 O QUE FAZ?
 * Representa nosso "funcionário" do mês focado unicamente na arte de botar gente nova na nossa plataforma de Imóveis.
 *
 * 🔄 FLUXO: Recebe, vê e-mail repetido, valida objeto e joga firme no banco de dados.
 */
@Injectable()
export class CreateClienteUseCase {
  /**
   * 🏭 MÉTODO: Construtor
   *
   * 🎯 O QUE FAZ?
   * Recebe pelo sistema a ferramentinha do repositório ("Contrato IClienteRepository"). O cara que vai interagir com a sala de arquivos!
   *
   * 📚 ANALOGIA: O mecânico precisa da sua CAIXA DE FERRAMENTAS 🧰
   * O repositório é essa chave de fenda. Sem ela a gente só grita, mas não faz nada.
   */
  constructor(
    @Inject('IClienteRepository')
    private readonly clienteRepository: IClienteRepository,
  ) {}

  /**
   * 🎬 MÉTODO: execute
   *
   * 🎯 O QUE FAZ?
   * Aqui que a faca corta o bolo. Valida, constrói e soca no Banco pra gente obter resultado lindo.
   */
  async execute(input: CreateClienteDTO): Promise<Cliente> {
    // ========================================
    // PASSO 1 e 2: Checagem Anti-Burrice!
    // ========================================
    // A gente fofoca com a biblioteca se esse cara já tá registrado puxando o email que tentaram preencher ali ó!
    const clienteExistente = await this.clienteRepository.findByEmail(
      input.email,
    );

    // Bateu e voltou de cara? Meteu o mesmo e-mail? Fita vermelha na cara (ConflictException)! 🛑
    if (clienteExistente) {
      throw new ConflictException(
        'Já existe um cliente cadastrado com este e-mail',
      );
    }

    // ========================================
    // PASSO 3: Esculpir na Pedra a Validação! (Criar Entity)
    // ========================================
    // Essa não é uma folha em branco de dados mais, é nosso objeto supremo da Entity que faz chover mil checagens cruéis!
    // Se jogar lixo nisso aqui ele cospe DomainException!
    const cliente = Cliente.create({
      nome: input.nome,
      email: input.email,
      telefone: input.telefone,
      tipoInteresse: input.tipoInteresse,
      valorMinimo: input.valorMinimo,
      valorMaximo: input.valorMaximo,
      cidade: input.cidade,
      estado: input.estado,
      bairrosPreferidos: input.bairrosPreferidos,
      tiposImovel: input.tiposImovel,
      observacoes: input.observacoes,
      origem: input.origem,
    });

    // ========================================
    // PASSO 4: Envio Maluco pra Realidade 
    // ========================================
    // Pegamos esse Cliente (perfeito e intocável) e berramos pro repositório: "Manda ver, salva essa gracinha lá e me volta ela com ID mágico que tu gera!".
    const clienteSalvo = await this.clienteRepository.create(cliente);

    // ========================================
    // PASSO 5: Receba sua carteirinha
    // ========================================
    // Tudo certo, passamos o bolo completo com morango.
    return clienteSalvo;
//   expect(result.id).toBeDefined();
// });
  }}
