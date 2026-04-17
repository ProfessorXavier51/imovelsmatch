// ============================================
// 🌐 API CLIENT: api.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Cliente HTTP para comunicação com o backend.
//
// 📚 ANALOGIA: CARTEIRO 📬
// - Leva mensagens (requests) pro backend
// - Traz respostas (responses) de volta
// - Adiciona selo (token JWT) automaticamente
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// - Centralizar configuração de HTTP
// - Adicionar token JWT automaticamente
// - Tratar erros de forma consistente
// - Facilitar chamadas de API
//
// ⏰ QUANDO É USADO?
// - Em todos os hooks de API (useClientes, useImoveis)
// - Em Server Actions
// ============================================

// 📦 ONDE: Importa axios (cliente HTTP)
// 🎯 O QUE: Biblioteca para requisições HTTP
// 🤔 POR QUÊ: Mais features que fetch nativo
import axios from 'axios';

// ========================================
// 🔧 CONFIGURAÇÃO DO AXIOS
// ========================================
// 🎯 O QUE: Cria instância customizada do axios
// 📚 COMO: axios.create com baseURL e headers
// 🤔 POR QUÊ: Não repetir config em cada request
// ⏰ QUANDO: Ao importar este arquivo
const api = axios.create({
  // 🌐 Base URL (endereço do backend)
  // 🎯 O QUE: http://localhost:3001
  // 📚 COMO: Pega de variável de ambiente
  // 🤔 POR QUÊ: Não hardcodar URL
  // ⏰ QUANDO: Todas as requisições
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // ⏱️ Timeout (tempo máximo de espera)
  // 🎯 O QUE: 30 segundos
  // 📚 COMO: 30000 ms
  // 🤔 POR QUÊ: Não esperar eternamente
  timeout: 30000,
  
  // 📋 Headers padrão
  // 🎯 O QUE: Cabeçalhos HTTP
  // 📚 COMO: Content-Type, Accept
  // 🤔 POR QUÊ: Backend espera JSON
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ========================================
// 🔐 INTERCEPTOR DE REQUEST
// ========================================
// 🎯 O QUE: Adiciona token JWT antes de enviar
// 📚 COMO: Intercepta request e modifica headers
// 🤔 POR QUÊ: Autenticação automática
// ⏰ QUANDO: Antes de cada requisição
api.interceptors.request.use(
  (config) => {
    // ========================================
    // 🔍 PASSO 1: BUSCAR TOKEN
    // ========================================
    // 🎯 O QUE: Pega token do localStorage
    // 📚 COMO: localStorage.getItem('token')
    // 🤔 POR QUÊ: Token salvo no login
    // ⏰ QUANDO: Se usuário estiver logado
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('token') 
      : null;
    
    // ========================================
    // 🔍 PASSO 2: ADICIONAR TOKEN
    // ========================================
    // 🎯 O QUE: Adiciona token no header
    // 📚 COMO: Authorization: Bearer <token>
    // 🤔 POR QUÊ: Backend valida JWT
    // ⏰ QUANDO: Se token existir
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // ========================================
    // 🔍 PASSO 3: RETORNAR CONFIG
    // ========================================
    // 🎯 O QUE: Retorna config modificada
    // 📚 COMO: return config
    // 🤔 POR QUÊ: Axios precisa da config
    return config;
  },
  (error) => {
    // ❌ Erro ao preparar request
    // 🎯 O QUE: Rejeita promise
    // 📚 COMO: Promise.reject
    // 🤔 POR QUÊ: Propagar erro
    return Promise.reject(error);
  }
);

// ========================================
// 📥 INTERCEPTOR DE RESPONSE
// ========================================
// 🎯 O QUE: Trata respostas e erros
// 📚 COMO: Intercepta response
// 🤔 POR QUÊ: Tratamento centralizado de erros
// ⏰ QUANDO: Após cada requisição
api.interceptors.response.use(
  (response) => {
    // ========================================
    // ✅ SUCESSO (2xx)
    // ========================================
    // 🎯 O QUE: Retorna dados da resposta
    // 📚 COMO: response.data
    // 🤔 POR QUÊ: Simplificar uso (não precisa .data)
    return response;
  },
  (error) => {
    // ========================================
    // ❌ ERRO (4xx, 5xx)
    // ========================================
    // 🎯 O QUE: Trata erros de forma consistente
    // 📚 COMO: Verifica status code
    // 🤔 POR QUÊ: Feedback ao usuário
    
    if (error.response) {
      // 🔍 Erro com resposta do servidor
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // 🔐 Não autorizado
          // 🎯 O QUE: Token inválido ou expirado
          // 📚 COMO: Redireciona para login
          // 🤔 POR QUÊ: Usuário precisa logar novamente
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // 🚫 Proibido
          // 🎯 O QUE: Sem permissão
          // 📚 COMO: Mostra mensagem
          // 🤔 POR QUÊ: Informar usuário
          console.error('Acesso negado:', data.message);
          break;
          
        case 404:
          // 🔍 Não encontrado
          // 🎯 O QUE: Recurso não existe
          // 📚 COMO: Mostra mensagem
          // 🤔 POR QUÊ: Informar usuário
          console.error('Recurso não encontrado:', data.message);
          break;
          
        case 500:
          // 💥 Erro do servidor
          // 🎯 O QUE: Erro interno
          // 📚 COMO: Mostra mensagem genérica
          // 🤔 POR QUÊ: Não expor detalhes técnicos
          console.error('Erro no servidor. Tente novamente mais tarde.');
          break;
      }
    } else if (error.request) {
      // 📡 Erro de rede (sem resposta)
      // 🎯 O QUE: Servidor não respondeu
      // 📚 COMO: Timeout ou offline
      // 🤔 POR QUÊ: Informar problema de conexão
      console.error('Erro de conexão. Verifique sua internet.');
    } else {
      // ⚠️ Erro ao configurar request
      // 🎯 O QUE: Erro antes de enviar
      // 📚 COMO: Problema no código
      // 🤔 POR QUÊ: Debug
      console.error('Erro:', error.message);
    }
    
    // ========================================
    // 🔍 RETORNAR ERRO
    // ========================================
    // 🎯 O QUE: Propaga erro para quem chamou
    // 📚 COMO: Promise.reject
    // 🤔 POR QUÊ: Permitir tratamento específico
    return Promise.reject(error);
  }
);

// ========================================
// 📤 EXPORTAR CLIENTE
// ========================================
// 🎯 O QUE: Exporta instância configurada
// 📚 COMO: export default api
// 🤔 POR QUÊ: Usar em outros arquivos
// ⏰ QUANDO: import api from '@/lib/api'
export default api;

// ========================================
// 📚 EXEMPLOS DE USO
// ========================================
//
// ✅ GET (buscar dados):
// const response = await api.get('/clientes');
// const clientes = response.data;
//
// ✅ POST (criar):
// const response = await api.post('/clientes', {
//   nome: 'João Silva',
//   email: 'joao@gmail.com',
// });
//
// ✅ PATCH (atualizar):
// const response = await api.patch('/clientes/123', {
//   nome: 'João Santos',
// });
//
// ✅ DELETE (deletar):
// await api.delete('/clientes/123');
//
// ✅ Com React Query:
// const { data } = useQuery({
//   queryKey: ['clientes'],
//   queryFn: () => api.get('/clientes').then(res => res.data),
// });
//
// ============================================
