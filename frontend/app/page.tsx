/* ====================================================================================================
 * O QUE É? Página Inicial Pública Absolutamente Premium (Landing Page Fodástica).
 * ONDE? Rota raiz do Frontend Next.js (app/page.tsx).
 * QUANDO? É o primeiro contato visual do usuário (Corretor, Comprador ou Visitante) ao acessar o domínio principal.
 * PQ? O usuário demandou um layout espetacular ("fodástico") para substituir uma tela básica. Precisamos converter visitantes com UI/UX impecável.
 * COMO? Utilizando React, TailwindCSS Extremo (Gradients dinâmicos, Glassmorphism, Sobreposição absoluta), Lucide Icons e Imagens reais de alta resolução para causar impacto.
 * ==================================================================================================== */

// O QUE É? Diretiva que define o Limite de Cliente.
// ONDE? Primeira linha executável do código.
// QUANDO? Sempre que o componente for carregar no navegador e precisar gerenciar estados.
// PQ? O Next.js exige isso para que o React saiba que deve enviar JavaScript para o navegador para lidar com o Form de Busca.
// COMO? Declarando "use client".
'use client';

// O QUE É? Hooks do React.
// ONDE? Topo do Módulo.
// QUANDO? Montagem e Ciclo de Vida.
// PQ? A página possui filtros (Comprar, Preço, etc) que mudam com base na digitação do humano.
// COMO? Import default.
import { useState, useEffect } from 'react';

// O QUE É? Biblioteca de Ícones Vetoriais puros.
// ONDE? Importação global.
// QUANDO? Na renderização dos botões, barras e cabeçalho.
// PQ? Interface luxuosa detesta Emoji. A gente usa ícones vazados para dar ar minimalista.
// COMO? Destructuring dos importes exatos que precisamos.
import { Search, MapPin, ChevronRight, Home, Key, Star, Shield, Bell, Sparkles } from 'lucide-react';

export default function HomePage() {
  
  // O QUE É? Estado das Variáveis do Motor de Busca.
  // ONDE? Função principal HomePage.
  // QUANDO? A cada tecla pressionada no search.
  // PQ? Necessário para guardar critérios antes de apertar "Buscar".
  // COMO? const com array destructured gerado via useState.
  const [filtros, setFiltros] = useState({
    tipo: 'VENDA',
    cidade: '',
    precoMin: '',
    precoMax: '',
    quartos: '',
  });

  // O QUE É? Um state de Efeito visual para a Navbar.
  // ONDE? Logo após os filtros.
  // QUANDO? Escutando o evento de Scroll.
  // PQ? A Navbar deve nascer transparente e ficar preta conforme o usuário desce, característica de sites da Apple e Tesla.
  // COMO? Com um booleano de estado atualizado no 'useEffect'.
  const [scrolled, setScrolled] = useState(false);

  // O QUE É? Hook de Efeito Colateral.
  // ONDE? Ciclo de montagem.
  // QUANDO? Uma única vez após pintar a tela.
  // PQ? Ouve o deslizamento do scroll vertical do navegador para colorir o header.
  // COMO? Adicionando e removendo um EventListener window.addEventListener("scroll", handler).
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // O QUE É? O Envoltório (Wrapper) Pai de Toda a Página.
    // ONDE? Retorno do JSX.
    // QUANDO? Render base.
    // PQ? Define a tipografia, fundo padrão e fluidez de rolagem.
    // COMO? bg-slate-950 (Preto profundo quase espacial) e texto claro.
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* =============================================================================================== */}
      {/* O QUE É? CABEÇALHO SUPREMO (Navbar Transmutável) */}
      {/* ONDE? Topo fixo da pirâmide visual. */}
      {/* QUANDO? Sempre visível para servir de boia salva-vidas na navegação. */}
      {/* PQ? O usuário não pode se perder. */}
      {/* COMO? Header Fixo ('fixed w-full z-50'). A cor muda via render condicional baseado no estado 'scrolled'. */}
      <header className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-white/10 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center text-white">
            
            {/* O QUE É? O Brand/Logo à esquerda. */}
            {/* ONDE? Dentro do lado Esquerdo do flex do Header. */}
            {/* QUANDO? Sempre. */}
            {/* PQ? Para consolidar a marca Neo-Luxuosa! */}
            {/* COMO? Usando ícones e um subtítulo com transparência em Gradientes roxos ('bg-clip-text'). */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wide">
                Imoveis<span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-fuchsia-200 to-indigo-100">Match</span>
              </span>
            </div>
            
            {/* O QUE É? Links de Navegação (Para humanos irem e voltarem). */}
            {/* ONDE? Alinhamento centralizado ou a direita do layout flex. */}
            {/* QUANDO? Ações de usuário ativo. */}
            {/* PQ? Links rápidos sem obrigar que procurem nos cantos obscuros da web. */}
            {/* COMO? Elementos Anchor HTML puro '<a/>' ou Next Links. Estilo hover sutil com 'text-slate-300 hover:text-white'. */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium text-white tracking-widest uppercase hover:text-indigo-400 transition-colors">Galeria</a>
              <a href="/cadastro-interesse" className="text-sm font-medium text-slate-300 tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                <Bell className="w-4 h-4"/> Avisos
              </a>
              {/* O QUE É? Botão Call To Action do Admin. */}
              {/* ONDE? Posição Ultra-Direita. */}
              {/* QUANDO? O Corretor/Dono da loja quer logar. */}
              {/* PQ? Botão principal da Home sempre fica como CTA destcado. */}
              {/* COMO? Pílula (rounded-full) com glassmorphism claro. */}
              <a href="/admin/login" className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="relative z-10 text-sm tracking-wide">Área Restrita</span>
                <div className="absolute inset-0 w-1/4 bg-white/20 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
              </a>
            </nav>
            
          </div>
        </div>
      </header>

      {/* =============================================================================================== */}
      {/* O QUE É? O CORAÇÃO DO WOW FACTOR: HERO SECTION MONUMENTAL. */}
      {/* ONDE? Bloco inicial da rolagem que domina 100% da tela limpa do monitor. */}
      {/* QUANDO? Entrar no site da raiz. */}
      {/* PQ? "A primeira impressão é a que fica." A imagem de The Batman / Cyberpunk na vitrine vende. */}
      {/* COMO? Container com 'min-h-screen', Posição e Imagem por trás em CSS absolute. */}
      <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden">
        
        {/* O QUE É? Imagem Fotográfica Absoluta Fodástica da Casa Fundo. */}
        {/* ONDE? Camada Z zero por trás de todo mundo. */}
        {/* QUANDO? Durante o estado natural inicial. */}
        {/* PQ? Sem uma foto colossal não se vende conceito premium arquitetônico. */}
        {/* COMO? img 'object-cover w-full h-full' posicionado nativamente em absolute fixo até rolagem subir. */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2600" 
            alt="Mansion Premium Home" 
            className="w-full h-full object-cover animate-in fade-in zoom-in-110 duration-[2s]"
          />
          {/* O QUE É? Overlay Sombrio (Degradê de opressora escuridão pra sumir na base preta). */}
          {/* ONDE? Por cima da foto, antes do texto. */}
          {/* QUANDO? Funciona de filtro para garantir leitura e transição proxima Seção Black. */}
          {/* PQ? Textura pura na pele mata contraste textual. */}
          {/* COMO? bg-gradient from cima e baixo. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-[#0a0a0f]/40 to-[#0a0a0f]"></div>
        </div>

        {/* O QUE É? Os Letreiros Imponentes do Hero. */}
        {/* ONDE? Camada Z10 (Flutuando no meio do monitor sobre o overlay). */}
        {/* QUANDO? Texto de ataque ao coração comercial. */}
        {/* PQ? Direcionar o desejo do usuário. "Você tá num lugar chique, nós resolvemos". */}
        {/* COMO? Text-center, colunas, texto colossal. */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-indigo-300 text-sm font-semibold tracking-widest uppercase mb-8 shadow-2xl animate-in slide-in-from-bottom-5 duration-700">
            <Star className="w-4 h-4" /> Inteligência Imobiliária de Ponta
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-center mb-6 tracking-tighter leading-tight max-w-5xl animate-in slide-in-from-bottom-10 duration-1000 delay-150">
            Redescubra o Seu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-300 to-indigo-100 italic font-serif">Modo de Viver</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 mb-16 text-center max-w-3xl font-light tracking-wide animate-in slide-in-from-bottom-10 duration-1000 delay-300">
            O algoritmo definitivo. Cruze seu perfil bio-financeiro com os imóveis mais espetaculares disponíveis em sua região de interesse em milissegundos.
          </p>

          {/* =============================================================================================== */}
          {/* O QUE É? NOVO FORMULÁRIO DE BUSCA GLASSMORPHISM (Consolação da Nave Espacial do Usuário). */}
          {/* ONDE? Na ponta da barriga do Hero Section. */}
          {/* QUANDO? Esperando comandos paramétricos. */}
          {/* PQ? O usuário tem que buscar. Mas não num campinho cinza triste. Tem que ser uma cabine de comando espacial que brilha na tela inteira! */}
          {/* COMO? Pílula Gigante Horizontal. Tailwind Classes Glassmórficas. */}
          <div className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-full p-3 shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col md:flex-row items-center gap-2 animate-in slide-in-from-bottom-12 duration-1000 delay-500">
            
            {/* O QUE É? Input Seletor "Comprar / Alugar". */}
            {/* ONDE? Lado Esquerdo Externo do Capsule Form. */}
            {/* QUANDO? Modificação de Estado Inicial. */}
            {/* PQ? Determina a vertente de base de dados filtral. */}
            {/* COMO? Dropdown disfarçado, sem fundo, hover na letra. */}
            <div className="flex-1 w-full md:w-auto px-6 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Natureza da Busca</p>
              <select 
                value={filtros.tipo}
                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                className="w-full bg-transparent border-none text-white font-medium focus:ring-0 px-0 cursor-pointer appearance-none outline-none"
              >
                <option value="VENDA" className="bg-slate-900">Comprar Pedaço de Céu</option>
                <option value="ALUGUEL" className="bg-slate-900">Alugar Oásis Privado</option>
              </select>
            </div>

            {/* O QUE É? Input de Digitação "Cidade / Região". */}
            {/* ONDE? Compartimento 2 da Cápsula Lateral. */}
            {/* QUANDO? Foco do humano. */}
            {/* PQ? Filtro primário para geo localidade. */}
            {/* COMO? Input text transparente placeholder escurozinho. */}
            <div className="flex-1 w-full md:w-auto px-6 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Localização Neutra</p>
              <input 
                type="text" 
                placeholder="Qual oásis municipal?"
                value={filtros.cidade}
                onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-white font-medium placeholder-slate-600 px-0"
              />
            </div>

            {/* O QUE É? Dropdown de Volume de Dormitórios. */}
            {/* ONDE? Terceira câmara. Antes do Botão. */}
            {/* QUANDO? Refino espacial físico (M² real). */}
            {/* PQ? Pra não mostrar kitnets se o cara quer um casarão. */}
            {/* COMO? Select igualzinho o primeiro porém com outra info. */}
            <div className="flex-1 w-full md:w-auto px-6 py-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Aposentos Inclusos</p>
              <select 
                value={filtros.quartos}
                onChange={(e) => setFiltros({ ...filtros, quartos: e.target.value })}
                className="w-full bg-transparent border-none text-white font-medium focus:ring-0 px-0 cursor-pointer appearance-none outline-none"
              >
                <option value="" className="bg-slate-900">Qualquer Tamanho</option>
                <option value="1" className="bg-slate-900">1 ou mais Suítes</option>
                <option value="2" className="bg-slate-900">2 ou mais Aposentos</option>
                <option value="3" className="bg-slate-900">3 ou mais, Para Família</option>
                <option value="4" className="bg-slate-900">4 ou mais, Aristocrata</option>
              </select>
            </div>

            {/* O QUE É? O Acionador Matriz do Filtro (Botão Buscar). */}
            {/* ONDE? Lateral Direita da Cápsula Formularia de Vidro. */}
            {/* QUANDO? O usuário decide disparar o backend para achar as casas maravilhosas. */}
            {/* PQ? Call to Action essencial. */}
            {/* COMO? Botão massivo arredondado com efeito Grads que brilha brutalmente no Hover. */}
            <button className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white font-bold h-14 px-10 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 shrink-0">
              <Search className="w-5 h-5" /> Iniciar Varredura
            </button>
          </div>
        </div>
      </section>

      {/* =============================================================================================== */}
      {/* O QUE É? VITRINE DESLUMBRANTE "Listagem de Imóveis" (Módulo Card Grid). */}
      {/* ONDE? Rolando a tela pra baixo pós-hero. Onde de fato o resultado brota pra visão. */}
      {/* QUANDO? Após a submissão dos dados (no momento, é vitrine global estática de isca). */}
      {/* PQ? O core da ferramenta. Temos que entregar a ele o que ele de fato buscou. */}
      {/* COMO? Seção de Grid CSS, com Cartões de "Holograma/Glass" exibindo imagens fotográficas incríveis e botões lindos. */}
      <section className="py-32 relative z-10 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto auto-rows-max">
        
        {/* O QUE É? Efeitos luminosos base dessa seção inteira para vazar pra trás dos cartões de casa dando aura imponente! */}
        {/* ONDE? Presos absolutos dentro da section container. */}
        {/* QUANDO? Eternamente enfeitando o fundo. */}
        {/* PQ? Preto puro do nada cansa. Elementos geométricos geram densidade digital artística. */}
        {/* COMO? Bloco Div absoluto com Blur exagerado! */}
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] -translate-y-1/2 rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-fuchsia-900/10 blur-[150px] -translate-y-1/2 rounded-full pointer-events-none"></div>

        {/* O QUE É? Cabeçalhos da Vitrine de Prateleiras. */}
        {/* ONDE? Topo da Seção Vitrine. */}
        {/* QUANDO? Título guia para humano saber onde está num Scroll agressivo de site escuro. */}
        {/* PQ? Hierarquia da informação. Ele sabe que a busca acabou e desceu até o resultado. */}
        {/* COMO? Div englobando título brutal H2 e link pra ver geral tudo. */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Descobertas Exclusivas
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl font-medium tracking-wide">
              Uma curadoria neural dos espaços mais magníficos catalogados pelas melhores mentes do mercado, separados especialmente pelo seu perfil de exigência.
            </p>
          </div>
          <button className="mt-8 md:mt-0 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors flex items-center gap-2 text-sm font-semibold tracking-widest uppercase">
            Acessar Galáxia Completa <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* O QUE É? Grid Matricial de Casas (O Motor Visual Real de Vendas dos Corretora). */}
        {/* ONDE? Abaixo do Titulo Exclusivas. */}
        {/* QUANDO? Sempre que bater array de imóveis na tela. */}
        {/* PQ? Padroniza caixinhas (Cartões). */}
        {/* COMO? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'. Array de imoveis (zombado com Map para mockar maravilhosamente). */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          
          {/* O QUE É? Loop Falso (Mock). Gerando 6 Imóveis. */}
          {/* ONDE? Dentro do espaço colunado (Grid Container). */}
          {/* QUANDO? Tempo de render. */}
          {/* PQ? O usuário não tem backend real acoplado perfeitamente que traz imagens das imobiliarias na DB agora (e quer layout rapido, e fodástico!). */}
          {/* COMO? Um array hardcocado com links foda do Unplash, repassando num .map(item). */}
          {[
            { img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000", tag: "Neo-Mansão", price: "R$ 4.200.000", name: "Recanto da Tríade", beds: 4, city: "Jurerê, SC" },
            { img: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=1000", tag: "Penthouse", price: "R$ 1.850.000", name: "Cobertura Astral Sul", beds: 3, city: "Jardins, SP" },
            { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000", tag: "Vila Autônoma", price: "R$ 9.150.000", name: "Casarão EcoTech", beds: 6, city: "Alphaville, SP" },
            { img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=1000", tag: "Loft Vidrificado", price: "R$ 950.000", name: "Studio Cristal X1", beds: 1, city: "Botafogo, RJ" },
            { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000", tag: "Condomínio Ultra", price: "R$ 2.400.000", name: "Residencial Ômega", beds: 3, city: "Curitiba, PR" },
            { img: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&q=80&w=1000", tag: "Ilha Privada", price: "R$ 15.000.000", name: "Oásis do Dragão", beds: 5, city: "Angra, RJ" }
          ].map((imovel, i) => (
            
            // O QUE É? O Cartão de Imóvel propriamente dito. O Cardzinho que será clicado.
            // ONDE? Elemento atómico renderizado de filho pro pai (Grid).
            // QUANDO? Uma por Imóvel Encontrado.
            // PQ? Encapsulamento da Entidade "Imóvel".
            // COMO? Uma div gigante de grupo com 'rounded-[2rem]' para curvar lindamente, background fosco cinza meio claro para não sumir no escuro de trás, e group do tailwind ativo p/ hover magico.
            <div key={i} className="group relative bg-[#0f0f16] border border-white/5 rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] flex flex-col">
              
              {/* O QUE É? O Módulo Capa (A foto superior do cartão imovel). */}
              {/* ONDE? Topo do Card. Metade superior da área flex. */}
              {/* QUANDO? Ilustração visual em si. */}
              {/* PQ? O Ser Humano é puramente movido à visão na hora de gastar milhões. */}
              {/* COMO? Div alta e overflow-hidden para a Imagem não sair vazando a borda, Imagem absoluta preenchendo isso tudo, com filter para escurecer embaixo com Overlay. */}
              <div className="relative h-72 overflow-hidden w-full">
                <img 
                  src={imovel.img} 
                  alt={imovel.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                
                {/* O QUE É? O Etiqueta Categoria (Tág flutuadora Ex: "Neo-Mansão"). */}
                {/* ONDE? Absolute top e left dentro do topo imagem do cartãozim. */}
                {/* QUANDO? Diferenciar classe do imovel instantaneamente. */}
                {/* PQ? Mostra elegância sem colocar barra gigante. */}
                {/* COMO? Glass Pill pequenina de cor Indigo e texto Branco. */}
                <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                  {imovel.tag}
                </span>

                {/* O QUE É? Película Negra Gradient. */}
                {/* ONDE? Por sob foto de cada cartão. */}
                {/* QUANDO? Fim basilar. */}
                {/* PQ? Vai ter um texto colado em cima branco, precisa escurecer essa aba. */}
                {/* COMO? Degradê na div absoluta. */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0f16] to-transparent"></div>
              </div>

              {/* O QUE É? Barriga Retangular do Card (Informações Reais, Texto). */}
              {/* ONDE? Embaixo da foto. Fechando flex column vertical. */}
              {/* QUANDO? Descrição escrita para o cerébro analisar. */}
              {/* PQ? Ali tem M2, preço, quartos... dados puramentente lógicos que fecham a venda. */}
              {/* COMO? Paddin 'p-8', títulos brancos e flex columns separando espaços textuais vitais e botão "Ver Detalhes". */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                    {imovel.name}
                  </h3>
                  <div className="flex items-center gap-4 text-slate-400 text-sm font-medium mb-6">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-rose-400" /> {imovel.city}</span>
                    <span className="flex items-center gap-1.5"><Home className="w-4 h-4 text-indigo-400" /> {imovel.beds} Suítes</span>
                  </div>
                </div>

                {/* O QUE É? O Preçário vs O CallToAction de Cartão. */}
                {/* ONDE? Basezinha do cartão, fundo puro dele. */}
                {/* QUANDO? Para saber se o bolso compensa o visual. */}
                {/* PQ? O Botão azul do cartão encerra a tarefa do usuário numa lista - clicando para engajar o single-page deste item. */}
                {/* COMO? Div com 'flex justify-between' colando preço na extrema esquerda e Botão em pílula na extrema direita. */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Preço Sugerido</p>
                    <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      {imovel.price}
                    </p>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-white/5 hover:bg-indigo-500 flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:bg-indigo-600 group-hover:border-indigo-400">
                    <Key className="w-5 h-5 text-white transform -rotate-45" />
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* =============================================================================================== */}
      {/* O QUE É? SEÇÃO SUPER NOVA: "O CONCIERGE IA" (Call To Action Final Substituto do 'Não Achou'). */}
      {/* ONDE? Fim da página, rolando após dezenas de casas de sonho. */}
      {/* QUANDO? Quando a frustração visual atinge o ser. Ele procurava X, e nada agradou. */}
      {/* PQ? Não podemos largar dinheiro no chão. Um cliente sem casa aqui ainda é um contato no banco (Lead) de alto valor agregado à Imobiliária! */}
      {/* COMO? Um banner colossal roxo e lindo em formato de convite ultra exclusivo onde a IA manda a casa na DM dele depois. */}
      <section className="relative py-24 my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* O QUE É? A Barra Fundo Magnética. */}
        {/* ONDE? Camada visual estrita abaixo dos textos. */}
        {/* QUANDO? Formato de Banner. */}
        {/* PQ? Diferenciar do padrão escuro para brilhar com Gradients Pink/Purple agressivo (Que nem no dashboard mágico dele!). */}
        {/* COMO? Abusando forte do bg-gradient-to-r com From Fuchsia e Indico, rounded 3xl forte de arredondamento. */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-fuchsia-900 rounded-[3rem] overflow-hidden">
          {/* O QUE É? Padrão pontilhado decorativo de fundo falso. */}
          {/* ONDE? Por cima imediato da cor sólida para dar textura tipo "Mesh". */}
          {/* QUANDO? Pra mostrar capricho ui/ux supremo. */}
          {/* PQ? Um fundo plano brilhante liso parece de 2012 e não 2026. */}
          {/* COMO? Uma foto de overlay ou CSS noise. Aqui usarei um gradiente radial CSS em Overlay na veia!. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
          
          {/* O QUE É? Estrelão gigante abstrato borrado lá atrás da div p dar Glow imenso! (O segredo do Fodástico) */}
          <div className="absolute -top-1/2 -right-1/4 w-[100%] h-[200%] bg-white/5 blur-[100px] rounded-full transform rotate-45 pointer-events-none"></div>
        </div>

        {/* O QUE É? O Texto e Botão da "Lista de Espera" (O Antigo Não Encontrou). */}
        {/* ONDE? Camada Z10 sobrepondo o banner colorido ali de cima. */}
        {/* QUANDO? Leitura final do usuário. */}
        {/* PQ? A persuasão precisa ser impecável e não "tendiante". */}
        {/* COMO? Flex col concentrado no centro 'text-center items-center justify-center'. P para parágrafos gigantes. */}
        <div className="relative z-10 p-12 md:p-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 mb-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Não avistou o <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-white italic">Inimaginável?</span>
          </h3>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mb-12 font-light leading-relaxed">
            Nossos radares captam propriedades sigilosas do alto luxo diariamente. Insira sua exigência em nosso sistema neural e seja avisado em primeira mão.
          </p>
          
          <a
            href="/cadastro-interesse"
            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-white px-12 font-bold text-indigo-900 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-black/5" />
            </div>
            <span className="flex items-center gap-3 text-lg z-10 relative tracking-wide">
              Invocar Concierge da Busca <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </section>

      {/* =============================================================================================== */}
      {/* O QUE É? RODAPÉ ELEGANTE (A Finalização da Viagem de Scroll). */}
      {/* ONDE? Porão de toda a página (Última tag interna). */}
      {/* QUANDO? Chegou-se a estaca zero vertical. Fim d'linha. */}
      {/* PQ? Um lugar modesto para termos jurídicos e "quem fez". */}
      {/* COMO? Fundo totalmente negro mate, p tags miudas, com uma corzinha vermelha simpática pro coraçãozinho e o ano atual em JS ou Handcoded. */}
      <footer className="bg-black text-slate-500 py-16 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 mb-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span className="text-xl font-bold tracking-wide text-white">
                Imoveis<span className="font-light">Match</span>
              </span>
          </div>
          <p className="text-sm font-medium tracking-widest uppercase">
            © 2026 Inteligência de Elite - Todos os direitos blindados.
          </p>
          <p className="text-xs mt-2 opacity-50 flex items-center gap-1 justify-center">
            Esculpido sinteticamente com <span className="text-rose-500">❤️</span> e doses altas de ☕
          </p>
        </div>
      </footer>

    </div>
  );
}
