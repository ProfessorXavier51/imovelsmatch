// ============================================
// 📦 LAYOUT: admin/layout.tsx
// ============================================
// 🎯 O QUE? Layout compartilhado para todas as páginas admin
// 🤔 POR QUÊ? Sidebar persistente, tema global, navegação SPA sem reload
// 📚 COMO? Next.js Layout Pattern + Context para tema
// ============================================

'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, Building, Zap, BarChart3, Settings,
  LogOut, ShieldCheck, Sun, Moon, Menu, X, Handshake, Clock
} from 'lucide-react';
import Swal from 'sweetalert2';

// ============================================
// 🎯 CONTEXT: TEMA (Dark/Light)
// ============================================
interface TemaContextType {
  tema: 'dark' | 'light';
  toggleTema: () => void;
}

const TemaContext = createContext<TemaContextType>({
  tema: 'dark',
  toggleTema: () => {}
});

export const useTema = () => useContext(TemaContext);

// ============================================
// 🏗️ COMPONENTE LAYOUT ADMIN
// ============================================
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [tema, setTema] = useState<'dark' | 'light'>('dark');
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [carregando, setCarregando] = useState(true);

  // ========================================
  // 🎯 USEEFFECT: VERIFICAR AUTH E TEMA
  // ========================================
  useEffect(() => {
    // 🎯 Verifica autenticação
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // 🎯 Carrega tema salvo
    const temaSalvo = localStorage.getItem('admin-tema') as 'dark' | 'light';
    if (temaSalvo) {
      setTema(temaSalvo);
    }

    setCarregando(false);

    // 🎯 Timeout de segurança: máximo 3 segundos
    const timeout = setTimeout(() => setCarregando(false), 3000);
    return () => clearTimeout(timeout);
  }, [router]);

  // ========================================
  // 🎯 FUNÇÃO: TOGGLE TEMA
  // ========================================
  const toggleTema = () => {
    const novoTema = tema === 'dark' ? 'light' : 'dark';
    setTema(novoTema);
    localStorage.setItem('admin-tema', novoTema);
  };

  // ========================================
  // 🎯 FUNÇÃO: LOGOUT
  // ========================================
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Encerrar sessão?',
      text: 'Você será desconectado do sistema.',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      router.push('/admin/login');
    }
  };

  // ========================================
  // 🎯 DEFINIÇÃO DO MENU
  // ========================================
  const menuItems = [
    { id: '/admin/dashboard', label: 'Panorama', icon: LayoutDashboard },
    { id: '/admin/clientes', label: 'Gestão de Clientes', icon: Users },
    { id: '/admin/imoveis', label: 'Inventário', icon: Building },
    { id: '/admin/matches', label: 'Conexões IA', icon: Zap },
    { id: '/admin/negociacoes', label: 'Negociações', icon: Handshake },
    { id: '/admin/atividades', label: 'Atividades', icon: Clock },
    { id: '/admin/relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: '/admin/configuracoes', label: 'Configurações', icon: Settings },
  ];

  // ========================================
  // 🎯 RENDERIZAÇÃO: LOADING
  // ========================================
  if (carregando) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        tema === 'dark' ? 'bg-[#0a0a0f]' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4 ${
            tema === 'dark' ? 'border-blue-500' : 'border-blue-600'
          }`}></div>
          <p className={tema === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // 🎯 RENDERIZAÇÃO: LAYOUT COMPLETO
  // ========================================
  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      <div className={`min-h-screen flex ${tema === 'dark' ? 'bg-[#0a0a0f]' : 'bg-gray-50'}`}>
        
        {/* ========================================
            SIDEBAR (MENU LATERAL)
        =========================================*/}
        <aside className={`${sidebarAberta ? 'w-64' : 'w-20'} ${
          tema === 'dark' 
            ? 'bg-slate-900/95 border-r border-white/5' 
            : 'bg-white border-r border-gray-200'
        } transition-all duration-300 flex flex-col fixed h-full z-50`}>
          
          {/* Logo */}
          <div className={`p-6 border-b ${
            tema === 'dark' ? 'border-white/5' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              {sidebarAberta && (
                <div>
                  <p className={`font-bold ${tema === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ImoveisMatch
                  </p>
                  <p className={`text-xs ${tema === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    ADMIN CENTRAL
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Botão Toggle Sidebar */}
          <button
            onClick={() => setSidebarAberta(!sidebarAberta)}
            className={`absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center ${
              tema === 'dark' 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-600 text-white'
            }`}
          >
            {sidebarAberta ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
          </button>

          {/* Menu de Navegação */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isAtivo = pathname === item.id;
              
              return (
                <Link
                  key={item.id}
                  href={item.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isAtivo 
                      ? (tema === 'dark' 
                          ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
                          : 'bg-blue-50 border border-blue-200 text-blue-600')
                      : (tema === 'dark'
                          ? 'text-slate-400 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                  } ${sidebarAberta ? '' : 'justify-center'}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarAberta && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                  {/* Indicador de ativo (ponto azul) */}
                  {isAtivo && sidebarAberta && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Rodapé: Tema + Logout */}
          <div className={`p-4 border-t ${
            tema === 'dark' ? 'border-white/5' : 'border-gray-200'
          }`}>
            {/* Toggle Tema */}
            <button
              onClick={toggleTema}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl mb-2 transition-colors ${
                tema === 'dark'
                  ? 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10'
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
              } ${sidebarAberta ? '' : 'justify-center'}`}
            >
              {tema === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {sidebarAberta && (
                <span className="text-sm font-medium">
                  {tema === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                </span>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                tema === 'dark'
                  ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              } ${sidebarAberta ? '' : 'justify-center'}`}
            >
              <LogOut className="w-5 h-5" />
              {sidebarAberta && <span className="text-sm font-medium">Sair</span>}
            </button>
          </div>
        </aside>

        {/* ========================================
            CONTEÚDO PRINCIPAL
        =========================================*/}
        <main className={`flex-1 ${sidebarAberta ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
          {/* Header Mobile */}
          <header className={`lg:hidden p-4 flex items-center justify-between ${
            tema === 'dark' ? 'bg-slate-900/95' : 'bg-white'
          }`}>
            <p className={`font-bold ${tema === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              ImoveisMatch
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTema}
                className={`p-2 rounded-lg ${
                  tema === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                {tema === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setSidebarAberta(!sidebarAberta)}
                className={`p-2 rounded-lg ${
                  tema === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Área de conteúdo das páginas */}
          <div className={tema === 'dark' ? 'text-slate-200' : 'text-gray-900'}>
            {children}
          </div>
        </main>
      </div>
    </TemaContext.Provider>
  );
}
