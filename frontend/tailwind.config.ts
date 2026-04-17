// ============================================
// 🎨 CONFIG: tailwind.config.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Configura o TailwindCSS (cores, fontes, espaçamentos).
//
// 📚 ANALOGIA: PALETA DE CORES DO PINTOR 🎨
// - Define cores do sistema
// - Configura espaçamentos
// - Adiciona animações customizadas
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// - Tailwind precisa saber onde procurar classes
// - Customizar tema (cores, fontes)
// - Adicionar plugins (forms, typography)
//
// ⏰ QUANDO É USADO?
// - Ao compilar CSS
// - Ao usar classes Tailwind no código
// ============================================

import type { Config } from 'tailwindcss';

const config: Config = {
  // ========================================
  // 📁 CONTENT (Onde procurar classes)
  // ========================================
  // 🎯 O QUE: Arquivos que usam Tailwind
  // 📚 COMO: Lista de patterns (glob)
  // 🤔 POR QUÊ: Tailwind remove classes não usadas
  // ⏰ QUANDO: Ao fazer build (tree-shaking)
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // ========================================
  // 🎨 THEME (Customização do tema)
  // ========================================
  theme: {
    extend: {
      // ========================================
      // 🎨 COLORS (Cores do sistema)
      // ========================================
      // 🎯 O QUE: Paleta de cores customizada
      // 📚 COMO: Define cores primárias, secundárias
      // 🤔 POR QUÊ: Identidade visual do app
      colors: {
        // 🔵 Primary (Cor principal - Azul)
        // 🎯 O QUE: Cor primária do sistema
        // 📚 COMO: Botões, links, destaques
        // 🤔 POR QUÊ: Identidade da marca
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Cor principal
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // 🟢 Success (Verde - Sucesso)
        // 🎯 O QUE: Cor de sucesso
        // 📚 COMO: Mensagens de sucesso, confirmações
        // 🤔 POR QUÊ: Feedback visual positivo
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Cor principal
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },

        // 🔴 Error (Vermelho - Erro)
        // 🎯 O QUE: Cor de erro
        // 📚 COMO: Mensagens de erro, validações
        // 🤔 POR QUÊ: Feedback visual negativo
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Cor principal
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },

        // 🟡 Warning (Amarelo - Aviso)
        // 🎯 O QUE: Cor de aviso
        // 📚 COMO: Alertas, avisos
        // 🤔 POR QUÊ: Feedback visual de atenção
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Cor principal
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },

      // ========================================
      // 📏 SPACING (Espaçamentos)
      // ========================================
      // 🎯 O QUE: Espaçamentos customizados
      // 📚 COMO: Valores além do padrão Tailwind
      // 🤔 POR QUÊ: Layout específico do app
      spacing: {
        '18': '4.5rem',  // 72px
        '88': '22rem',   // 352px
        '128': '32rem',  // 512px
      },

      // ========================================
      // 🔤 FONT FAMILY (Fontes)
      // ========================================
      // 🎯 O QUE: Fontes customizadas
      // 📚 COMO: Define famílias de fontes
      // 🤔 POR QUÊ: Tipografia do app
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },

      // ========================================
      // 🎬 ANIMATIONS (Animações)
      // ========================================
      // 🎯 O QUE: Animações customizadas
      // 📚 COMO: Define keyframes e duração
      // 🤔 POR QUÊ: Feedback visual suave
      animation: {
        // 💫 Fade in (aparecer suavemente)
        'fade-in': 'fadeIn 0.3s ease-in-out',
        
        // 📊 Slide up (deslizar para cima)
        'slide-up': 'slideUp 0.3s ease-out',
        
        // 🔄 Spin slow (girar devagar)
        'spin-slow': 'spin 3s linear infinite',
      },

      // ========================================
      // 🎭 KEYFRAMES (Definição de animações)
      // ========================================
      // 🎯 O QUE: Define como animações funcionam
      // 📚 COMO: CSS keyframes
      // 🤔 POR QUÊ: Criar animações customizadas
      keyframes: {
        // 💫 Fade in (opacidade 0 → 1)
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        
        // 📊 Slide up (baixo → cima)
        slideUp: {
          '0%': { 
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },

      // ========================================
      // 📐 BORDER RADIUS (Arredondamento)
      // ========================================
      // 🎯 O QUE: Bordas arredondadas customizadas
      // 📚 COMO: Valores além do padrão
      // 🤔 POR QUÊ: Design system específico
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },

  // ========================================
  // 🔌 PLUGINS (Extensões do Tailwind)
  // ========================================
  // 🎯 O QUE: Plugins oficiais do Tailwind
  // 📚 COMO: @tailwindcss/forms, typography
  // 🤔 POR QUÊ: Estilos prontos para forms
  plugins: [
    // 📝 Forms (estilos para formulários)
    // 🎯 O QUE: Estiliza inputs, selects, checkboxes
    // 📚 COMO: Classes automáticas
    // 🤔 POR QUÊ: Formulários bonitos sem esforço
    require('@tailwindcss/forms'),
  ],
};

export default config;
