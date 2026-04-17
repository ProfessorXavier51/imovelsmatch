'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { 
  Users, Building, Zap, TrendingUp, MapPin, DollarSign, 
  Activity, Download,
  ChevronDown, ChevronUp, FileText
} from 'lucide-react';

export default function RelatoriosPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [filtroData, setFiltroData] = useState('todos');
  const [secaoExpandida, setSecaoExpandida] = useState<string | null>('resumo');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    buscarDados();
  }, [router, filtroData]);

  const buscarDados = async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
    } finally {
      setCarregando(false);
    }
  };

  const toggleSecao = (secao: string) => {
    setSecaoExpandida(secaoExpandida === secao ? null : secao);
  };

  const exportarCSV = (tipo: string) => {
    alert(`Exportando relatório ${tipo}... (implementação futura)`);
  };

  if (carregando) {
    return (
      <div className="p-8 text-slate-200">
        <div className="animate-pulse">Carregando relatórios...</div>
      </div>
    );
  }

  return (
    <div className="p-8 text-slate-200 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Relatórios & Analytics</h1>
          <p className="text-slate-400">Análise completa do sistema ImoveisMatch</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="todos">Todo período</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
          <button 
            onClick={() => exportarCSV('completo')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-slate-400 text-sm">Total Clientes</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.clientes?.total || 0}</p>
          <p className="text-xs text-emerald-400 mt-1">{stats?.clientes?.ativos || 0} ativos</p>
        </div>

        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-slate-400 text-sm">Total Imóveis</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.imoveis?.total || 0}</p>
          <p className="text-xs text-emerald-400 mt-1">{stats?.imoveis?.publicados || 0} publicados</p>
        </div>

        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-slate-400 text-sm">Negociações</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats?.negociacoes?.total || 0}</p>
          <p className="text-xs text-slate-400 mt-1">em andamento</p>
        </div>

        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-slate-400 text-sm">Taxa de Match</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats?.clientes?.total > 0 
              ? Math.round((stats?.negociacoes?.total / stats?.clientes?.total) * 100) 
              : 0}%
          </p>
          <p className="text-xs text-slate-400 mt-1">clientes com match</p>
        </div>
      </div>

      {/* Seções Expansíveis */}
      <div className="space-y-4">
        
        {/* 1. Resumo Executivo */}
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden">
          <button 
            onClick={() => toggleSecao('resumo')}
            className="w-full flex items-center justify-between p-6 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">1. Resumo Executivo</h3>
            </div>
            {secaoExpandida === 'resumo' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {secaoExpandida === 'resumo' && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-slate-300 font-medium mb-3">Clientes por Intenção</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Comprar:</span>
                      <span className="text-white font-semibold">{stats?.clientes?.comprar || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Alugar:</span>
                      <span className="text-white font-semibold">{stats?.clientes?.alugar || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-slate-300 font-medium mb-3">Imóveis por Operação</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Venda:</span>
                      <span className="text-white font-semibold">{stats?.imoveis?.venda || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Aluguel:</span>
                      <span className="text-white font-semibold">{stats?.imoveis?.aluguel || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-xl">
                  <h4 className="text-slate-300 font-medium mb-3">Novos Esta Semana</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Clientes:</span>
                      <span className="text-emerald-400 font-semibold">+{stats?.clientes?.novosEstaSemana || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Imóveis:</span>
                      <span className="text-emerald-400 font-semibold">+{stats?.imoveis?.novosEstaSemana || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Análise Geográfica */}
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden">
          <button 
            onClick={() => toggleSecao('geografico')}
            className="w-full flex items-center justify-between p-6 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">2. Análise Geográfica</h3>
            </div>
            {secaoExpandida === 'geografico' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {secaoExpandida === 'geografico' && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-slate-300 font-medium mb-4">Top 5 Cidades</h4>
                  <div className="space-y-3">
                    {stats?.geografico?.topCidades?.map((cidade: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-slate-300">{cidade.cidade}/{cidade.estado}</span>
                        </div>
                        <span className="text-white font-semibold">{cidade.quantidade} imóveis</span>
                      </div>
                    ))}
                    {(!stats?.geografico?.topCidades || stats?.geografico?.topCidades?.length === 0) && (
                      <p className="text-slate-500 italic">Nenhuma cidade registrada</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-slate-300 font-medium mb-4">Top 5 Bairros</h4>
                  <div className="space-y-3">
                    {stats?.geografico?.topBairros?.map((bairro: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-slate-300">{bairro.bairro}</p>
                            <p className="text-xs text-slate-500">{bairro.cidade}</p>
                          </div>
                        </div>
                        <span className="text-white font-semibold">{bairro.quantidade}</span>
                      </div>
                    ))}
                    {(!stats?.geografico?.topBairros || stats?.geografico?.topBairros?.length === 0) && (
                      <p className="text-slate-500 italic">Nenhum bairro registrado</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Análise de Valores - Venda */}
        {stats?.imoveis?.faixasVenda && (
          <div className="bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleSecao('valores-venda')}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">3. Faixa de Valores - VENDA</h3>
              </div>
              {secaoExpandida === 'valores-venda' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {secaoExpandida === 'valores-venda' && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasVenda?.ate100k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">Até R$ 100k</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasVenda?.de100ka300k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">R$ 100k - 300k</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasVenda?.de300ka500k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">R$ 300k - 500k</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasVenda?.de500ka1m || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">R$ 500k - 1M</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasVenda?.acima1m || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">Acima R$ 1M</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. Análise de Valores - Aluguel */}
        {stats?.imoveis?.faixasAluguel && (
          <div className="bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleSecao('valores-aluguel')}
              className="w-full flex items-center justify-between p-6 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">4. Faixa de Valores - ALUGUEL</h3>
              </div>
              {secaoExpandida === 'valores-aluguel' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {secaoExpandida === 'valores-aluguel' && (
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasAluguel?.ate1k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">Até R$ 1.000</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasAluguel?.de1ka2k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">R$ 1.000 - 2.000</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasAluguel?.de2ka3k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">R$ 2.000 - 3.000</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasAluguel?.de3ka5k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">R$ 3.000 - 5.000</p>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-white">{stats?.imoveis?.faixasAluguel?.acima5k || 0}</p>
                    <p className="text-xs text-slate-400 mt-1">Acima R$ 5.000</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. Pipeline de Negociações */}
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl overflow-hidden">
          <button 
            onClick={() => toggleSecao('pipeline')}
            className="w-full flex items-center justify-between p-6 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-pink-400" />
              <h3 className="text-lg font-semibold text-white">5. Pipeline de Negociações</h3>
            </div>
            {secaoExpandida === 'pipeline' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {secaoExpandida === 'pipeline' && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats?.negociacoes?.porEtapa?.map((etapa: any, idx: number) => (
                  <div key={idx} className={`p-4 rounded-xl ${
                    etapa.etapa === 'FECHADO' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                    etapa.etapa === 'PROPOSTA' ? 'bg-blue-500/20 border border-blue-500/30' :
                    etapa.etapa === 'ANALISE' ? 'bg-amber-500/20 border border-amber-500/30' :
                    etapa.etapa === 'VISITA_AGENDADA' ? 'bg-purple-500/20 border border-purple-500/30' :
                    'bg-slate-700/30'
                  }`}>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                      {etapa.etapa.replace(/_/g, ' ')}
                    </p>
                    <p className="text-2xl font-bold text-white">{etapa.quantidade}</p>
                  </div>
                ))}
                {(!stats?.negociacoes?.porEtapa || stats?.negociacoes?.porEtapa?.length === 0) && (
                  <div className="col-span-full p-8 text-center text-slate-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Nenhuma negociação registrada</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <div className="mt-8 p-6 bg-slate-800/30 border border-white/5 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-semibold mb-1">Exportar Relatório Completo</h4>
            <p className="text-sm text-slate-400">Baixe todos os dados em formato CSV ou PDF</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => exportarCSV('clientes')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
            >
              Exportar Clientes
            </button>
            <button 
              onClick={() => exportarCSV('imoveis')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
            >
              Exportar Imóveis
            </button>
            <button 
              onClick={() => exportarCSV('completo')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              Exportar Tudo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
