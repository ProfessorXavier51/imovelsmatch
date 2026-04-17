/* ====================================================================================================
 * O QUE É? Componente de Dashboard Ultra Diferenciado, Inovador e Premium.
 * ONDE? Módulo principal do frontend (app/dashboard-surpresa/page.tsx).
 * QUANDO? Renderizado ao acessar a rota /dashboard-surpresa.
 * PQ? Atende à solicitação do usuário de um layout "que pouquíssimos dashboards têm", com foco total em estética, duas colunas e surpresa visual.
 * COMO? Utilizando React, TailwindCSS avançado (com gradients, glassmorphism e animações), Lucide React para ícones ricos.
 * ==================================================================================================== */

// O QUE É? Diretiva de renderização do lado do cliente (Client Boundary).
// ONDE? Sempre na primeira linha útil do arquivo Next.js.
// QUANDO? Usado quando o componente precisa de interatividade (clicks, states).
// PQ? Por padrão o Next.js 13+ usa Server Components, que não suportam 'useState', 'onClick', etc.
// COMO? Adicionando a string estrita "use client" no topo absoluto do módulo.
"use client";

// O QUE É? Importação principal da biblioteca React e seu hook gerenciador de estado.
// ONDE? No bloco de importações do módulo.
// QUANDO? Necessário desde o início da construção das regras lógicas da interface.
// PQ? Requeremos controle de comportamento (ex: qual aba do menu está ativa atualmente).
// COMO? Desestruturando { useState } do pacote padrão 'react'.
import { useState } from 'react';

// O QUE É? Importação de diversos ícones SVG transformados em componentes React.
// ONDE? No bloco secundário de importações.
// QUANDO? Para compor a iconografia de botões, cards e indicadores visuais.
// PQ? Uma interface inovadora ("diferente") baseia-se em dicas visuais modernas, substituindo excesso de texto por ícones belos.
// COMO? Buscando cada componente nomeado do pacote 'lucide-react'.
import { 
  LayoutDashboard, Users, Building, Settings, Search, Bell, 
  Rocket, Activity, Zap, Sparkles, TrendingUp,
  MapPin, Heart, ChevronRight
} from 'lucide-react';

// O QUE É? Declaração da função principal do componente e sua exportação.
// ONDE? Escopo global, sendo a entidade padrão consumida pelo Next Router.
// QUANDO? Quando a rota for requisitada pelo navegador.
// PQ? É o padrão arquitetural do React/Next exportar uma função que retorna JSX.
// COMO? Definindo uma função usando arrow-function e a palavra-chave export default.
export default function DashboardSurpresa() {
  
  // O QUE É? Inicialização do Hook de estado interno.
  // ONDE? Primeira linha do corpo funcional do componente.
  // QUANDO? Sempre que o componente monta, ele inicia com o valor 'dashboard'.
  // PQ? Precisamos saber exatamente qual "tela/seção" o usuário optou do menu esquerdo para mudar o conteúdo do lado direito.
  // COMO? Declarando a variável de leitura 'activeTab' e a função de mutação 'setActiveTab' através do 'useState'.
  const [activeTab, setActiveTab] = useState('dashboard');

  // O QUE É? Um array contendo as configurações estruturais do menu lateral.
  // ONDE? Logo após o estado principal, ainda dentro da função do componente (para suportar internacionalização ou lógica dinâmica futura se houver).
  // QUANDO? Usado durante a renderização (loop) para desenhar os botões.
  // PQ? Em vez de copiar e colar o mesmo HTML de botão, criamos uma constante manipulável que gera o visual dinamicamente.
  // COMO? Um Array de Objetos, cada objeto contendo id, rótulo (label) e o componente de Ícone.
  const menuItems = [
    { id: 'dashboard', label: 'Panorama Espacial', icon: LayoutDashboard },
    { id: 'imoveis', label: 'Propriedades', icon: Building },
    { id: 'matches', label: 'Matches Mágicos', icon: Zap },
    { id: 'clientes', label: 'Rede de Clientes', icon: Users },
    { id: 'analytics', label: 'Métricas Vitais', icon: Activity },
    { id: 'config', label: 'Ajustes Core', icon: Settings },
  ];

  // O QUE É? O retorno do elemento raiz que constrói a árvore do DOM.
  // ONDE? No fim da base de configurações lógicas, marcando a transição de JS puro para JSX.
  // QUANDO? Quando a engine do React processar o ciclo de vida deste componente.
  // PQ? Sem um JSX retornado, a tela fica em branco de modo absoluto.
  // COMO? Retornando uma tag HTML container (`div`) e seu recheio.
  return (
    // O QUE É? Container Matriz de toda a página (A casca principal).
    // ONDE? Raiz do retornoJSX.
    // QUANDO? É a base inabalável do layout.
    // PQ? Precisamos de um fundo negro/profundo global (space/dark mode) e ocupar a tela inteira, evitando qualquer rolagem indesejada do browser nativo.
    // COMO? Com classes Tailwind: 'flex' (para colocar menu e conteúdo lado a lado), 'h-screen' (100% da altura), 'bg-slate-950' (preto bem macio), texturas e transbordamento oculto ('overflow-hidden').
    <div className="flex h-screen w-full bg-[#0a0a0f] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* O QUE É? Decoração de Fundo com Blur Extremo (Ambiente Espacial) */}
      {/* ONDE? Absorvido no fundo absoluto, não interfere com cliques. */}
      {/* QUANDO? Sempre visível, reativo e estático em posicionamento. */}
      {/* PQ? O usuário demandou ser surpreendido. Fundos chapados dão tédio, luzes elípticas distorcidas criam a percepção "Premium Dashboard". */}
      {/* COMO? Duas Divs com 'absolute', formato circular arredondado e altíssimo nível de Blur ('blur-3xl'). */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/10 blur-[120px] pointer-events-none z-0"></div>

      {/* =============================================================================================== */}
      {/* O QUE É? COLUNA DA ESQUERDA: O Menu de Navegação Neural (Sidebar). */}
      {/* ONDE? Posição Relativa 1 na Árvore Flex, empurrado à esquerda. */}
      {/* QUANDO? Sempre persistente e inalterável durante a navegação. */}
      {/* PQ? A premissa do usuário foi "duas colunas: menu lateral na esquerda e o resto abre na direita". */}
      {/* COMO? Tag de semântica nav '<nav>', largura fixa moderada 'w-72', border translúcida do lado direito, glassmorphism 'bg-white/[0.02]', flex-col. */}
      <nav className="relative z-10 w-72 flex flex-col justify-between border-r border-white/5 bg-white/[0.015] backdrop-blur-md transition-all duration-500">
        
        {/* O QUE É? O topo do Menu Esquerdo: A Logomarca do Dashboard. */}
        {/* ONDE? Interior de cima (topo flex). */}
        {/* QUANDO? Marca imutável. */}
        {/* PQ? Posiciona a identidade sistêmica da plataforma (imovelsmatch). */}
        {/* COMO? Container com padding, agrupa ícone e texto usando Flexbox horizontal. */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            {/* O QUE É? O Ícone em formato de Escudo. */}
            {/* ONDE? No lado esquerdo do topo. */}
            {/* QUANDO? Chamando atenção visual de imediato. */}
            {/* PQ? O formato escudo + gradiente representa segurança premium no meio imobiliário. */}
            {/* COMO? Icon 'Shield' Lucide e text-color de gradiente. */}
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {/* O QUE É? A Tipografia estilizada do nome. */}
            {/* ONDE? Lado direito do Escudo. */}
            {/* QUANDO? Leitura do usuário. */}
            {/* PQ? Fixar na mente do corretor que esse produto é vanguardista. */}
            {/* COMO? Span text-xl, weight bold e text-transparent com background gradient (Auro-Text). */}
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-fuchsia-200 to-indigo-100 tracking-wide">
              Nexus<span className="font-light">Match</span>
            </span>
          </div>
        </div>

        {/* O QUE É? Container de listagem dos links de menu. */}
        {/* ONDE? Meio da barra lateral (flex-1 que a faz expandir empurrando o resto). */}
        {/* QUANDO? Permite a interação multi-ponto. */}
        {/* PQ? Precisamos de um repositório central acolhedor para os botões. */}
        {/* COMO? Div com 'flex-1', 'flex flex-col', além de paddings em X 'px-4' para haver respiro nas pontas e gap-2. */}
        <div className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto hidden-scrollbar">
          
          {/* O QUE É? LOOP React (Array Map) passando sobre a Constante criada lá no topo. */}
          {/* ONDE? Dentro do container de links principal. */}
          {/* QUANDO? Durante a interpretação do JSX do objeto 'menuItems'. */}
          {/* PQ? Reduz brutalmente repetibilidade de código (Princípio DRY - Don't Repeat Yourself). */}
          {/* COMO? menuItems.map( (item) => ( retona o HTML JSX do botao para cada item ) ) */}
          {menuItems.map((item) => {
            // O QUE É? A Condição Lógica do Estado.
            // ONDE? Interno do callback iterativo do Loop map().
            // QUANDO? Uma micro verificação rodando instantes antes da renderização.
            // PQ? Precisamos isolar se ESTE item onde o loop passou é de fato a Aba que o sistema afirma ser "ativa".
            // COMO? Comparando simples operador lógico '===' se 'activeTab' tem valor igual ao 'item.id' do ponteiro em vigor.
            const isActive = activeTab === item.id;
            
            // O QUE É? O construtor do Ícone que foi setado no objeto como classe/referência.
            // ONDE? Referenciado via destructure em cada item gerado.
            // QUANDO? Toda iteração.
            // PQ? Lucide precisa de um component JSX <Icon /> em runtime.
            // COMO? Atribuímos a propriedade "icon" a uma variável chamada "Icon" em maiúsculo, validando-a como tag válida XML.
            const Icon = item.icon;

            // O QUE É? Renderização do componente Botão real em tela em cada passada.
            // ONDE? Árvore Dom, construído dinamicamente n-vezes.
            // QUANDO? Disperso linearmente.
            // PQ? Esse botão escutará a emissão cerebral de clique pelo mouse do humano e trocará a coluna direita.
            // COMO? Tag 'button', recebendo a propriedade Key OBRIGATÓRIA no React, onMouse Click que faz chamada à mutante setActiveTab, e classes ultra dinâmicas mescladas com uso de Template Literals (acento grave).
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  relative flex items-center justify-between w-full px-4 py-3 rounded-2xl group transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500/20 to-transparent border border-indigo-500/30 shadow-[inset_0px_0px_20px_rgba(99,102,241,0.1)]' 
                    : 'hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                {/* O QUE É? Aquele brilhozinho lateral tipo Neon aceso apenas quando Ativo. */}
                {/* ONDE? Borda esquerda de botão. */}
                {/* QUANDO? Condicionado `isActive`. */}
                {/* PQ? Indicação sútil de UI, refinada e não agressiva. */}
                {/* COMO? Div de absoluta e 'w-1' (larguinha), transição de opacidade/altura baseada no state. */}
                <div className={`absolute left-0 w-1 rounded-r-full bg-gradient-to-b from-fuchsia-500 to-indigo-500 transition-all duration-300 ${isActive ? 'h-3/5 opacity-100' : 'h-0 opacity-0'}`} />
                
                {/* O QUE É? Envoltório Icone + Label do lado Esquerdo do Botão. */}
                {/* ONDE? Parte Esquerda do Botão Pai Flex. */}
                {/* QUANDO? Posiciona conteúdos. */}
                {/* PQ? O ícone da seta vai ficar alinhado oposto a eles. */}
                {/* COMO? Flex gap-4 padrão. */}
                <div className="flex items-center gap-4">
                  {/* O QUE É? Aplicação real do Icon dinâmico. */}
                  {/* ONDE? Dentro do envoltório. */}
                  {/* QUANDO? Mostra na interface visual. */}
                  {/* PQ? Exemplo: Imovel ganha um "Prédio", o dashboard uma "Dashboard", de forma visual instigante. */}
                  {/* COMO? <Icon /> com coloração mudando baseado no mesmo ternário isActive com Tailwind transition. */}
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  
                  {/* O QUE É? Nome Humano a ser Lidado (O Label). */}
                  {/* ONDE? Pós ícone. */}
                  {/* QUANDO? Para humanos identificarem os desenhos técnicos do ícone. */}
                  {/* PQ? Acessibilidade e compreensão limpa. */}
                  {/* COMO? Um texto Span que brilha no hover caso não esteja ativo, e é sólido caso ativado. */}
                  <span className={`font-medium tracking-wide transition-all duration-300 ${isActive ? 'text-indigo-100' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {item.label}
                  </span>
                </div>

                {/* O QUE É? Pequena Seta direita, conhecida como Chevron. */}
                {/* ONDE? Lado direito extremo do próprio Botão. */}
                {/* QUANDO? Só brilha aparecendo levemente quando o humano dá um Hover com Mouse sobre esse menu inativo. */}
                {/* PQ? Adiciona dinamicidade, mostra uma dica que "clique em mim para ir avante". */}
                {/* COMO? Lucide <ChevronRight/> recebendo transform rotate zero ou deslocando `translate-x` durante o Hover CSS 'group-hover'. */}
                <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-indigo-500 opacity-100' : 'text-slate-600 opacity-0 group-hover:opacity-50 group-hover:translate-x-1'}`} />
              </button>
            );
          })}
        </div>

        {/* O QUE É? A zona de rodapé do menu esquerdo (Módulo de Perfil do Corretor). */}
        {/* ONDE? Parte inferior final do container de barra lateral (Nav). */}
        {/* QUANDO? Sempre fixado no pé desse elemento flex por causa do 'justify-between'. */}
        {/* PQ? O usuário em uso contínuo sempre precisa ver rapidamente com quem está logado ou se desconectar. */}
        {/* COMO? Outra Div com paddings de segurança. */}
        <div className="p-6 border-t border-white/5">
          {/* O QUE É? Pílula Glassmórfica exibindo "Fulano". */}
          {/* ONDE? Aninhado direto no encapsulador de flex do rodapé. */}
          {/* QUANDO? Fixado eternamente no fim do viewport esquerdo para fechar bem a visão estética de coluna contínua. */}
          {/* PQ? Adiciona mais uma profundidade e camadas, demonstrando "premium" visual no botão de profile. */}
          {/* COMO? Div border-white/10, flex items-center com Hover effect p/ escala 'hover:scale-[1.02]'. */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 cursor-pointer transition-all">
            
            {/* O QUE É? Foto Perfil Mockup. */}
            {/* ONDE? Lado esquerdo da Pílula. */}
            {/* QUANDO? Carrega como Avatar. */}
            {/* PQ? Avatares dão muita personalidade à aplicação de sistema. */}
            {/* COMO? Container Circular com gradiente rosa e roxo como Placeholder e iniciais ou icone. */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-white tracking-widest">DR</span>
            </div>
            
            {/* O QUE É? Dados Pessoais. */}
            {/* ONDE? Após Avatar da Pílula. */}
            {/* QUANDO? Para leitura rápida de Identidade logada. */}
            {/* PQ? Organização UI - título forte, subtitulo discreto. */}
            {/* COMO? Coluna de dois textos empilhados, leading-tight para manter próximos em espaçamento de linha. */}
            <div className="flex-col hidden sm:flex">
                <span className="text-sm font-semibold text-slate-200 leading-tight">Diego Roldan</span>
                <span className="text-xs text-indigo-400 font-medium">Corretor Prime</span>
            </div>
          </div>
        </div>
      </nav>

      {/* =============================================================================================== */}
      {/* O QUE É? A COLUNA DA DIREITA GIGANTE: Palco do Conteúdo Mágico. */}
      {/* ONDE? Ocupando a vastidão total à direita. */}
      {/* QUANDO? Pega toda a fração restante do espaço lateral baseando em seu class flex-1. */}
      {/* PQ? Onde de fato as métricas, cartões e mapas surpreendentes aparecem, correspondendo à aba clicada ali na esquerda. */}
      {/* COMO? Tag Main do HTML5 '<main>', 'flex-1', 'relative', 'overflow-y-auto', e paddings absurdos generosos ('p-8 md:p-12'). */}
      <main className="flex-1 relative z-10 flex flex-col overflow-y-auto hidden-scrollbar">
        
        {/* O QUE É? TopBar superior da área fluida direita. */}
        {/* ONDE? O primeiro bloco do Main, topo. */}
        {/* QUANDO? Usado de cabeçalho auxiliar para pesquisas genéricas globais e alertas imponentes. */}
        {/* PQ? Deixa o design balanceado. A navegação pesada fica esquerda, e aqui em cima fica a utilidade rápida leve (busca). */}
        {/* COMO? 'flex justify-between items-center mb-12' - separando totalmente o grupo Buscar do grupo Sinos de notificação, com espaçamento forte embaixo (mb). */}
        <header className="flex justify-between items-center w-full mt-6 px-10">
          
          {/* O QUE É? Campo de Busca Flutuante tipo Barra de Sistema Mac OS (Spotlight). */}
          {/* ONDE? Lado Esquerdo do header principal do palco. */}
          {/* QUANDO? O Corretor precisa procurar um lead imediatamente com seu número ou e-mail. */}
          {/* PQ? Em sistemas Premium, não usamos Search Box cafonas. Usamos Glass inputs redondos e fundidos ao fundo. */}
          {/* COMO? Container de Form Flex, border branca muito fraca 5%, blur forte e o clássico outline-none para não criar borda feia quando se digita. */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md w-96 shadow-lg focus-within:ring-2 ring-indigo-500/50 transition-all">
            <Search className="w-5 h-5 text-slate-400" />
            
            {/* O QUE É? O Local onde efetivamente as letras digitadas moram. */}
            {/* ONDE? Pós Ícone da lupa no botão do header. */}
            {/* QUANDO? Usuário engaja o foco na lupa. */}
            {/* PQ? Precisamos de tag HTML para a interface InputTypeText. */}
            {/* COMO? Input html simples, cor preenchida (bg-transparent) e texto claro em sua essência. */}
            <input 
              type="text" 
              placeholder="Pesquisar apartamentos, leads, bairros..." 
              className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500 w-full font-medium"
            />
          </div>

          {/* O QUE É? Ferramentas Sociais Instantâneas (sino de alerts e afins). */}
          {/* ONDE? Lado extremar direito do Main content do Topo. */}
          {/* QUANDO? Notificar novo possível interessado em casa. */}
          {/* PQ? Balanceia visual do Input Busca para o outro canto, e tem apelo útil. */}
          {/* COMO? Flex gap-4 padrão, bolinha vermelha para ping de notificação via CSS Absolute. */}
          <div className="flex gap-4">
            <button className="relative p-3 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md hover:bg-slate-800 transition-all text-slate-300 hover:text-white group">
              <Bell className="w-5 h-5" />
              {/* O QUE É? Bolinha Vermelha do Sino. Essa bolinha é muito Premium! */}
              {/* ONDE? Canto superiordireito flutuante sobre o sino. */}
              {/* QUANDO? Se há novas mensagens não testadas. */}
              {/* PQ? Psicologia do usuário: Coisas vermelhas nos cantos causam desejo louco de clicar. */}
              {/* COMO? Tag em Absolute, w-2 h-2, bg-red-500 redondinha e 'animate-pulse' para piscar respirando. */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse blur-[1px]"></span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* O QUE É? O Núcleo Injetivo que Troca de Páginas Visualmente (Conteúdos Reais). */}
        {/* ONDE? Na barriga imensa da "Main". */}
        {/* QUANDO? Muda de imediato em transições tão logo o React avalie a troca do state 'activeTab'. */}
        {/* PQ? Onde todo Dashboard ganha vida analítica (Cartões com dados). */}
        {/* COMO? Renderização Condicional baseada na const 'activeTab', paddings internos fluidos. */}
        <div className="flex-1 w-full p-10 mt-4 overflow-y-auto hidden-scrollbar pb-24">
          
          {/* O QUE É? Exemplo 1 (O default): Panorama Espacial / Dashboard. */}
          {/* ONDE? Ancorado base no render quando `activeTab === 'dashboard'`. */}
          {/* QUANDO? Rota Padrão. */}
          {/* PQ? Para ele ver tudo o macro, precisa de colunas grandes (grid), lucros e matches diários de imoveis e corretores lado a lado. */}
          {/* COMO? Lógica ternária ou de &&. */}
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 w-full max-w-7xl mx-auto space-y-8">
              
              {/* O QUE É? Mensagem Bom dia e Saudação principal do palco. */}
              {/* ONDE? Topo interno do conteúdo "Panorama". */}
              {/* QUANDO? Toda hora, bem massivo. */}
              {/* PQ? Empatia e UX. Chama o corretor ou a tela pelo titulo poético do cargo ou meta global. */}
              {/* COMO? Flex col, title gigante transparente com gradient, subtitulo acoplado discreto. */}
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-extrabold tracking-tight">
                  <span className="text-white">Seu Império </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-indigo-400">Em Números</span>
                </h1>
                <p className="text-slate-400 font-medium tracking-wide mt-2">Visão neural e holística de todos os matches estelares desta semana. Continue faturando.</p>
              </div>

              {/* O QUE É? Grid Cards Informativos e Deslumbrantes (Topo Stats Rápidos). */}
              {/* ONDE? Um sanduíche sob a Saudação, como uma esteira de peças LEGO de blocos horizontais. */}
              {/* QUANDO? Pra mostrar que as ações de vendas são incríveis. */}
              {/* PQ? Ninguém quer ler tabela chata, eles querem ler blocos com neons subindo sobre performance! */}
              {/* COMO? Div configurada por Tailwind Grid 'grid-cols-1 md:grid-cols-3' e Gap. Criaremos 3 cards brutais de CSS. */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                
                {/* O QUE É? Card de Meta/Faturamento (Card 1). */}
                {/* ONDE? Primeiro no GRID. */}
                {/* QUANDO? Mostra o total absoluto de negociações atuais ou Leads. */}
                {/* PQ? Card importante exige cor vibrante e impacto central. Vamos usar cor purpura/indigo para esse 'Matchs Concluídos'. */}
                {/* COMO? Divs relativas, border-white/5, gradientes que interagem no hover. */}
                <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:bg-slate-900/60 transition-all duration-500">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
                        <Zap className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-1 text-emerald-400 text-sm font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <TrendingUp className="w-4 h-4" /> +12.5%
                      </span>
                    </div>
                    <div>
                      <h3 className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Matches Recentes Mágicos</h3>
                      <p className="text-4xl font-bold text-white tracking-tight">3,492 <span className="text-xl text-indigo-400/50 -ml-1">pts</span></p>
                    </div>
                  </div>
                </div>

                {/* O QUE É? Card de Visitas ou Engajamentos (Card 2). */}
                {/* ONDE? Elemento Central no GRID 3x1. */}
                {/* QUANDO? Visor prático. */}
                {/* PQ? O Imóvel Match precisa saber quantos estão visitando os anúncios e perfis. */}
                {/* COMO? Mesma estrutra Glass com gradientes que piscam em azul Frio 'cyan'. */}
                <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:bg-slate-900/60 transition-all duration-500">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                        <Users className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Tráfego Ocular nas Propriedades</h3>
                      <p className="text-4xl font-bold text-white tracking-tight">854 <span className="text-xl text-cyan-400/50 -ml-1">views/h</span></p>
                    </div>
                  </div>
                </div>

                {/* O QUE É? Card de Imóveis no portfólio luxuoso (Card 3). */}
                {/* ONDE? Posição 3 do Grid. */}
                {/* QUANDO? Mostrando o catálogo que o sistema detém e processa diariamente. */}
                {/* PQ? Porque é vital quantificar as propriedades premium catalogadas. */}
                {/* COMO? Glass UI com Fúcsia 'Fuchsia' / 'Rose' vibe de luxo. */}
                <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 p-7 rounded-3xl hover:bg-slate-900/60 transition-all duration-500">
                  <div className="absolute -inset-2 bg-gradient-to-r from-fuchsia-500 to-pink-600 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500"></div>
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20 text-fuchsia-400">
                        <Building className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-1 text-amber-400 text-sm font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        <Sparkles className="w-4 h-4" /> Top Tier
                      </span>
                    </div>
                    <div>
                      <h3 className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Imóveis Ativos na Constelação</h3>
                      <p className="text-4xl font-bold text-white tracking-tight">120 <span className="text-xl text-fuchsia-400/50 -ml-1">unidades</span></p>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* O QUE É? Section Enorme Inferior Central de Gráfico / Área de Atividades. */}
              {/* ONDE? Depois da área rápida (Grid), tomando área ampla pra quebrar layout com um bloco largo (row span largo). */}
              {/* QUANDO? Para simular uma área robusta de insights em mapa ou listagem imersiva de feed. */}
              {/* PQ? O usuário pediu layout surpreendente! Vamos colocar um "Feed Holográfico de Últimos Matches". */}
              {/* COMO? Flexbox col, fundo glass fosco, border forte, border-radius maior ('rounded-[2.5rem]'). */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                 {/* O QUE É? Coluna Larga (Grafico ou Imagens imponentes). Ocupa 2/3 da largura */}
                 {/* ONDE? Início do Grid inferiorm col-span-2. */}
                 {/* QUANDO? Espaço principal do layout de tela para exibir foto do imóvel que mais teve match agora pouco. */}
                 {/* PQ? Visual é essencial no ramo imobiliário. Mostrar um banner luxuoso e abstrato causa êxtase ocular. */}
                 {/* COMO? bg-cover, gradients, classes absolute e relative. */}
                 <div className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] p-8 border border-white/5 bg-slate-900 group min-h-[400px] flex flex-col justify-end shadow-2xl shrink-0">
                    {/* O QUE É? Imagem Fotográfica arquitetônica no Fundo Puxada via CSS ou Renderizada com Image(ou img pura). */}
                    {/* ONDE? Fundo absoluto no Container largo. */}
                    {/* QUANDO? Renderização visual. */}
                    {/* PQ? Efeito WOW na UI. */}
                    {/* COMO? Tag em Absolute Object-Cover com um link placeholder de alta qualidade. Adicionei Overlays de escuro. */}
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" alt="Mansion Neo" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-70" />
                    
                    {/* O QUE É? A Película Obscura sobre a foto (Overlay Gradient). */}
                    {/* ONDE? Entre a foto e os Letreiros ali. */}
                    {/* QUANDO? Injeção nativa de UI sobreposto. */}
                    {/* PQ? Para o texto Branco não sumir na claridade fota original da casa clara. Acessibilidade vs Beleza. */}
                    {/* COMO? 'absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent' */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent"></div>
                    
                    {/* O QUE É? Container dos textos que voam lá da parte de baixo dessa foto. */}
                    {/* ONDE? Zona Relative Index de Cima p/ ficar fora da imagem escura. */}
                    {/* QUANDO? Excepcional momento visual de UI. */}
                    {/* PQ? Dados contextuais agregam valor a imagem puramente bela. */}
                    {/* COMO? Relative z-10 flex container. */}
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-4">
                        <Rocket className="w-4 h-4 text-fuchsia-400" /> Hot Match do Dia
                      </span>
                      <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Mansão Aurora Neo-Minimalista</h2>
                      <div className="flex items-center gap-6 text-slate-300">
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-400" /> Beverly Hills do Sul, SP</span>
                        <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-rose-400" /> 24 Matches em Fila</span>
                      </div>
                    </div>
                 </div>

                 {/* O QUE É? O Cartão Magro Lateral na Direita Final (Feed Real-Time). */}
                 {/* ONDE? Posição col-span-1 na coluna 3/3 do grid. */}
                 {/* QUANDO? Interação contínua simulada (pessoas entrando online vendo casas). */}
                 {/* PQ? Deixa o Dashboard com sentimento de "vida rodando" por trás "vívido". */}
                 {/* COMO? Fundo cinza liso fosco, border, flex-col. */}
                 <div className="lg:col-span-1 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col shadow-2xl">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                      <Activity className="text-indigo-500 w-5 h-5" /> Live Radar
                    </h3>
                    
                    {/* O QUE É? Loop de items de chatzinho / Live Activity. */}
                    {/* ONDE? Interno da Coluninha Atividades. */}
                    {/* QUANDO? Fills a tela de texto rápido pra ver status. */}
                    {/* PQ? Mostra que o algoritmo Match tá funcionando e unindo Locatário a Locador/Imóvel. */}
                    {/* COMO? Múltiplas divisões com icones pequninos e bordas flexiveis (border-b ou flex gap). */}
                    <div className="flex flex-col gap-5 flex-1">
                      
                      {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="flex gap-4 items-start group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded-2xl transition-all">
                          {/* O QUE É? Icone Simbólico Perfil Redondo. */}
                          <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${idx === 0 ? 'bg-indigo-500/20 text-indigo-400' : idx === 1 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                             {idx === 0 ? <Zap className="w-5 h-5"/> : idx === 1 ? <Heart className="w-5 h-5"/> : <Users className="w-5 h-5"/>}
                          </div>
                          {/* O QUE É? Box Textual explicativo sobre o Match. */}
                          <div>
                            <p className="text-sm text-slate-200 font-medium group-hover:text-white transition-colors">
                              {idx === 0 ? 'Super-Match Criado!' : idx === 1 ? 'Cliente adicionou aos Favoritos' : 'Novo corretor afiliado'}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Faz {idx * 12 + 2} minutos - Setor Sul</p>
                          </div>
                        </div>
                      ))}

                    </div>
                 </div>

              </div>
              
            </div>
          )}

          {/* O QUE É? Tela de Fallback caso escolha outra aba que ainda no foi construída no código gigante. */}
          {/* ONDE? Lógica Else Implícita (Quando 'activeTab' não é 'dashboard'). */}
          {/* QUANDO? Usuário clica em 'Imóveis', 'Clientes' etc do menu esquerdo. */}
          {/* PQ? Pra não quebrar ou dar tela branca, mostra uma transição bonita com Blur com mensagem de Work In Progress. */}
          {/* COMO? Renderização condicional `activeTab !== 'dashboard'`. */}
          {activeTab !== 'dashboard' && (
            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center h-full w-full opacity-80 mt-20">
              <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <Rocket className="w-12 h-12 text-slate-500" />
              </div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500 mb-2">Módulo Focado</h2>
              <p className="text-slate-500 max-w-md text-center font-medium">A interface de "{menuItems.find(x => x.id === activeTab)?.label}" abrirá com este exato padrão de excelência geométrica no modelo definitivo.</p>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
