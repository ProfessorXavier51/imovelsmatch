// ============================================
// 📦 SEEDER: prisma/seed.ts
// ============================================
import { PrismaClient, TipoInteresse, TipoOperacao, TipoImovel } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeder do CRM Imobiliário...\n');

  // 1️⃣ CRIAR USUÁRIO ADMIN
  console.log('👤 Criando usuário admin...');
  const senhaHash = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@imoveis.com' },
    update: {},
    create: {
      email: 'admin@imoveis.com',
      senha: senhaHash,
      nome: 'Administrador Master',
      role: 'ADMIN',
      ativo: true,
    },
  });
  console.log('✅ Admin criado:', admin.email);

  // 2️⃣ CRIAR 10 CLIENTES
  console.log('\n👥 Criando 10 clientes...');
  
  const clientesData = [
    { nome: 'João Silva', email: 'joao.silva@email.com', telefone: '(11) 98765-4321', tipoInteresse: TipoInteresse.COMPRAR, valorMinimo: 300000, valorMaximo: 500000, cidade: 'São Paulo', bairrosPreferidos: 'Vila Mariana,Paraíso,Jardins', tiposImovel: 'apartamento,casa', observacoes: 'Procura apartamento de 2 quartos próximo ao metrô' },
    { nome: 'Maria Santos', email: 'maria.santos@email.com', telefone: '(21) 99876-5432', tipoInteresse: TipoInteresse.ALUGAR, valorMinimo: 2000, valorMaximo: 3000, cidade: 'Rio de Janeiro', bairrosPreferidos: 'Copacabana,Ipanema,Leblon', tiposImovel: 'apartamento', observacoes: 'Quero vista para o mar, aceita animais' },
    { nome: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', telefone: '(31) 98765-1234', tipoInteresse: TipoInteresse.COMPRAR, valorMinimo: 400000, valorMaximo: 600000, cidade: 'Belo Horizonte', bairrosPreferidos: 'Savassi,Lourdes,Funcionários', tiposImovel: 'casa,sobrado', observacoes: 'Precisa de quintal para crianças e pets' },
    { nome: 'Ana Pereira', email: 'ana.pereira@email.com', telefone: '(41) 99876-4321', tipoInteresse: TipoInteresse.ALUGAR, valorMinimo: 1500, valorMaximo: 2000, cidade: 'Curitiba', bairrosPreferidos: 'Batel,Bigorrilho,Água Verde', tiposImovel: 'apartamento,kitnet', observacoes: 'Estudante de medicina, precisa de local tranquilo' },
    { nome: 'Pedro Costa', email: 'pedro.costa@email.com', telefone: '(11) 91234-5678', tipoInteresse: TipoInteresse.COMPRAR, valorMinimo: 1000000, valorMaximo: 2000000, cidade: 'São Paulo', bairrosPreferidos: 'Jardins,Moema,Brooklin', tiposImovel: 'casa,sobrado', observacoes: 'Procura casa de luxo com piscina' },
    { nome: 'Fernanda Lima', email: 'fernanda.lima@email.com', telefone: '(21) 92345-6789', tipoInteresse: TipoInteresse.ALUGAR, valorMinimo: 5000, valorMaximo: 8000, cidade: 'Rio de Janeiro', bairrosPreferidos: 'Barra da Tijuca,Recreio', tiposImovel: 'casa,condominio', observacoes: 'Família grande, precisa de 4 quartos' },
    { nome: 'Roberto Almeida', email: 'roberto.almeida@email.com', telefone: '(31) 93456-7890', tipoInteresse: TipoInteresse.COMPRAR, valorMinimo: 250000, valorMaximo: 350000, cidade: 'Belo Horizonte', bairrosPreferidos: 'Barreiro,Venda Nova', tiposImovel: 'apartamento', observacoes: 'Aposentado, busca apartamento térreo' },
    { nome: 'Juliana Martins', email: 'juliana.martins@email.com', telefone: '(41) 94567-8901', tipoInteresse: TipoInteresse.ALUGAR, valorMinimo: 800, valorMaximo: 1200, cidade: 'Curitiba', bairrosPreferidos: 'Centro,Cristo Rei', tiposImovel: 'kitnet,quarto', observacoes: 'Estagiária, orçamento limitado' },
    { nome: 'Marcos Rodrigues', email: 'marcos.rodrigues@email.com', telefone: '(51) 95678-9012', tipoInteresse: TipoInteresse.COMPRAR, valorMinimo: 450000, valorMaximo: 700000, cidade: 'Porto Alegre', bairrosPreferidos: 'Moinhos de Vento,Bela Vista', tiposImovel: 'apartamento,cobertura', observacoes: 'Executivo, quer cobertura próximo ao trabalho' },
    { nome: 'Luciana Ferreira', email: 'luciana.ferreira@email.com', telefone: '(85) 96789-0123', tipoInteresse: TipoInteresse.ALUGAR, valorMinimo: 2500, valorMaximo: 3500, cidade: 'Fortaleza', bairrosPreferidos: 'Meireles,Aldeota', tiposImovel: 'apartamento,flat', observacoes: 'Professora universitária, quer perto da praia' },
  ];

  const clientes = [];
  for (const data of clientesData) {
    const cliente = await prisma.cliente.upsert({
      where: { email: data.email },
      update: {},
      create: data,
    });
    clientes.push(cliente);
    console.log(`✅ Cliente: ${cliente.nome} (${cliente.cidade})`);
  }

  // 3️⃣ CRIAR 10 IMÓVEIS
  console.log('\n🏠 Criando 10 imóveis...');
  
  const imoveisData = [
    // 🎯 MATCH 1: Apartamento em SP por 480k
    { titulo: 'Apartamento Moderno Vila Mariana', slug: 'apartamento-moderno-vila-mariana', descricao: 'Apartamento de 2 quartos, varanda gourmet, próximo ao metrô', operacao: TipoOperacao.VENDA, tipoImovel: TipoImovel.APARTAMENTO, valor: 480000, cidade: 'São Paulo', estado: 'SP', bairro: 'Vila Mariana', endereco: 'Rua dos Estudantes, 123', cep: '04120-000', fotos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], quartos: 2, vagas: 1, areaM2: 75, destaque: true, publicado: true },
    // 🎯 MATCH 2: Apartamento no Rio por 2.8k
    { titulo: 'Apartamento Vista Mar Copacabana', slug: 'apartamento-vista-mar-copacabana', descricao: 'Lindo apartamento com vista para o mar, 1 quarto, reformado', operacao: TipoOperacao.ALUGUEL, tipoImovel: TipoImovel.APARTAMENTO, valor: 2800, cidade: 'Rio de Janeiro', estado: 'RJ', bairro: 'Copacabana', endereco: 'Avenida Atlântica, 456', cep: '22010-000', fotos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'], quartos: 1, vagas: 0, areaM2: 45, destaque: true, publicado: true },
    // 🎯 MATCH 3: Casa em BH por 550k
    { titulo: 'Casa com Quintal Savassi', slug: 'casa-quintal-savassi', descricao: 'Casa térrea com 3 quartos, quintal amplo, churrasqueira', operacao: TipoOperacao.VENDA, tipoImovel: TipoImovel.CASA, valor: 550000, cidade: 'Belo Horizonte', estado: 'MG', bairro: 'Savassi', endereco: 'Rua da Bahia, 789', cep: '30140-010', fotos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'], quartos: 3, vagas: 2, areaM2: 150, destaque: true, publicado: true },
    // 🎯 MATCH 4: Apartamento em Curitiba por 1.8k
    { titulo: 'Apartamento Estudante Água Verde', slug: 'apartamento-estudante-agua-verde', descricao: 'Studio compacto, próximo à UTFPR e shopping', operacao: TipoOperacao.ALUGUEL, tipoImovel: TipoImovel.APARTAMENTO, valor: 1800, cidade: 'Curitiba', estado: 'PR', bairro: 'Água Verde', endereco: 'Rua República Argentina, 321', cep: '80610-260', fotos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], quartos: 1, vagas: 1, areaM2: 35, destaque: false, publicado: true },
    // Imóveis sem match
    { titulo: 'Mansão Jardins', slug: 'mansao-jardins', descricao: 'Casa de luxo com 5 suítes, piscina, academia', operacao: TipoOperacao.VENDA, tipoImovel: TipoImovel.CASA, valor: 5000000, cidade: 'São Paulo', estado: 'SP', bairro: 'Jardins', endereco: 'Rua Oscar Freire, 1000', cep: '01426-001', fotos: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'], quartos: 5, vagas: 6, areaM2: 800, destaque: true, publicado: true },
    { titulo: 'Casa Família Barra da Tijuca', slug: 'casa-familia-barra-da-tijuca', descricao: 'Casa em condomínio fechado, 4 quartos, piscina', operacao: TipoOperacao.ALUGUEL, tipoImovel: TipoImovel.CASA, valor: 7500, cidade: 'Rio de Janeiro', estado: 'RJ', bairro: 'Barra da Tijuca', endereco: 'Avenida das Américas, 5000', cep: '22640-102', fotos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'], quartos: 4, vagas: 4, areaM2: 350, destaque: false, publicado: true },
    { titulo: 'Apto Econômico Barreiro', slug: 'apto-economico-barreiro', descricao: 'Apartamento simples, 2 quartos, próximo ao comércio', operacao: TipoOperacao.VENDA, tipoImovel: TipoImovel.APARTAMENTO, valor: 280000, cidade: 'Belo Horizonte', estado: 'MG', bairro: 'Barreiro', endereco: 'Rua dos Aposentados, 50', cep: '30640-010', fotos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], quartos: 2, vagas: 1, areaM2: 55, destaque: false, publicado: true },
    { titulo: 'Kitnet Centro Curitiba', slug: 'kitnet-centro-curitiba', descricao: 'Kitnet básico, próximo à universidade federal', operacao: TipoOperacao.ALUGUEL, tipoImovel: TipoImovel.APARTAMENTO, valor: 900, cidade: 'Curitiba', estado: 'PR', bairro: 'Centro', endereco: 'Rua XV de Novembro, 100', cep: '80020-310', fotos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], quartos: 1, vagas: 0, areaM2: 25, destaque: false, publicado: true },
    { titulo: 'Cobertura Luxo Moinhos', slug: 'cobertura-luxo-moinhos', descricao: 'Cobertura duplex, 3 suítes, terraço com vista panorâmica', operacao: TipoOperacao.VENDA, tipoImovel: TipoImovel.APARTAMENTO, valor: 650000, cidade: 'Porto Alegre', estado: 'RS', bairro: 'Moinhos de Vento', endereco: 'Rua Padre Chagas, 200', cep: '90570-080', fotos: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'], quartos: 3, vagas: 3, areaM2: 280, destaque: true, publicado: true },
    { titulo: 'Flat Beira Mar Meireles', slug: 'flat-beira-mar-meireles', descricao: 'Flat mobiliado, serviços de hotelaria, vista para o mar', operacao: TipoOperacao.ALUGUEL, tipoImovel: TipoImovel.APARTAMENTO, valor: 3200, cidade: 'Fortaleza', estado: 'CE', bairro: 'Meireles', endereco: 'Avenida Beira Mar, 3000', cep: '60165-120', fotos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'], quartos: 1, vagas: 1, areaM2: 50, destaque: true, publicado: true },
  ];

  const imoveis = [];
  for (const data of imoveisData) {
    const imovel = await prisma.imovel.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
    imoveis.push(imovel);
    console.log(`✅ Imóvel: ${imovel.titulo} (${imovel.cidade}) - ${imovel.operacao}`);
  }

  // 4️⃣ CRIAR MATCHES (NEGOCIAÇÕES)
  console.log('\n🔗 Registrando 4 matches no CRM...');
  
  const matchesData = [
    { cliente: clientes[0], imovel: imoveis[0], etapa: 'CONTATO_INICIAL', observacoes: 'Cliente interessado, aguardando visita' },
    { cliente: clientes[1], imovel: imoveis[1], etapa: 'VISITA_AGENDADA', observacoes: 'Visita marcada para próxima semana' },
    { cliente: clientes[2], imovel: imoveis[2], etapa: 'PROPOSTA', observacoes: 'Proposta de 520k enviada, aguardando resposta' },
    { cliente: clientes[3], imovel: imoveis[3], etapa: 'ANALISE', observacoes: 'Negociando valor do aluguel' },
  ];

  for (const match of matchesData) {
    const negociacao = await prisma.negociacao.create({
      data: {
        clienteId: match.cliente.id,
        imovelId: match.imovel.id,
        responsavelId: admin.id,
        etapa: match.etapa as any,
        percentualMatch: 85,
        status: 'ATIVA' as any,
        observacoes: `🎯 MATCH: ${match.observacoes}`,
        valorProposta: match.imovel.operacao === 'VENDA' ? match.imovel.valor : null,
      },
    });
    console.log(`✅ Negociação: ${match.cliente.nome} ↔ ${match.imovel.titulo}`);

    // Criar atividades de exemplo para cada negociação
    const atividadesData = [
      { tipo: 'LIGACAO', descricao: 'Ligação inicial apresentando o imóvel', status: 'CONCLUIDO', concluida: true },
      { tipo: 'VISITA', descricao: 'Visita ao imóvel agendada', status: 'PENDENTE', dataAgendada: new Date(Date.now() + 86400000), concluida: false },
      { tipo: 'WHATSAPP', descricao: 'Envio de fotos e detalhes pelo WhatsApp', status: 'CONCLUIDO', concluida: true },
    ];

    for (const ativ of atividadesData) {
      await prisma.atividade.create({
        data: {
          negociacaoId: negociacao.id,
          responsavelId: admin.id,
          tipo: ativ.tipo as any,
          descricao: ativ.descricao,
          status: ativ.status as any,
          concluida: ativ.concluida,
          dataAgendada: ativ.dataAgendada || null,
          dataConclusao: ativ.concluida ? new Date() : null,
        },
      });
    }
    console.log(`   📋 ${atividadesData.length} atividades criadas`);
  }

  // RESUMO
  console.log('\n' + '='.repeat(50));
  console.log('🎉 SEED CONCLUÍDO!');
  console.log('='.repeat(50));
  console.log(`👤 Admin: admin@imoveis.com / admin123`);
  console.log(`👥 Clientes: ${clientes.length}`);
  console.log(`🏠 Imóveis: ${imoveis.length}`);
  console.log(`🔗 Matches: ${matchesData.length}`);
  console.log('='.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Erro no seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
