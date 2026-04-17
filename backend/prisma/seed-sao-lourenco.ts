/**
 * Seeder São Lourenço-MG - Matches 75-100%
 * CEP único: 37470-000
 * Bairros: Centro, Planalto, São Cristóvão, Bela Vista, Jardim Europa, Vila Rica
 */

import { PrismaClient, TipoInteresse, TipoOperacao, TipoImovel, EtapaNegociacao } from '@prisma/client';

const prisma = new PrismaClient();

const CIDADE = 'São Lourenço';
const ESTADO = 'MG';
const CEP = '37470000';

// Clientes com perfis específicos para matches altos
const clientesData = [
  {
    // Cliente 1: Match 100% - Casa no Centro para comprar até 600k
    nome: 'Carlos Eduardo Silva',
    email: 'carlos.silva@email.com',
    telefone: '(35) 99999-1111',
    tipoInteresse: TipoInteresse.COMPRAR,
    valorMinimo: 400000,
    valorMaximo: 600000,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Centro'],
    tiposImovel: ['CASA'],
    ativo: true,
    origem: 'Site'
  },
  {
    // Cliente 2: Match 95% - Apartamento no Planalto para alugar até 2.5k
    nome: 'Ana Maria Costa',
    email: 'ana.costa@email.com',
    telefone: '(35) 99999-2222',
    tipoInteresse: TipoInteresse.ALUGAR,
    valorMinimo: 1500,
    valorMaximo: 2500,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Planalto'],
    tiposImovel: ['APARTAMENTO'],
    ativo: true,
    origem: 'Indicação'
  },
  {
    // Cliente 3: Match 90% - Sala comercial no Centro até 350k
    nome: 'Roberto Empresário',
    email: 'roberto.negocios@email.com',
    telefone: '(35) 99999-3333',
    tipoInteresse: TipoInteresse.COMPRAR,
    valorMinimo: 200000,
    valorMaximo: 350000,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Centro'],
    tiposImovel: ['OUTRO'],
    ativo: true,
    origem: 'Facebook'
  },
  {
    // Cliente 4: Match 85% - Casa no Jardim Europa até 500k
    nome: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    telefone: '(35) 99999-4444',
    tipoInteresse: TipoInteresse.COMPRAR,
    valorMinimo: 350000,
    valorMaximo: 500000,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Jardim Europa'],
    tiposImovel: ['CASA'],
    ativo: true,
    origem: 'Site'
  },
  {
    // Cliente 5: Match 100% - Chalé no Alto da Serra até 450k
    nome: 'Mariana e João',
    email: 'casal.serra@email.com',
    telefone: '(35) 99999-5555',
    tipoInteresse: TipoInteresse.COMPRAR,
    valorMinimo: 300000,
    valorMaximo: 450000,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Alto da Serra'],
    tiposImovel: ['CASA'],
    ativo: true,
    origem: 'Instagram'
  },
  {
    // Cliente 6: Match 80% - Kitnet no Centro para alugar até 1.2k
    nome: 'Pedro Estudante',
    email: 'pedro.univ@email.com',
    telefone: '(35) 99999-6666',
    tipoInteresse: TipoInteresse.ALUGAR,
    valorMinimo: 800,
    valorMaximo: 1200,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Centro'],
    tiposImovel: ['APARTAMENTO'],
    ativo: true,
    origem: 'Site'
  },
  {
    // Cliente 7: Match 95% - Loja no Centro até 400k
    nome: 'Empresa ABC Ltda',
    email: 'contato@abcloja.com',
    telefone: '(35) 3333-7777',
    tipoInteresse: TipoInteresse.COMPRAR,
    valorMinimo: 250000,
    valorMaximo: 400000,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Centro'],
    tiposImovel: ['OUTRO'],
    ativo: true,
    origem: 'Indicação'
  },
  {
    // Cliente 8: Match 75% - Cobertura no Planalto até 800k
    nome: 'Dr. Ricardo Mendes',
    email: 'ricardo.medico@email.com',
    telefone: '(35) 99999-8888',
    tipoInteresse: TipoInteresse.COMPRAR,
    valorMinimo: 600000,
    valorMaximo: 800000,
    cidade: CIDADE,
    estado: ESTADO,
    bairrosPreferidos: ['Planalto'],
    tiposImovel: ['APARTAMENTO'],
    ativo: true,
    origem: 'Site'
  }
];

// Imóveis que batem com os clientes (75-100% match)
const imoveisData = [
  {
    // Imóvel 1: Match 100% com Carlos Eduardo (Casa Centro 550k)
    titulo: 'Casa Espaçosa no Centro',
    slug: 'casa-espacosa-centro-sao-lourenco',
    descricao: 'Linda casa com 3 quartos, 2 suítes, piscina e quintal grande no coração de São Lourenço.',
    tipoImovel: TipoImovel.CASA,
    operacao: TipoOperacao.VENDA,
    valor: 550000,
    endereco: 'Rua Principal, 123',
    bairro: 'Centro',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 3,
    vagas: 2,
    areaM2: 280,
    fotos: [],
    publicado: true,
    destaque: true
  },
  {
    // Imóvel 2: Match 95% com Ana Maria (Apto Planalto 2.3k)
    titulo: 'Apartamento Moderno Planalto',
    slug: 'apartamento-moderno-planalto-sao-lourenco',
    descricao: 'Apartamento novo com 2 quartos, varanda gourmet, piscina no condomínio.',
    tipoImovel: TipoImovel.APARTAMENTO,
    operacao: TipoOperacao.ALUGUEL,
    valor: 2300,
    endereco: 'Av. Doutor Wanderley, 456',
    bairro: 'Planalto',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 2,
    vagas: 1,
    areaM2: 90,
    fotos: [],
    publicado: true,
    destaque: false
  },
  {
    // Imóvel 3: Match 90% com Roberto (Sala Comercial Centro 320k)
    titulo: 'Sala Comercial Centro Empresarial',
    slug: 'sala-comercial-centro-sao-lourenco',
    descricao: 'Sala comercial no edifício empresarial, próximo ao comércio, com 45m².',
    tipoImovel: TipoImovel.OUTRO,
    operacao: TipoOperacao.VENDA,
    valor: 320000,
    endereco: 'Rua Halfeld, 789 - Sala 305',
    bairro: 'Centro',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 0,
    vagas: 1,
    areaM2: 45,
    fotos: [],
    publicado: true,
    destaque: false
  },
  {
    // Imóvel 4: Match 100% com Fernanda (Casa Jardim Europa 480k)
    titulo: 'Casa Família Jardim Europa',
    slug: 'casa-familia-jardim-europa-sao-lourenco',
    descricao: 'Casa com 2 quartos, quintal amplo, churrasqueira, bairro tranquilo.',
    tipoImovel: TipoImovel.CASA,
    operacao: TipoOperacao.VENDA,
    valor: 480000,
    endereco: 'Rua das Flores, 234',
    bairro: 'Jardim Europa',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 2,
    vagas: 2,
    areaM2: 150,
    fotos: [],
    publicado: true,
    destaque: true
  },
  {
    // Imóvel 5: Match 100% com Mariana e João (Chalé Alto da Serra 420k)
    titulo: 'Chalé Vista da Serra',
    slug: 'chale-vista-serra-sao-lourenco',
    descricao: 'Chalé rústico com vista panorâmica, 2 quartos, lareira, terreno com árvores.',
    tipoImovel: TipoImovel.CASA,
    operacao: TipoOperacao.VENDA,
    valor: 420000,
    endereco: 'Estrada da Serra, Km 5',
    bairro: 'Alto da Serra',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 2,
    vagas: 3,
    areaM2: 120,
    fotos: [],
    publicado: true,
    destaque: true
  },
  {
    // Imóvel 6: Match 80% com Pedro (Kitnet Centro 1.1k)
    titulo: 'Kitnet Estudante Centro',
    slug: 'kitnet-estudante-centro-sao-lourenco',
    descricao: 'Kitnet mobiliada, próxima à faculdade, internet incluída, 35m².',
    tipoImovel: TipoImovel.APARTAMENTO,
    operacao: TipoOperacao.ALUGUEL,
    valor: 1100,
    endereco: 'Rua dos Estudantes, 45 - Apto 102',
    bairro: 'Centro',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 1,
    vagas: 0,
    areaM2: 35,
    fotos: [],
    publicado: true,
    destaque: false
  },
  {
    // Imóvel 7: Match 95% com Empresa ABC (Loja Centro 380k)
    titulo: 'Loja Esquina Comercial Centro',
    slug: 'loja-esquina-centro-sao-lourenco',
    descricao: 'Loja de esquina, alta movimentação, 60m², mezanino, banheiro.',
    tipoImovel: TipoImovel.OUTRO,
    operacao: TipoOperacao.VENDA,
    valor: 380000,
    endereco: 'Av. Doutor João Pinheiro, 890',
    bairro: 'Centro',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 0,
    vagas: 2,
    areaM2: 60,
    fotos: [],
    publicado: true,
    destaque: false
  },
  {
    // Imóvel 8: Match 85% com Dr. Ricardo (Cobertura Planalto 750k)
    titulo: 'Cobertura Luxo Planalto',
    slug: 'cobertura-luxo-planalto-sao-lourenco',
    descricao: 'Cobertura duplex com 3 suítes, piscina privativa, vista 360°, 280m².',
    tipoImovel: TipoImovel.APARTAMENTO,
    operacao: TipoOperacao.VENDA,
    valor: 750000,
    endereco: 'Rua das Palmeiras, 1000 - Cobertura',
    bairro: 'Planalto',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 3,
    vagas: 3,
    areaM2: 280,
    fotos: [],
    publicado: true,
    destaque: true
  },
  {
    // Imóvel 9: Match 75% - Apartamento Bela Vista (fora do perfil mas bom valor)
    titulo: 'Apartamento Bela Vista Condomínio Clube',
    slug: 'apartamento-bela-vista-sao-lourenco',
    descricao: 'Apartamento 2 quartos, condomínio com piscina, quadra, área verde.',
    tipoImovel: TipoImovel.APARTAMENTO,
    operacao: TipoOperacao.VENDA,
    valor: 320000,
    endereco: 'Rua Bela Vista, 567',
    bairro: 'Bela Vista',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 2,
    vagas: 1,
    areaM2: 85,
    fotos: [],
    publicado: true,
    destaque: false
  },
  {
    // Imóvel 10: Match 78% - Casa Vila Rica (valor acessível)
    titulo: 'Casa Vila Rica Oportunidade',
    slug: 'casa-vila-rica-sao-lourenco',
    descricao: 'Casa simples, 2 quartos, ótima localização, preço abaixo do mercado.',
    tipoImovel: TipoImovel.CASA,
    operacao: TipoOperacao.VENDA,
    valor: 290000,
    endereco: 'Rua Vila Rica, 789',
    bairro: 'Vila Rica',
    cidade: CIDADE,
    estado: ESTADO,
    cep: CEP,
    quartos: 2,
    vagas: 1,
    areaM2: 120,
    fotos: [],
    publicado: true,
    destaque: false
  }
];

// Negociações para registrar os matches
const negociacoesData = [
  { clienteIdx: 0, imovelIdx: 0, etapa: EtapaNegociacao.CONTATO_INICIAL, match: 100 },
  { clienteIdx: 1, imovelIdx: 1, etapa: EtapaNegociacao.VISITA_AGENDADA, match: 95 },
  { clienteIdx: 2, imovelIdx: 2, etapa: EtapaNegociacao.PROPOSTA, match: 90 },
  { clienteIdx: 3, imovelIdx: 3, etapa: EtapaNegociacao.ANALISE, match: 100 },
  { clienteIdx: 4, imovelIdx: 4, etapa: EtapaNegociacao.CONTATO_INICIAL, match: 100 },
  { clienteIdx: 5, imovelIdx: 5, etapa: EtapaNegociacao.VISITA_AGENDADA, match: 80 },
  { clienteIdx: 6, imovelIdx: 6, etapa: EtapaNegociacao.FECHADO, match: 95 },
  { clienteIdx: 7, imovelIdx: 7, etapa: EtapaNegociacao.ANALISE, match: 85 },
];

async function main() {
  console.log('🌟 Seeder São Lourenço-MG - Matches 75-100%');
  console.log('='.repeat(50));

  // Limpar dados existentes de São Lourenço
  console.log('\n🧹 Limpando dados existentes...');
  const imoveisExistentes = await prisma.imovel.findMany({ where: { cidade: CIDADE } });
  for (const imovel of imoveisExistentes) {
    await prisma.negociacao.deleteMany({ where: { imovelId: imovel.id } });
  }
  const clientesExistentes = await prisma.cliente.findMany({ where: { cidade: CIDADE } });
  for (const cliente of clientesExistentes) {
    await prisma.negociacao.deleteMany({ where: { clienteId: cliente.id } });
  }
  await prisma.imovel.deleteMany({ where: { cidade: CIDADE } });
  await prisma.cliente.deleteMany({ where: { cidade: CIDADE } });

  // Criar clientes (usando upsert para evitar duplicatas)
  console.log('\n👥 Criando clientes...');
  const clientes = [];
  for (const data of clientesData) {
    const cliente = await prisma.cliente.upsert({
      where: { email: data.email },
      update: {
        nome: data.nome,
        telefone: data.telefone,
        tipoInteresse: data.tipoInteresse,
        valorMinimo: data.valorMinimo,
        valorMaximo: data.valorMaximo,
        cidade: data.cidade,
        estado: data.estado,
        bairrosPreferidos: data.bairrosPreferidos,
        tiposImovel: data.tiposImovel,
        ativo: data.ativo,
        origem: data.origem,
      },
      create: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        tipoInteresse: data.tipoInteresse,
        valorMinimo: data.valorMinimo,
        valorMaximo: data.valorMaximo,
        cidade: data.cidade,
        estado: data.estado,
        bairrosPreferidos: data.bairrosPreferidos,
        tiposImovel: data.tiposImovel,
        ativo: data.ativo,
        origem: data.origem,
      }
    });
    clientes.push(cliente);
    console.log(`  ✅ ${cliente.nome} (${cliente.tipoInteresse})`);
  }

  // Criar imóveis (usando upsert para evitar duplicatas)
  console.log('\n🏠 Criando imóveis...');
  const imoveis = [];
  for (const data of imoveisData) {
    const imovel = await prisma.imovel.upsert({
      where: { slug: data.slug },
      update: {
        titulo: data.titulo,
        descricao: data.descricao,
        tipoImovel: data.tipoImovel,
        operacao: data.operacao,
        valor: data.valor,
        endereco: data.endereco,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
        quartos: data.quartos,
        vagas: data.vagas,
        areaM2: data.areaM2,
        fotos: data.fotos,
        publicado: data.publicado,
        destaque: data.destaque,
      },
      create: {
        titulo: data.titulo,
        slug: data.slug,
        descricao: data.descricao,
        tipoImovel: data.tipoImovel,
        operacao: data.operacao,
        valor: data.valor,
        endereco: data.endereco,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
        quartos: data.quartos,
        vagas: data.vagas,
        areaM2: data.areaM2,
        fotos: data.fotos,
        publicado: data.publicado,
        destaque: data.destaque,
      }
    });
    imoveis.push(imovel);
    console.log(`  ✅ ${imovel.titulo} - ${formatarValor(Number(imovel.valor))}`);
  }

  // Criar negociações (matches)
  console.log('\n🤝 Criando negociações (matches)...');
  for (const neg of negociacoesData) {
    const cliente = clientes[neg.clienteIdx];
    const imovel = imoveis[neg.imovelIdx];
    
    await prisma.negociacao.create({
      data: {
        clienteId: cliente.id,
        imovelId: imovel.id,
        etapa: neg.etapa,
      }
    });
    
    console.log(`  ✅ Match ${neg.match}%: ${cliente.nome} ↔ ${imovel.titulo} (${neg.etapa})`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('🎉 Seeder concluído!');
  console.log(`📊 Resumo:`);
  console.log(`   ${clientes.length} clientes`);
  console.log(`   ${imoveis.length} imóveis`);
  console.log(`   ${negociacoesData.length} matches (75-100%)`);
  console.log(`   Cidade: ${CIDADE}-${ESTADO} (CEP: ${CEP})`);
  console.log('='.repeat(50));
}

function formatarValor(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

main()
  .catch((e) => {
    console.error('❌ Erro no seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
