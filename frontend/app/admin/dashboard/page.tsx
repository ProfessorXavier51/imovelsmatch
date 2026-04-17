// ============================================
// 📦 PAGE: admin/dashboard/page.tsx
// ============================================
// 🎯 O QUE? Conteúdo do dashboard (sem layout - usa layout.tsx compartilhado)
// 🤔 POR QUÊ? Layout compartilhado evita repetição de código e reload
// 📚 COMO? Next.js Layout Pattern com sidebar persistente
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { 
  Users, Building, Zap, Plus, Search, BarChart3, ChevronRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [estatisticas, setEstatisticas] = useState({
    clientes: 0,
    imoveis: 0,
    matches: 0
  });
  const [statsDetalhadas, setStatsDetalhadas] = useState<any>(null);
  const [atividadesRecentes, setAtividadesRecentes] = useState<any[]>([]);

  // 🎯 Busca dados ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    // Busca estatísticas completas do dashboard
    const buscarDados = async () => {
      try {
        const resStats = await api.get('/dashboard/stats');
        const stats = resStats.data;
        
        setStatsDetalhadas(stats);
        setEstatisticas({
          clientes: stats?.resumo?.totalClientes || 0,
          imoveis: stats?.resumo?.totalImoveis || 0,
          matches: stats?.resumo?.totalNegociacoes || 0
        });

        // Montar atividades recentes
        const atividades = [];
        if (stats?.clientes?.novosEstaSemana > 0) {
          atividades.push({
            tipo: 'cliente',
            titulo: `${stats.clientes.novosEstaSemana} novo(s) cliente(s) esta semana`,
            icone: 'Users',
            cor: 'blue'
          });
        }
        if (stats?.imoveis?.novosEstaSemana > 0) {
          atividades.push({
            tipo: 'imovel',
            titulo: `${stats.imoveis.novosEstaSemana} novo(s) imóvel(is) esta semana`,
            icone: 'Building',
            cor: 'emerald'
          });
        }
        if (stats?.negociacoes?.novasEstaSemana > 0) {
          atividades.push({
            tipo: 'negociacao',
            titulo: `${stats.negociacoes.novasEstaSemana} nova(s) negociação(ões) esta semana`,
            icone: 'Handshake',
            cor: 'purple'
          });
        }
        
        // Se não houver atividades, mostrar mensagem padrão
        if (atividades.length === 0) {
          atividades.push(
            { tipo: 'info', titulo: 'Sistema ativo e operacional', icone: 'Activity', cor: 'slate' },
            { tipo: 'info', titulo: 'Pronto para receber novos cadastros', icone: 'Plus', cor: 'slate' }
          );
        }
        
        setAtividadesRecentes(atividades);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, [router]);

  if (carregando) {
    return (
      <div className="p-8 text-slate-200">
        <div className="animate-pulse">Carregando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8 text-slate-200">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Ambiente de Controle
        </h1>
        <p className="text-slate-400">
          Painel administrativo do ImoveisMatch
        </p>
      </header>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Clientes */}
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Clientes</p>
              <p className="text-3xl font-bold text-white">{estatisticas.clientes}</p>
            </div>
          </div>
        </div>

        {/* Imóveis */}
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Building className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Imóveis</p>
              <p className="text-3xl font-bold text-white">{estatisticas.imoveis}</p>
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Matches</p>
              <p className="text-3xl font-bold text-white">{estatisticas.matches}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          Comandos de Execução Rápida
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/clientes/novo" className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all border border-white/5">
            <Plus className="w-6 h-6 text-blue-400 mb-2" />
            <p className="font-medium text-white">Novo Cliente</p>
          </Link>

          <Link href="/admin/imoveis/novo" className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all border border-white/5">
            <Plus className="w-6 h-6 text-emerald-400 mb-2" />
            <p className="font-medium text-white">Novo Imóvel</p>
          </Link>

          <Link href="/admin/matches" className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all border border-white/5">
            <Search className="w-6 h-6 text-purple-400 mb-2" />
            <p className="font-medium text-white">Buscar Matches</p>
          </Link>

          <Link href="/admin/relatorios" className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all border border-white/5">
            <BarChart3 className="w-6 h-6 text-amber-400 mb-2" />
            <p className="font-medium text-white">Relatórios</p>
          </Link>
        </div>
      </div>

      {/* Atividade Recente */}
      <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Fluxo de Processamento IA
          </h3>
          <Link href="/admin/matches" className="text-sm px-4 py-2 bg-white/5 text-slate-400 hover:text-white rounded-lg transition-colors">
            Ver Matches
          </Link>
        </div>

        <div className="space-y-3">
          {atividadesRecentes.length > 0 ? (
            atividadesRecentes.map((atividade, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    atividade.cor === 'emerald' ? 'bg-emerald-500' : 
                    atividade.cor === 'blue' ? 'bg-blue-500' : 
                    atividade.cor === 'purple' ? 'bg-purple-500' : 'bg-slate-500'
                  }`}></div>
                  <p className="text-slate-300">{atividade.titulo}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </div>
            ))
          ) : (
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                <p className="text-slate-400">Carregando atividades...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estatísticas Detalhadas */}
      {statsDetalhadas && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Card de Clientes */}
          <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Clientes
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Total:</span>
                <span className="font-semibold text-white">{statsDetalhadas?.clientes?.total || 0}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Ativos:</span>
                <span className="font-semibold text-emerald-400">{statsDetalhadas?.clientes?.ativos || 0}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Querem Comprar:</span>
                <span className="font-semibold text-white">{statsDetalhadas?.clientes?.comprar || 0}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Querem Alugar:</span>
                <span className="font-semibold text-white">{statsDetalhadas?.clientes?.alugar || 0}</span>
              </div>
            </div>
          </div>

          {/* Card de Imóveis */}
          <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-400" />
              Imóveis
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Total:</span>
                <span className="font-semibold text-white">{statsDetalhadas?.imoveis?.total || 0}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Publicados:</span>
                <span className="font-semibold text-emerald-400">{statsDetalhadas?.imoveis?.publicados || 0}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>À Venda:</span>
                <span className="font-semibold text-white">{statsDetalhadas?.imoveis?.venda || 0}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Para Aluguel:</span>
                <span className="font-semibold text-white">{statsDetalhadas?.imoveis?.aluguel || 0}</span>
              </div>
            </div>
          </div>

          {/* Card de Negociações */}
          <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Negociações
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Total:</span>
                <span className="font-semibold text-white">{statsDetalhadas?.negociacoes?.total || 0}</span>
              </div>
              {statsDetalhadas?.negociacoes?.porEtapa?.map((etapa: any, idx: number) => (
                <div key={idx} className="flex justify-between text-slate-300">
                  <span>{etapa.etapa.replace(/_/g, ' ')}:</span>
                  <span className="font-semibold text-white">{etapa.quantidade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card de Cidades/Regiões */}
          {statsDetalhadas?.geografico?.topCidades?.length > 0 && (
            <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                Top Cidades
              </h3>
              <div className="space-y-2 text-sm">
                {statsDetalhadas?.geografico?.topCidades?.slice(0, 5).map((cidade: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-slate-300">
                    <span>{cidade.cidade}/{cidade.estado}:</span>
                    <span className="font-semibold text-white">{cidade.quantidade} imóveis</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
