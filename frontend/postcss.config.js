// ============================================
// ⚙️ CONFIG: postcss.config.js
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Configura o PostCSS para processar CSS.
//
// 📚 ANALOGIA: PROCESSADOR DE CSS 🎨
// - TailwindCSS precisa do PostCSS
// - Autoprefixer adiciona prefixos de browsers
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// - TailwindCSS usa PostCSS para compilar
// - Autoprefixer garante compatibilidade
//
// ⏰ QUANDO É USADO?
// - Ao compilar CSS (npm run dev/build)
// ============================================

module.exports = {
  plugins: {
    // 🎨 TailwindCSS
    // 🎯 O QUE: Processa classes do Tailwind
    // 📚 COMO: Gera CSS final
    // 🤔 POR QUÊ: Converter classes em CSS
    tailwindcss: {},
    
    // 🔧 Autoprefixer
    // 🎯 O QUE: Adiciona prefixos de browsers
    // 📚 COMO: -webkit-, -moz-, etc
    // 🤔 POR QUÊ: Compatibilidade cross-browser
    autoprefixer: {},
  },
};
