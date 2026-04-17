'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { 
  Clock, Phone, Users, Building, MessageSquare, TrendingUp, 
  CheckCircle, Calendar, ChevronRight, 
  ArrowLeft, Filter, Search
} from 'lucide-react';

interface Atividade {
  id: string;
  tipo: string;
  descricao: string;
  status: string;
  dataAgendada: string | null;
  resultado: string | null;
  createdAt: string;
  negociacao: {
    id: string;
    cliente: {
      nome: string;
      telefone: string | null;
    };
    imovel: {
      titulo: string;
    };
  };
}

const tiposAtividade = [
  { value: 'LIGACAO', label: '📞 Ligação', icone: Phone, cor: 'blue' },
  { value: 'VISITA', label: '👁️ Visita', icone: Building, cor: 'emerald' },
  { value: 'REUNIAO', label: '🤝 Reunião', icone: Users, cor: 'purple' },
  { value: 'EMAIL', label: '📧 Email', icone: MessageSquare, cor: 'cyan' },
  { value: 'WHATSAPP', label: '💬 WhatsApp', icone: MessageSquare, cor: 'green' },
  { value: 'PROPOSTA', label: '💰 Proposta', icone: TrendingUp, cor: 'pink' },
  { value: 'FOLLOW_UP', label: '📋 Follow-up', icone: Clock, cor: 'amber' }
];

export default function AtividadesPage() {
  const router = useRouter();
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    buscarAtividades();
  }, [router, filtroStatus, filtroTipo]);

  const buscarAtividades = async () => {
    try {
      const res = await api.get('/negociacoes?limit=100');
      const negociacoes = res.data.data || [];
      
      // Extrair todas as atividades das negociações
      let todasAtividades: Atividade[] = [];
      negociacoes.forEach((neg: any) => {
        if (neg.atividades && neg.atividades.length > 0) {
          neg.atividades.forEach((ativ: any) => {
            todasAtividades.push({
              ...ativ,
              negociacao: {
                id: neg.id,
                cliente: neg.cliente,
                imovel: neg.imovel
              }
            });
          });
        }
      });

      // Ordenar por data (mais recente primeiro)
      todasAtividades.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // Aplicar filtros
      if (filtroStatus) {
        todasAtividades = todasAtividades.filter(a => a.status === filtroStatus);
      }
      if (filtroTipo) {
        todasAtividades = todasAtividades.filter(a => a.tipo === filtroTipo);
      }

      setAtividades(todasAtividades);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    } finally {
      setCarregando(false);
    }
  };

  const concluirAtividade = async (atividadeId: string) => {
    const { value: resultado } = await Swal.fire({
      title: 'Concluir Atividade',
      input: 'textarea',
      inputLabel: 'Resultado/Observações',
      inputPlaceholder: 'Descreva o resultado desta atividade...',
      showCancelButton: true,
      confirmButtonText: 'Concluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#10b981'
    });

    if (resultado !== undefined) {
      try {
        await api.put(`/negociacoes/atividades/${atividadeId}`, {
          status: 'CONCLUIDO',
          resultado
        });
        Swal.fire('Sucesso!', 'Atividade concluída!', 'success');
        buscarAtividades();
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível concluir', 'error');
      }
    }
  };

  const getTipoInfo = (tipo: string) => {
    return tiposAtividade.find(t => t.value === tipo) || tiposAtividade[6];
  };

  const formatarWhatsApp = (telefone: string | null) => {
    if (!telefone) return null;
    const numero = telefone.replace(/\D/g, '');
    return `https://wa.me/55${numero}`;
  };

  if (carregando) {
    return (
      <div className="p-8 text-slate-200">
        <div className="animate-pulse">Carregando atividades...</div>
      </div>
    );
  }

  return (
    <div className="p-8 text-slate-200 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-400" />
            Atividades
          </h1>
          <p className="text-slate-400">Agenda e histórico de interações com clientes</p>
        </div>
        <Link 
          href="/admin/negociacoes"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar às Negociações
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/10">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="bg-transparent text-slate-300 focus:outline-none"
          >
            <option value="">Todos os status</option>
            <option value="PENDENTE">⏳ Pendentes</option>
            <option value="CONCLUIDO">✅ Concluídas</option>
            <option value="CANCELADO">❌ Canceladas</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/10">
          <Search className="w-4 h-4 text-slate-400" />
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="bg-transparent text-slate-300 focus:outline-none"
          >
            <option value="">Todos os tipos</option>
            {tiposAtividade.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {(filtroStatus || filtroTipo) && (
          <button
            onClick={() => { setFiltroStatus(''); setFiltroTipo(''); }}
            className="text-slate-400 hover:text-white text-sm"
          >
            Limpar filtros ✕
          </button>
        )}
      </div>

      {/* Lista de Atividades */}
      {atividades.length > 0 ? (
        <div className="space-y-4">
          {atividades.map((ativ) => {
            const tipoInfo = getTipoInfo(ativ.tipo);
            const Icone = tipoInfo.icone;
            const isAtrasado = ativ.status === 'PENDENTE' && ativ.dataAgendada && new Date(ativ.dataAgendada) < new Date();

            return (
              <div 
                key={ativ.id}
                className={`bg-slate-800/50 border rounded-xl p-5 transition-all hover:border-white/20 ${
                  isAtrasado ? 'border-red-500/30 bg-red-500/5' : 'border-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Ícone */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    ativ.status === 'CONCLUIDO' ? 'bg-emerald-500/20 text-emerald-400' :
                    ativ.status === 'CANCELADO' ? 'bg-red-500/20 text-red-400' :
                    isAtrasado ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <Icone className="w-6 h-6" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white">{tipoInfo.label}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            ativ.status === 'CONCLUIDO' ? 'bg-emerald-500/20 text-emerald-400' :
                            ativ.status === 'CANCELADO' ? 'bg-red-500/20 text-red-400' :
                            isAtrasado ? 'bg-red-500/20 text-red-500 font-semibold' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                            {isAtrasado ? 'ATRASADO' : ativ.status}
                          </span>
                        </div>
                        <p className="text-slate-300 mt-1">{ativ.descricao}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-slate-400">
                            <strong className="text-slate-300">{ativ.negociacao.cliente.nome}</strong>
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 truncate">{ativ.negociacao.imovel.titulo}</span>
                        </div>
                      </div>

                      {/* Data e Ações */}
                      <div className="flex flex-col items-end gap-2">
                        {ativ.dataAgendada && (
                          <div className={`flex items-center gap-1 text-sm ${
                            isAtrasado ? 'text-red-400 font-semibold' : 'text-slate-400'
                          }`}>
                            <Calendar className="w-4 h-4" />
                            {new Date(ativ.dataAgendada).toLocaleString('pt-BR')}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          {ativ.negociacao.cliente.telefone && (
                            <a
                              href={formatarWhatsApp(ativ.negociacao.cliente.telefone) || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          )}
                          <Link
                            href={`/admin/negociacoes`}
                            onClick={() => localStorage.setItem('negociacaoSelecionadaId', ativ.negociacao.id)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                            title="Ver Negociação"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                          {ativ.status === 'PENDENTE' && (
                            <button
                              onClick={() => concluirAtividade(ativ.id)}
                              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                              title="Marcar como Concluída"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Resultado se concluído */}
                    {ativ.resultado && (
                      <div className="mt-3 p-3 bg-slate-700/30 rounded-lg text-sm text-slate-300">
                        <strong className="text-emerald-400">Resultado:</strong> {ativ.resultado}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800/30 rounded-2xl">
          <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg mb-2">Nenhuma atividade encontrada</p>
          {(filtroStatus || filtroTipo) ? (
            <>
              <p className="text-slate-500 text-sm mb-2">
                Filtros aplicados: 
                {filtroStatus && <span className="text-blue-400 ml-1">Status: {filtroStatus}</span>}
                {filtroTipo && <span className="text-blue-400 ml-1">Tipo: {filtroTipo}</span>}
              </p>
              <p className="text-slate-500 text-sm mb-6">Tente ajustar ou limpar os filtros</p>
              <button
                onClick={() => { setFiltroStatus(''); setFiltroTipo(''); }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Limpar Filtros
              </button>
            </>
          ) : (
            <p className="text-slate-500 text-sm mb-6">Não há atividades cadastradas no sistema. Crie atividades nas negociações.</p>
          )}
        </div>
      )}
    </div>
  );
}
