// ============================================
// 🔧 PROVIDERS: providers.tsx
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Agrupa todos os providers (contextos) do app.
//
// 📚 ANALOGIA: CENTRAL DE SERVIÇOS 🏢
// - React Query = Gerente de cache de API
// - Toast = Sistema de notificações
// - Auth = Portaria (autenticação)
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// - Centralizar providers em um lugar
// - Evitar poluir layout.tsx
// - Fácil adicionar novos providers
//
// ⏰ QUANDO É USADO?
// - Envolve todo o app no layout.tsx
// - Renderizado no cliente ('use client')
// ============================================

'use client';

// 📦 ONDE: Importa React
// 🎯 O QUE: Biblioteca React
// 🤔 POR QUÊ: Criar componentes
import { ReactNode } from 'react';

// 📦 ONDE: Importa React Query
// 🎯 O QUE: QueryClient e Provider
// 🤔 POR QUÊ: Cache de requisições HTTP
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 📦 ONDE: Importa Toast (notificações)
// 🎯 O QUE: Toaster component
// 🤔 POR QUÊ: Mostrar mensagens de sucesso/erro
import { Toaster } from 'react-hot-toast';

// ========================================
// 🔧 CONFIGURAÇÃO DO REACT QUERY
// ========================================
// 🎯 O QUE: Cria instância do QueryClient
// 📚 COMO: new QueryClient com configs
// 🤔 POR QUÊ: Gerenciar cache de API
// ⏰ QUANDO: Ao iniciar o app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ⏱️ Stale time (tempo até considerar dados velhos)
      // 🎯 O QUE: 5 minutos
      // 📚 COMO: 5 * 60 * 1000 ms
      // 🤔 POR QUÊ: Reduzir requisições desnecessárias
      staleTime: 5 * 60 * 1000,
      
      // 🔄 Refetch on window focus
      // 🎯 O QUE: Atualiza ao voltar pra aba
      // 📚 COMO: true/false
      // 🤔 POR QUÊ: Dados sempre atualizados
      refetchOnWindowFocus: false,
      
      // 🔁 Retry (tentar novamente em caso de erro)
      // 🎯 O QUE: Número de tentativas
      // 📚 COMO: 1 tentativa
      // 🤔 POR QUÊ: Não insistir muito em erros
      retry: 1,
    },
  },
});

/**
 * 🏗️ COMPONENT: Providers
 * 
 * 🎯 O QUE FAZ? Envolve app com todos os providers.
 * 📚 COMO? QueryClientProvider + Toaster.
 * 📍 ONDE? Usado no layout.tsx raiz.
 * 🤔 POR QUÊ? Centralizar contextos globais.
 * ⏰ QUANDO? Sempre que o app renderiza.
 * 
 * @param children - Componentes filhos (app inteiro)
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    // ========================================
    // 🔍 REACT QUERY PROVIDER
    // ========================================
    // 🎯 O QUE: Fornece QueryClient para toda a árvore
    // 📚 COMO: QueryClientProvider com client
    // 🤔 POR QUÊ: Hooks useQuery/useMutation funcionarem
    // ⏰ QUANDO: Sempre
    <QueryClientProvider client={queryClient}>
      {/* ========================================
          📦 CHILDREN (Conteúdo do app)
          ======================================== */}
      {/* 🎯 O QUE: Todo o app */}
      {/* 📚 COMO: Renderiza páginas */}
      {/* 🤔 POR QUÊ: Estrutura do Next.js */}
      {children}
      
      {/* ========================================
          🔔 TOASTER (Notificações)
          ======================================== */}
      {/* 🎯 O QUE: Container de toasts */}
      {/* 📚 COMO: Mostra notificações flutuantes */}
      {/* 🤔 POR QUÊ: Feedback visual ao usuário */}
      {/* ⏰ QUANDO: toast.success(), toast.error() */}
      <Toaster
        position="top-right"
        toastOptions={{
          // ⏱️ Duração padrão
          // 🎯 O QUE: 4 segundos
          // 🤔 POR QUÊ: Tempo suficiente pra ler
          duration: 4000,
          
          // 🎨 Estilos customizados
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
          
          // ✅ Toast de sucesso
          success: {
            iconTheme: {
              primary: 'hsl(var(--success))',
              secondary: 'white',
            },
          },
          
          // ❌ Toast de erro
          error: {
            iconTheme: {
              primary: 'hsl(var(--error))',
              secondary: 'white',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
