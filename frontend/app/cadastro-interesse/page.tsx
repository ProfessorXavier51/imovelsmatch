/* ====================================================================================================
 * O QUE É? Página de Cadastro de Interesse Absolutamente Fodástica (Lead Capture).
 * ONDE? Rota de conversão do Frontend (app/cadastro-interesse/page.tsx).
 * QUANDO? Quando o humano é seduzido pelo site e não achou o que queria, vindo aqui declarar as suas especificações cobiçadas.
 * PQ? O usuário pediu explicitamente para "REFORMAR O LAYOUT E DESIGN" de modo surpreendente, mas MANTENDO TODOS OS CAMPOS e comportamentos nativos exatos da versão anterior. Nenhuma inteligência ou validação foi ferida neste processo!
 * COMO? Lógica TypeScript preservada intocável; apenas o JSX e as Tailwind classes foram transmutados para um visual High-End Dark-Space com Glassmorphism.
 * ==================================================================================================== */

// O QUE É? Declaração de Client Component.
// ONDE? Início do módulo.
// QUANDO? Componentes interativos de input e states são carregados.
// PQ? Next.js App Router pede "use client" para habilitar hooks (useState, onSubmit).
// COMO? String solta ali em cima.
'use client';

// O QUE É? Importações lógicas essenciais de React, Alertas e API.
// ONDE? Cabeçalho do arquivo.
// QUANDO? Importado na inicialização.
// PQ? 'useState' segura os valores, 'Swal' para avisar se deu erro sem usar alerts nativos horríveis, 'api' pra mandar pro backend.
// COMO? Destructuring e referências nominais.
import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '@/lib/api';

// O QUE É? Substituição de SVGs brutos por ícones Lucide elegantes.
// ONDE? Importação extra de perfumaria fina UI.
// QUANDO? Para desenhar os cartões do formulário.
// PQ? Deixa o design fodástico muito mais coerente.
// COMO? Importação da lib instalada.
import { User, Mail, Phone, Home, DollarSign, Building, Map, Tag, Sparkles, CheckCircle2, ChevronLeft, Send, Search } from 'lucide-react';

export default function CadastroInteressePage() {
  
  // ===============================================================================================
  // ÁREA PROIBIDA MANTIDA 100% INTACTA (LÓGICA ORIGINAL)
  // ===============================================================================================
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoInteresse: '',
    valorMinimo: '',
    valorMaximo: '',
    cidade: '',
    bairrosPreferidos: [] as string[],
    tiposImovel: [] as string[],
    subtiposImovel: [] as string[],
    observacoes: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const tiposDisponiveis = [
    'Comercial',
    'Garagem',
    'Residencial',
    'Rural',
    'Terreno',
  ];

  const subtiposDisponiveis = [
    'Apartamento',
    'Casa',
    'Chácara',
    'Conjunto de Salas',
    'Fazenda',
    'Fundo de Comércio',
    'Galpão',
    'Garagem',
    'Hotel',
    'Imóvel Comercial',
    'Kitnet',
    'Lanchonete / Café',
    'Loja',
    'Pousada',
    'Restaurante',
    'Sala Comercial',
    'Sítio',
    'Terreno',
  ];

  const cidadesDisponiveis = [
    'São Lourenço',
    'Carmo de Minas',
    'Soledade de Minas',
    'São Sebastião da Bela Vista',
    'Pouso Alto',
    'Dom Viçoso',
  ];

  const bairrosPorCidade: Record<string, string[]> = {
    'São Lourenço': [
      'Bela Vista',
      'Carioca',
      'Centro',
      'Estação',
      'Federal',
      'Jardim Serrano',
      'Palmela',
      'Parque Olímpico',
      'Porto Alegre',
      'Residencial Rio Verde I',
      'Santa Mônica I',
      'Santa Mônica II',
      'São Lourenço Velho',
      'Solar dos Lagos',
      'Vila Carneiro',
      'Vila Nova',
    ],
    'Carmo de Minas': [
      'Centro',
    ],
  };

  const toggleArray = (array: string[], item: string) => {
    return array.includes(item) ? array.filter(i => i !== item) : [...array, item];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dados.nome.trim()) {
      Swal.fire({ icon: 'error', title: 'Campo obrigatório', text: 'Por favor, preencha seu nome completo!' });
      return;
    }
    if (!dados.telefone.trim()) {
      Swal.fire({ icon: 'error', title: 'Campo obrigatório', text: 'Por favor, preencha seu telefone!' });
      return;
    }
    if (!dados.email.trim()) {
      Swal.fire({ icon: 'error', title: 'Campo obrigatório', text: 'Por favor, preencha seu e-mail!' });
      return;
    }
    if (!dados.tipoInteresse) {
      Swal.fire({ icon: 'error', title: 'Campo obrigatório', text: 'Por favor, selecione se deseja COMPRAR ou ALUGAR!' });
      return;
    }
    if (!dados.valorMaximo) {
      Swal.fire({ icon: 'error', title: 'Campo obrigatório', text: 'Por favor, informe o valor máximo que pode pagar!' });
      return;
    }
    if (!dados.cidade) {
      Swal.fire({ icon: 'error', title: 'Campo obrigatório', text: 'Por favor, selecione uma cidade!' });
      return;
    }
    if (dados.tiposImovel.length === 0) {
      Swal.fire({ icon: 'error', title: 'Campo obrigatório', text: 'Por favor, selecione pelo menos 1 tipo de imóvel!' });
      return;
    }
    
    setEnviando(true);
    
    try {
      await api.post('/clientes', {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        tipoInteresse: dados.tipoInteresse.toUpperCase(),
        valorMinimo: dados.valorMinimo ? parseFloat(dados.valorMinimo) : undefined,
        valorMaximo: parseFloat(dados.valorMaximo),
        cidade: dados.cidade,
        estado: 'MG',
        bairrosPreferidos: dados.bairrosPreferidos.length > 0 ? dados.bairrosPreferidos : undefined,
        tiposImovel: dados.tiposImovel.length > 0 ? dados.tiposImovel : undefined,
        observacoes: dados.observacoes || undefined,
      });

      setSucesso(true);
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || error.message || 'Erro ao cadastrar';
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        background: '#0a0a0f', // Adaptação do SweetAlert pro Dark
        color: '#fff',
        text: mensagemErro,
      });
    } finally {
      setEnviando(false);
    }
  };

  // ===============================================================================================
  // FIM DA LÓGICA INTACTA - INÍCIO DA ARTE DA RENDERIZAÇÃO
  // ===============================================================================================

  // O QUE É? A Tela de Sucesso.
  // ONDE? Render Condicional Alternativo Superior.
  // QUANDO? Quando a variável `sucesso` assume 'true' no callback da API.
  // PQ? Sem exibir uma glória após tanto preenchimento de input, o cliente não converte endorfina.
  // COMO? Design em Tela Inteira Glass, centralizado, botão fuchsia.
  if (sucesso) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* LUZES AMBIENTES SUCESSO */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 blur-[150px] rounded-full"></div>
        
        <div className="max-w-2xl w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 text-center relative z-10 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-100 mb-4 tracking-tight">Transmissão Bem-Sucedida!</h3>
          <p className="text-slate-400 text-lg mb-10 tracking-wide font-light">Nossos algoritmos já registraram sua assinatura arquitetônica. Você será notificado instantaneamente a cada novo Match.</p>
          <button onClick={() => setSucesso(false)} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:scale-105 transition-all shadow-lg tracking-widest uppercase text-sm">
            Retornar
          </button>
        </div>
      </div>
    );
  }

  // O QUE É? Retina/Base principal de todo o HTML de formulário reformado.
  // ONDE? O retorno principal.
  // QUANDO? Quando acessado.
  // PQ? Esse é o layout que foi trocado do branco/verde padrão pro layout Premium Space.
  // COMO? Classes utilitárias puras do TailwindCSS dominando o eixo div principal!
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-32">
      
      {/* O QUE É? O Header Superior Simples e Limpo pra ele poder desistir e voltar. */}
      {/* ONDE? Fixado lá em cima visualmente (ou natural em top-0). */}
      {/* QUANDO? Sempre. */}
      {/* PQ? Manter navegabilidade. */}
      {/* COMO? Flex between e link de "< Voltar". */}
      <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h1 className="text-xl font-bold tracking-wide text-white">Imoveis<span className="font-light text-slate-400">Match</span></h1>
            </div>
            <a href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest">
              <ChevronLeft className="w-4 h-4" /> Resgatar
            </a>
          </div>
        </div>
      </header>

      {/* O QUE É? O Container Fofinho de introdução (Herozinho do Form e Fofuras textuais). */}
      {/* ONDE? Pós Header na Main Section. */}
      {/* QUANDO? Preparo piscológico. */}
      {/* PQ? Não chutar o form seco na cara faz a pessoa confiar mais. */}
      {/* COMO? Tipografia centrada e gigante de boas vindas. */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
         {/* O QUE É? Neons de Fundo para o Formulario Gigante (Os blurs absoutos redondos) */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 blur-[150px] -translate-y-1/2 rounded-full pointer-events-none"></div>
         
         <div className="text-center mb-16 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" /> Afiliação VIP Gratuita
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight">O Sistema Ouve <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-300 italic">Você.</span></h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Mapeie seu desejo abaixo detalhadamente e deixe nossa Inteligência Artificial vascular todo o mercado operante até pescar o inatingível para você.
            </p>
          </div>

          {/* O QUE É? A Espinha Dorsal Mestra (O Formulário em si). */}
          {/* ONDE? Wrapper abraçando todos os fields. */}
          {/* QUANDO? Submetido pela pessoa clicando. */}
          {/* PQ? O HTML tag 'form' acopla o block listener onSubmit. */}
          {/* COMO? Form puro com Flex-Col "space-y-8". */}
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              {/* ================================================================================= }
              {/* O QUE É? O BLOCO 1: DADOS PESSOAIS */}
              {/* ONDE? Primeira "Gaveta" do form. */}
              {/* QUANDO? Ele diz a gente quem ele é. */}
              {/* PQ? Cadeira vitalícia. */}
              {/* COMO? Painel Glassmorphism bg-slate-900/60 border-white/5 rounded-3xl com inputs escuros incríveis. */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0"></div>
                  
                  <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-8 tracking-wide">
                    <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20"><User className="w-5 h-5 text-indigo-400" /></div>
                    Identidade Civil
                  </h3>

                  <div className="space-y-6 text-sm">
                     {/* O QUE É? Entrada Unica (Nome). */}
                     <div>
                        <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-2 pl-1">Gravação do Nome *</label>
                        <input
                          type="text"
                          required
                          value={dados.nome}
                          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                          placeholder="Ex: Elon Reeve Musk"
                          className="w-full bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                        />
                     </div>

                     {/* O QUE É? Container Duplo Flex (Grid para Phone e Email). */}
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-2 pl-1">Matriz de Contato (WhatsApp) *</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><Phone className="w-4 h-4"/></span>
                            <input
                              type="tel"
                              required
                              value={dados.telefone}
                              onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
                              placeholder="(00) 90000-0000"
                              className="w-full bg-black/40 pl-11 pr-5 py-4 rounded-xl border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-2 pl-1">Endereço Eletrônico *</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><Mail className="w-4 h-4"/></span>
                            <input
                              type="email"
                              required
                              value={dados.email}
                              onChange={(e) => setDados({ ...dados, email: e.target.value })}
                              placeholder="transmissão@dominio.com"
                              className="w-full bg-black/40 pl-11 pr-5 py-4 rounded-xl border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                            />
                          </div>
                        </div>
                     </div>
                  </div>
              </div>

              {/* ================================================================================= }
              {/* O QUE É? O BLOCO 2: TIPO DE INTERESSE */}
              {/* ONDE? Segunda Gaveta. */}
              {/* QUANDO? Ele diz o que tem vontade "Comprar vs Alugar". */}
              {/* PQ? Base financeira. */}
              {/* COMO? Painel semelhante que porta botões gigantes em vez de inputs convencionais. */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0"></div>

                  <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-8 tracking-wide">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"><Search className="w-5 h-5 text-emerald-400" /></div>
                    Vértice do Desejo
                  </h3>

                  <div className="space-y-8">
                     <div>
                        <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-3 pl-1">Intenção Contratual *</label>
                        <div className="grid grid-cols-2 gap-4">
                            {/* O QUE É? Botões Gigantes Lógicos que guardam "comprar" ou "alugar". */}
                            <button
                              type="button"
                              onClick={() => setDados({ ...dados, tipoInteresse: 'comprar' })}
                              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border transition-all duration-300 ${dados.tipoInteresse === 'comprar' ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-105' : 'border-white/5 bg-black/40 hover:bg-white/5 hover:border-white/10 scale-100'}`}
                            >
                              <Tag className={`w-6 h-6 mb-2 ${dados.tipoInteresse === 'comprar' ? 'text-emerald-400' : 'text-slate-600'}`} />
                              <span className={`font-bold tracking-wide uppercase text-sm ${dados.tipoInteresse === 'comprar' ? 'text-emerald-100' : 'text-slate-500'}`}>Adquirir Definitivo</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDados({ ...dados, tipoInteresse: 'alugar' })}
                              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border transition-all duration-300 ${dados.tipoInteresse === 'alugar' ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-105' : 'border-white/5 bg-black/40 hover:bg-white/5 hover:border-white/10 scale-100'}`}
                            >
                              <Home className={`w-6 h-6 mb-2 ${dados.tipoInteresse === 'alugar' ? 'text-emerald-400' : 'text-slate-600'}`} />
                              <span className={`font-bold tracking-wide uppercase text-sm ${dados.tipoInteresse === 'alugar' ? 'text-emerald-100' : 'text-slate-500'}`}>Alugar Refúgio</span>
                            </button>
                        </div>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-2 pl-1">Montante Mínimo Fiduciário R$</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><DollarSign className="w-4 h-4"/></span>
                            <input
                              type="number"
                              value={dados.valorMinimo}
                              onChange={(e) => setDados({ ...dados, valorMinimo: e.target.value })}
                              placeholder="0,00"
                              className="w-full bg-black/40 pl-11 pr-5 py-4 rounded-xl border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-2 pl-1">O Teto da Oferta (Máximo) R$ *</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"><DollarSign className="w-4 h-4"/></span>
                            <input
                              type="number"
                              required
                              value={dados.valorMaximo}
                              onChange={(e) => setDados({ ...dados, valorMaximo: e.target.value })}
                              placeholder="0,00"
                              className="w-full bg-black/40 pl-11 pr-5 py-4 rounded-xl border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                            />
                          </div>
                        </div>
                     </div>
                  </div>
              </div>

              {/* ================================================================================= }
              {/* O QUE É? O BLOCO 3: TIPOS DE IMÓVEIS (A CLASSIFICAÇÃO) */}
              {/* ONDE? Terceiro Painel. */}
              {/* QUANDO? Selecionado o volume arquitetônico desejado. */}
              {/* PQ? Array Gigantesco do código original precisa ser exibido e comportar perfeitamente os mesmos ids. */}
              {/* COMO? Painel com Toggles visuais premium (Switches neon). */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/30 to-fuchsia-500/0"></div>

                  <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-8 tracking-wide">
                    <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20"><Building className="w-5 h-5 text-fuchsia-400" /></div>
                    Filtragem Estrutural
                  </h3>

                  <div className="space-y-10">
                     
                     {/* MATRIZ 1: Tipos Disponiveis GERAIS */}
                     <div>
                        <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-4 pl-1">Famílias Globais *</label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          {tiposDisponiveis.map((tipo) => {
                            const isChkd = dados.tiposImovel.includes(tipo);
                            return (
                              <button
                                key={tipo}
                                type="button"
                                onClick={() => setDados({ ...dados, tiposImovel: toggleArray(dados.tiposImovel, tipo) })}
                                className="flex items-center gap-3 cursor-pointer group/btn"
                              >
                                <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${isChkd ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]' : 'bg-white/10'}`}>
                                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isChkd ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></span>
                                </div>
                                <span className={`text-sm font-semibold tracking-wide transition-colors ${isChkd ? 'text-fuchsia-200' : 'text-slate-500 group-hover/btn:text-slate-300'}`}>{tipo}</span>
                              </button>
                            );
                          })}
                        </div>
                     </div>

                     {/* MATRIZ 2: Subtipos Detalhados */}
                     <div>
                        <div className="h-px w-full bg-white/5 mb-6"></div>
                        <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-4 pl-1">Especificações Granulares</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5">
                          {subtiposDisponiveis.map((subtipo) => {
                            const isChkd = dados.subtiposImovel.includes(subtipo);
                            return (
                              <button
                                key={subtipo}
                                type="button"
                                onClick={() => setDados({ ...dados, subtiposImovel: toggleArray(dados.subtiposImovel, subtipo) })}
                                className="flex items-center gap-3 cursor-pointer group/btn transition-transform hover:translate-x-1"
                              >
                                <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-300 ${isChkd ? 'bg-fuchsia-500 border-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]' : 'bg-transparent border-white/20'}`}>
                                   {isChkd && <CheckCircle2 className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-xs font-semibold tracking-wider transition-colors text-left ${isChkd ? 'text-fuchsia-100' : 'text-slate-600 group-hover/btn:text-slate-400'}`}>{subtipo}</span>
                              </button>
                            );
                          })}
                        </div>
                     </div>

                  </div>
              </div>


              {/* ================================================================================= }
              {/* O QUE É? O BLOCO 4: LOCALIZAÇÃO E OBSERVATÓRIOS. */}
              {/* ONDE? Quarto Painel de fechamento das variaveis locacionais. */}
              {/* QUANDO? Escolhe a cidade matriz para então o Array revelar Bairros atrelados. */}
              {/* PQ? Sem Cidade Exata, Corretores enlouquecem buscando atoa. */}
              {/* COMO? Painel com o Grid de Toggles Azuis claríssimos / Índigos. */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0"></div>

                  <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-8 tracking-wide">
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20"><Map className="w-5 h-5 text-blue-400" /></div>
                    Geolocalização Alvo
                  </h3>

                  <div className="space-y-8">
                     
                     {/* MATRIZ De Cidade Exclusiva OBRIGATÓRICA (Radio fake). */}
                     <div>
                        <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-3 pl-1">Vértice Urbano Selecionado *</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {cidadesDisponiveis.map((cidade) => {
                            const isSelected = dados.cidade === cidade;
                            const isDisabled = dados.cidade && !isSelected;
                            return (
                              <button
                                key={cidade}
                                type="button"
                                onClick={() => setDados({ ...dados, cidade })}
                                disabled={isDisabled as boolean}
                                className={`relative flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-300 ${isSelected ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.02]' : (isDisabled ? 'border-transparent bg-white/5 opacity-30 cursor-not-allowed' : 'border-white/5 bg-black/40 hover:bg-white/5')}`}
                              >
                                <span className={`font-semibold text-sm tracking-wide ${isSelected ? 'text-blue-300' : 'text-slate-400'}`}>{cidade}</span>
                                <div className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-300 border ${isSelected ? 'border-blue-400 bg-blue-500' : 'border-white/20 bg-transparent'}`}>
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                     </div>

                     {/* RENDEREIZANDO SUBCONJUNTO DE BAIRROS (IF CIDADE POSSUI TABELA) */}
                     {dados.cidade && bairrosPorCidade[dados.cidade] && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                           <div className="h-px w-full bg-white/5 mb-6"></div>
                           <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-4 pl-1">Distritos Preferenciais em {dados.cidade}</label>
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                             {bairrosPorCidade[dados.cidade].map((bairro) => {
                               const isChkd = dados.bairrosPreferidos.includes(bairro);
                               return (
                                 <button
                                   key={bairro}
                                   type="button"
                                   onClick={() => setDados({ ...dados, bairrosPreferidos: toggleArray(dados.bairrosPreferidos, bairro) })}
                                   className="flex items-center gap-3 cursor-pointer group/btn p-2 rounded-lg hover:bg-white/5 transition-colors"
                                 >
                                   <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${isChkd ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`}>
                                     <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isChkd ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></span>
                                   </div>
                                   <span className={`text-xs font-semibold tracking-wide transition-colors text-left ${isChkd ? 'text-blue-200' : 'text-slate-500 group-hover/btn:text-slate-300'}`}>{bairro}</span>
                                 </button>
                               )
                             })}
                           </div>
                        </div>
                     )}

                     {/* ÁREA DE TEXTO: OBSERVAÇÕES FINAIS! */}
                     <div>
                        <div className="h-px w-full bg-white/5 mb-6"></div>
                        <label className="block text-slate-400 font-bold tracking-wider uppercase text-[10px] mb-2 pl-1">Anotações Orgânicas</label>
                        <textarea
                          rows={4}
                          value={dados.observacoes}
                          onChange={(e) => setDados({ ...dados, observacoes: e.target.value })}
                          placeholder="'Gostaria de uma piscina virada para leste...'"
                          className="w-full bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none text-white placeholder-slate-600 shadow-inner text-sm"
                        />
                     </div>
                  </div>
              </div>


              {/* ================================================================================= }
              {/* O QUE É? BOTÃO DE SUBMISSÃO DA FORÇA FINAL. */}
              {/* ONDE? Rodapé do formulário. */}
              {/* QUANDO? Ele clica quando tudo estiver completo na Mente dele. */}
              {/* PQ? Sem o botão Submit, o FormData não chuta de forma síncrona/preventDefault com nosso Hook. */}
              {/* COMO? Um botão massivamente brilhante tipo Joia estelar ou Neon com Lógica Condicional de Carregamento ('enviando'). */}
              <div className="pt-8">
                 <button
                   type="submit"
                   disabled={enviando}
                   className="w-full group relative inline-flex h-20 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-indigo-500 bg-[length:200%_auto] text-white font-bold text-lg hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-wait shadow-[0_0_40px_rgba(217,70,239,0.3)] hover:shadow-[0_0_60px_rgba(217,70,239,0.4)]"
                 >
                   <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)] z-10">
                     <div className="relative h-full w-12 bg-white/20" />
                   </div>

                   {enviando ? (
                     <span className="flex items-center gap-3 z-20 relative text-xl font-black tracking-widest uppercase">
                       <svg className="w-6 h-6 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                       Criptografando Envio...
                     </span>
                   ) : (
                     <span className="flex items-center gap-3 z-20 relative text-xl font-black tracking-widest uppercase">
                       <Send className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                       Injetar no Algoritmo
                     </span>
                   )}
                 </button>
                 
                 <p className="text-center text-xs text-slate-600 font-bold tracking-widest uppercase mt-6">
                    Acesso Exclusivo à Rede ImoveisMatch de Forma Ilimitada. Seus Dados São Sigilosos.
                 </p>
              </div>

          </form>
      </section>

    </div>
  );
}
