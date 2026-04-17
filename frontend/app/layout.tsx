// ============================================
// 📦 LAYOUT: layout.tsx (Root Layout)
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Layout raiz do app Next.js (envolve todas as páginas).
//
// 📚 ANALOGIA: ESTRUTURA DA CASA 🏠
// - HTML = Fundação
// - Body = Paredes
// - Children = Móveis (conteúdo das páginas)
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// - Next.js 14 (App Router) exige layout raiz
// - Define HTML, head, body
// - Importa estilos globais
// - Configura providers (React Query, Auth)
//
// ⏰ QUANDO É USADO?
// - Em TODAS as páginas do app
// - Renderizado no servidor (SSR)
// ============================================

// 📦 ONDE: Importa React (necessário para JSX)
// 🎯 O QUE: Biblioteca React
// 🤔 POR QUÊ: Criar componentes
import type { Metadata } from 'next';

// 📦 ONDE: Importa fonte do Google Fonts
// 🎯 O QUE: Inter (fonte sans-serif moderna)
// 🤔 POR QUÊ: Tipografia bonita e legível
import { Inter } from 'next/font/google';

// 📦 ONDE: Importa estilos globais
// 🎯 O QUE: Tailwind CSS + estilos customizados
// 🤔 POR QUÊ: Estilizar todo o app
import './globals.css';

// 📦 ONDE: Importa providers (contextos)
// 🎯 O QUE: React Query, Auth, Toast
// 🤔 POR QUÊ: Compartilhar estado global
import { Providers } from '@/components/providers';

// ========================================
// 🔤 CONFIGURAÇÃO DA FONTE
// ========================================
// 🎯 O QUE: Configura fonte Inter
// 📚 COMO: Google Fonts otimizado
// 🤔 POR QUÊ: Performance (self-hosted)
// ⏰ QUANDO: Ao carregar a página
const inter = Inter({
  // 📝 Subsets (caracteres incluídos)
  // 🎯 O QUE: latin = A-Z, a-z, 0-9, símbolos
  // 🤔 POR QUÊ: Reduzir tamanho do arquivo
  subsets: ['latin'],
  
  // 📊 Pesos da fonte
  // 🎯 O QUE: 400 = normal, 500 = medium, 700 = bold
  // 🤔 POR QUÊ: Variações de peso
  weight: ['400', '500', '600', '700'],
  
  // 🎨 Variável CSS
  // 🎯 O QUE: --font-inter
  // 🤔 POR QUÊ: Usar em Tailwind (font-sans)
  variable: '--font-inter',
  
  // ⚡ Display
  // 🎯 O QUE: swap = mostra fonte fallback primeiro
  // 🤔 POR QUÊ: Performance (evita FOIT)
  display: 'swap',
});

// ========================================
// 📄 METADATA (SEO)
// ========================================
// 🎯 O QUE: Metadados da página
// 📚 COMO: title, description, icons
// 🤔 POR QUÊ: SEO e compartilhamento social
// ⏰ QUANDO: Indexação do Google, preview no WhatsApp
export const metadata: Metadata = {
  // 📝 Título da página
  // 🎯 O QUE: Aparece na aba do browser
  // 📚 COMO: "ImoveisMatch - Sistema de Matching"
  // 🤔 POR QUÊ: SEO e identificação
  title: {
    default: 'ImoveisMatch - Sistema de Matching Imobiliário',
    template: '%s | ImoveisMatch',
  },
  
  // 📝 Descrição
  // 🎯 O QUE: Descrição curta do app
  // 📚 COMO: Aparece no Google
  // 🤔 POR QUÊ: SEO
  description: 'Sistema inteligente de matching entre clientes e imóveis. Encontre o imóvel perfeito ou o cliente ideal de forma automatizada.',
  
  // 🎨 Ícones
  // 🎯 O QUE: Favicon e ícones do app
  // 📚 COMO: /favicon.ico
  // 🤔 POR QUÊ: Identidade visual
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  
  // 🌐 Open Graph (redes sociais)
  // 🎯 O QUE: Preview ao compartilhar
  // 📚 COMO: WhatsApp, Facebook, LinkedIn
  // 🤔 POR QUÊ: Compartilhamento bonito
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://imovelsmatch.com',
    siteName: 'ImoveisMatch',
    title: 'ImoveisMatch - Sistema de Matching Imobiliário',
    description: 'Sistema inteligente de matching entre clientes e imóveis.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ImoveisMatch',
      },
    ],
  },
  
  // 🐦 Twitter Card
  // 🎯 O QUE: Preview no Twitter/X
  // 📚 COMO: summary_large_image
  // 🤔 POR QUÊ: Compartilhamento bonito
  twitter: {
    card: 'summary_large_image',
    title: 'ImoveisMatch',
    description: 'Sistema inteligente de matching imobiliário',
    images: ['/og-image.png'],
  },
};

/**
 * 🏗️ COMPONENT: RootLayout
 * 
 * 🎯 O QUE FAZ? Layout raiz que envolve todas as páginas.
 * 📚 COMO? Renderiza HTML, body e providers.
 * 📍 ONDE? Usado em todas as rotas do app.
 * 🤔 POR QUÊ? Next.js 14 exige layout raiz.
 * ⏰ QUANDO? Sempre que uma página é acessada.
 * 
 * @param children - Conteúdo da página atual
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ========================================
    // 🌐 HTML (Elemento raiz)
    // ========================================
    // 🎯 O QUE: Tag HTML raiz
    // 📚 COMO: lang="pt-BR" = português
    // 🤔 POR QUÊ: Acessibilidade e SEO
    <html lang="pt-BR" suppressHydrationWarning>
      {/* ========================================
          📄 BODY (Corpo da página)
          ======================================== */}
      {/* 🎯 O QUE: Corpo do HTML */}
      {/* 📚 COMO: Aplica fonte Inter */}
      {/* 🤔 POR QUÊ: Estilizar toda a página */}
      {/* ⚠️ suppressHydrationWarning: Ignora diferenças causadas por extensões do browser */}
      <body className={inter.className} suppressHydrationWarning>
        {/* ========================================
            🔧 PROVIDERS (Contextos globais)
            ======================================== */}
        {/* 🎯 O QUE: Envolve app com providers */}
        {/* 📚 COMO: React Query, Auth, Toast */}
        {/* 🤔 POR QUÊ: Estado global e features */}
        {/* ⏰ QUANDO: Sempre */}
        <Providers>
          {/* ========================================
              📦 CHILDREN (Conteúdo da página)
              ======================================== */}
          {/* 🎯 O QUE: Conteúdo dinâmico da rota */}
          {/* 📚 COMO: Cada página renderiza aqui */}
          {/* 🤔 POR QUÊ: Sistema de rotas do Next */}
          {/* ⏰ QUANDO: Ao navegar entre páginas */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
