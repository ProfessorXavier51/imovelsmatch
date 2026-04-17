// ============================================
// 📦 PAGE: admin/login/page.tsx
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Página de login do dashboard admin.
//
// 📚 ANALOGIA: PORTARIA DO PRÉDIO 🔐
// - Verifica credenciais
// - Libera acesso ao admin
// - Redireciona para dashboard
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// - Proteger área administrativa
// - Autenticar usuário
// - Gerar token JWT
//
// ⏰ QUANDO É USADO?
// - Ao acessar /admin/login
// - Antes de acessar dashboard
// ============================================

'use client';

// ============================================
// 📦 IMPORTAÇÕES
// ============================================

// 📦 ONDE: Biblioteca React (frontend)
// 🎯 O QUE: Hook useState para criar variáveis que "lembram" valores
// 🤔 POR QUÊ: Precisamos guardar email, senha, erro e loading do formulário
// 📚 COMO: useState retorna [valor, funcaoParaMudar] - tipo variável mágica
// ⏰ QUANDO: Toda vez que o componente renderiza/renderiza de novo
import { useState, useEffect } from 'react';

// 📦 ONDE: Next.js (framework React)
// 🎯 O QUE: Hook useRouter para controlar navegação entre páginas
// 🤔 POR QUÊ: Após login bem-sucedido, precisamos redirecionar usuário
// 📚 COMO: router.push('/caminho') = "vai pra essa página"
// ⏰ QUANDO: Quando queremos mudar de tela programaticamente
import { useRouter } from 'next/navigation';

// 📦 ONDE: Nosso arquivo lib/api.ts (cliente HTTP configurado)
// 🎯 O QUE: Cliente Axios já configurado com URL base e interceptores
// 🤔 POR QUÊ: Axios é mais seguro que fetch nativo - tem timeout, interceptores, tratamento de erro
// 📚 COMO: api.post('/rota', dados) → envia POST para http://localhost:3001/rota
// ⏰ QUANDO: Toda comunicação com backend usa este cliente
import api from '@/lib/api';

// 📦 ONDE: Biblioteca sweetalert2 (npm install sweetalert2)
// 🎯 O QUE: Biblioteca de alertas/modais bonitos e profissionais
// 🤔 POR QUÊ: Alert nativo do browser é feio e não dá controle de estilo
// 📚 COMO: Swal.fire({icon: 'error', title: 'Ops!', text: 'mensagem'})
// ⏰ QUANDO: Quando queremos mostrar feedback visual ao usuário
import Swal from 'sweetalert2';

/**
 * 🏗️ COMPONENT: AdminLoginPage
 * 
 * 🎯 O QUE FAZ? Página de login do admin.
 * 📚 COMO? Form com email/senha + validação.
 * 📍 ONDE? Rota /admin/login.
 * 🤔 POR QUÊ? Autenticar administrador.
 * ⏰ QUANDO? Antes de acessar dashboard.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  
  // ========================================
  // 🎯 ESTADO: CREDENCIAIS
  // ========================================
  const [credenciais, setCredenciais] = useState({
    email: '',
    senha: '',
  });

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // ========================================
  // 🎯 USEEFFECT: VERIFICAR SE JÁ ESTÁ LOGADO
  // ========================================
  // 🎯 O QUE FAZ? Verifica se existe token salvo no localStorage
  // 📍 ONDE? Ao carregar a página (mount do componente)
  // 🤔 POR QUÊ? Se usuário já logou antes, não precisa logar de novo
  // 📚 COMO? useEffect com array vazio [] = executa só uma vez no início
  // ⏰ QUANDO? Quando componente é montado (usuário entra na página)
  useEffect(() => {
    // 🎯 O QUE? Pega token do localStorage
    // 🤔 POR QUÊ? Se existe token, usuário já está autenticado
    const token = localStorage.getItem('token');

    if (token) {
      // 🎯 O QUE? Redireciona para dashboard se já tem token
      // 🤔 POR QUÊ? Não faz sentido pedir login de novo se já está logado
      router.push('/admin/dashboard');
    }
  }, [router]); // 📚 COMO? [router] = dependências - se router mudar, re-executa

  // ========================================
  // 🎯 FUNÇÃO: FAZER LOGIN (INTEGRAÇÃO REAL COM API)
  // ========================================
  // 🎯 O QUE FAZ? Envia credenciais para backend e recebe token JWT
  // 📍 ONDE? Rota POST /auth/login do backend NestJS
  // 🤔 POR QUÊ? Precisamos validar credenciais no servidor (segurança)
  // 📚 COMO? Axios envia email/senha → Backend verifica no banco → Retorna token
  // ⏰ QUANDO? Usuário clica no botão "Entrar" (onSubmit do formulário)
  const handleLogin = async (e: React.FormEvent) => {
    // 🎯 O QUE? Previne comportamento padrão do form (recarregar página)
    // 🤔 POR QUÊ? Queremos controlar o envio com JavaScript, não deixar o browser enviar
    e.preventDefault();
    
    // 🎯 O QUE? Limpa mensagem de erro anterior
    // 🤔 POR QUÊ? Se usuário tentou antes e errou, não queremos mostrar erro velho
    setErro('');
    
    // 🎯 O QUE? Ativa estado de "carregando" (mostra spinner no botão)
    // 🤔 POR QUÊ? Feedback visual - usuário sabe que algo está acontecendo
    setCarregando(true);

    try {
      // ========================================
      // 📡 CHAMADA À API (INTEGRAÇÃO BACKEND)
      // ========================================
      // 🎯 O QUE? Envia POST para /auth/login com email e senha
      // 📍 ONDE? Backend NestJS recebe na rota AuthController.login()
      // 🤔 POR QUÊ? Backend verifica no banco de dados se usuário existe e senha bate
      // 📚 COMO? Axios converte objeto em JSON, adiciona headers, envia, espera resposta
      // ⏰ QUANDO? Agora! Execução síncrona aguarda resposta do servidor
      const response = await api.post('/auth/login', {
        // 🎯 O QUE? Email digitado pelo usuário no input
        email: credenciais.email,
        // 🎯 O QUE? Senha digitada pelo usuário (texto puro, HTTPS criptografa no transporte)
        senha: credenciais.senha,
      });

      // ========================================
      // 🎉 SUCESSO: LOGIN APROVADO
      // ========================================
      // 🎯 O QUE? Extrai token JWT da resposta do backend
      // 📍 ONDE? response.data.access_token (formato padrão JWT)
      // 🤔 POR QUÊ? Token é "passaporte" do usuário - prova que ele está autenticado
      // 📚 COMO? Backend gerou token ao verificar que email/senha estavam corretos
      const { access_token } = response.data;

      // 🎯 O QUE? Salva token no localStorage (banco de dados do browser)
      // 📍 ONDE? Armazenamento local do navegador (persiste mesmo fechando aba)
      // 🤔 POR QUÊ? Próximas requisições precisam enviar este token no header Authorization
      // 📚 COMO? localStorage.setItem('chave', 'valor') - API nativa do browser
      // ⚠️ SEGURANÇA: Token expira, não é eterno. Backend valida expiração.
      localStorage.setItem('token', access_token);

      // 🎯 O QUE? Mostra alerta de sucesso bonito
      // 🤔 POR QUÊ? Feedback positivo para usuário saber que deu certo
      await Swal.fire({
        icon: 'success',
        title: 'Login realizado!',
        text: 'Redirecionando para o dashboard...',
        timer: 1500,
        showConfirmButton: false,
      });

      // 🎯 O QUE? Redireciona usuário para dashboard admin
      // 📍 ONDE? Rota /admin/dashboard
      // 🤔 POR QUÊ? Login feito, agora mostrar área restrita
      // 📚 COMO? router.push() = navegação programática do Next.js
      router.push('/admin/dashboard');

    } catch (error: any) {
      // ========================================
      // ❌ ERRO: LOGIN FALHOU
      // ========================================
      // 🎯 O QUE? Captura erro da API (401 = não autorizado, 404 = não encontrado, etc)
      // 📍 ONDE? Bloco catch executa quando try dá erro (throw/rejeição Promise)
      // 🤔 POR QUÊ? Precisamos informar usuário que algo deu errado
      
      // 🎯 O QUE? Extrai mensagem de erro da resposta da API
      // 📍 ONDE? error.response.data.message (padrão NestJS)
      // 🤔 POR QUÊ? Backend envia mensagens amigáveis como "Credenciais inválidas"
      const mensagemErro = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';

      // 🎯 O QUE? Mostra alerta de erro com SweetAlert2
      // 🤔 POR QUÊ? Feedback visual claro do que aconteceu
      Swal.fire({
        icon: 'error',
        title: 'Erro no login',
        text: mensagemErro,
      });

      // 🎯 O QUE? Atualiza estado de erro para mostrar na tela também (abaixo do form)
      setErro(mensagemErro);

    } finally {
      // ========================================
      // 🔄 FINALMENTE: Sempre executa (sucesso ou erro)
      // ========================================
      // 🎯 O QUE? Desativa estado de carregando
      // 🤔 POR QUÊ? Esconde spinner do botão, permite nova tentativa
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
      {/* Container */}
      <div className="max-w-md w-full">
        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏠</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ImoveisMatch
            </h1>
            <p className="text-gray-600">
              Área Administrativa
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={credenciais.email}
                onChange={(e) => setCredenciais({ ...credenciais, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="admin@imoveis.com"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                required
                value={credenciais.senha}
                onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="••••••••"
              />
            </div>

            {/* Erro */}
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {erro}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {carregando ? '⏳ Entrando...' : '🔐 Entrar'}
            </button>
          </form>

          {/* Link Voltar */}
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-blue-600">
              ← Voltar para o site
            </a>
          </div>

          {/* ========================================
              🎯 SEÇÃO: CREDENCIAIS DE TESTE
              ========================================
              🎯 O QUE FAZ? Mostra credenciais padrão para testar o sistema
              📍 ONDE? Abaixo do formulário de login
              🤔 POR QUÊ? Facilitar testes sem precisar criar usuário novo
              📚 COMO? Valores fixos que já existem no banco de dados
              ⏰ QUANDO? Sempre visível para desenvolvedores/testadores
          */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              🔑 Credenciais de Teste:
            </p>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> admin@imoveis.com
            </p>
            <p className="text-sm text-blue-700">
              <strong>Senha:</strong> admin123
            </p>
            {/* 🎯 O QUE? Badge indicando integração real */}
            {/* 🤔 POR QUÊ? Saber que não é mais mock, é backend real */}
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                🟢 API Real
              </span>
              <span className="text-xs text-gray-500">
                Backend NestJS ativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
