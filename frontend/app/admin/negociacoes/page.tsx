'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { 
  Users, Building, Zap, Phone, Calendar, 
  MessageSquare, ChevronRight, Filter, Plus, Search, ArrowLeft,
  TrendingUp, Clock, Trash2
} from 'lucide-react';

interface Negociacao {
  id: string;
  etapa: string;
  percentualMatch: number;
  status: string;
  observacoes: string | null;
  valorProposta: string | null;
  createdAt: string;
  updatedAt: string;
  cliente: {
    id: number;
    nome: string;
    email: string;
    telefone: string | null;
  };
  imovel: {
    id: string;
    titulo: string;
    cidade: string;
    bairro: string;
    valor: string;
  };
  atividades: Atividade[];
}

interface Atividade {
  id: string;
  tipo: string;
  descricao: string;
  status: string;
  dataAgendada: string | null;
  createdAt: string;
}

const etapasNegociacao = [
  { value: 'CONTATO_INICIAL', label: '📞 Contato Inicial', cor: 'blue' },
  { value: 'VISITA_AGENDADA', label: '👁️ Visita Agendada', cor: 'purple' },
  { value: 'VISITA_REALIZADA', label: '✅ Visita Realizada', cor: 'indigo' },
  { value: 'ANALISE', label: '🤔 Análise', cor: 'amber' },
  { value: 'PROPOSTA', label: '💰 Proposta', cor: 'pink' },
  { value: 'CONTRATO', label: '📝 Contrato', cor: 'cyan' },
  { value: 'FECHADO', label: '🎉 FECHADO!', cor: 'emerald' },
  { value: 'PERDIDO', label: '❌ Perdido', cor: 'red' }
];

const tiposAtividade = [
  { value: 'LIGACAO', label: '📞 Ligação', icone: Phone },
  { value: 'VISITA', label: '👁️ Visita', icone: Building },
  { value: 'REUNIAO', label: '🤝 Reunião', icone: Users },
  { value: 'EMAIL', label: '📧 Email', icone: MessageSquare },
  { value: 'WHATSAPP', label: '💬 WhatsApp', icone: MessageSquare },
  { value: 'PROPOSTA', label: '💰 Proposta', icone: TrendingUp },
  { value: 'FOLLOW_UP', label: '📋 Follow-up', icone: Clock }
];

export default function NegociacoesPage() {
  const router = useRouter();
  const [negociacoes, setNegociacoes] = useState<Negociacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroEtapa, setFiltroEtapa] = useState('');
  const [negociacaoSelecionada, setNegociacaoSelecionada] = useState<Negociacao | null>(null);
  const [mostrarNovaAtividade, setMostrarNovaAtividade] = useState(false);
  const [mostrarNovaNegociacao, setMostrarNovaNegociacao] = useState(false);
  const [novaAtividade, setNovaAtividade] = useState({
    tipo: 'LIGACAO',
    descricao: '',
    dataAgendada: '',
    status: 'PENDENTE'
  });
  
  // Dados para nova negociação manual
  const [clientes, setClientes] = useState<any[]>([]);
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [novaNegociacao, setNovaNegociacao] = useState({
    clienteId: '',
    imovelId: '',
    etapa: 'CONTATO_INICIAL',
    percentualMatch: 50,
    observacoes: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    buscarNegociacoes();
    buscarClientesEImoveis();
  }, [router]);
  
  // Refetch quando filtro mudar
  useEffect(() => {
    if (!carregando) {
      buscarNegociacoes();
    }
  }, [filtroEtapa]);

  const buscarNegociacoes = async () => {
    try {
      setCarregando(true);
      const params = filtroEtapa ? `?etapa=${filtroEtapa}` : '';
      const res = await api.get(`/negociacoes${params}`);
      setNegociacoes(res.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar negociações:', error);
      Swal.fire('Erro', 'Não foi possível carregar as negociações', 'error');
    } finally {
      setCarregando(false);
    }
  };

  const buscarClientesEImoveis = async () => {
    try {
      const [resClientes, resImoveis] = await Promise.all([
        api.get('/clientes?limit=1000'),
        api.get('/imoveis?limit=1000')
      ]);
      setClientes(resClientes.data.data || []);
      setImoveis(resImoveis.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const criarNegociacaoManual = async () => {
    if (!novaNegociacao.clienteId || !novaNegociacao.imovelId) {
      Swal.fire('Atenção', 'Selecione o cliente e o imóvel', 'warning');
      return;
    }
    
    // Pegar o ID do usuário logado do localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    try {
      console.log('📤 Enviando:', {
        clienteId: novaNegociacao.clienteId,
        imovelId: novaNegociacao.imovelId,
        responsavelId: user.id
      });
      
      await api.post('/negociacoes', {
        clienteId: novaNegociacao.clienteId,
        imovelId: novaNegociacao.imovelId,
        responsavelId: user.id,
        etapa: novaNegociacao.etapa,
        percentualMatch: novaNegociacao.percentualMatch,
        observacoes: novaNegociacao.observacoes || 'Negociação criada manualmente',
        status: 'ATIVA'
      });
      
      Swal.fire('Sucesso!', 'Negociação criada com sucesso!', 'success');
      setMostrarNovaNegociacao(false);
      setNovaNegociacao({
        clienteId: '',
        imovelId: '',
        etapa: 'CONTATO_INICIAL',
        percentualMatch: 50,
        observacoes: ''
      });
      buscarNegociacoes();
    } catch (error) {
      console.error('Erro ao criar negociação:', error);
      Swal.fire('Erro', 'Não foi possível criar a negociação', 'error');
    }
  };

  const atualizarEtapa = async (negociacaoId: string, novaEtapa: string) => {
    try {
      await api.put(`/negociacoes/${negociacaoId}`, { etapa: novaEtapa });
      Swal.fire('Sucesso!', `Etapa atualizada para: ${novaEtapa}`, 'success');
      buscarNegociacoes();
    } catch (error) {
      Swal.fire('Erro', 'Não foi possível atualizar a etapa', 'error');
    }
  };

  const adicionarAtividade = async () => {
    if (!negociacaoSelecionada) return;
    try {
      await api.post(`/negociacoes/${negociacaoSelecionada.id}/atividades`, novaAtividade);
      Swal.fire('Sucesso!', 'Atividade registrada!', 'success');
      setMostrarNovaAtividade(false);
      setNovaAtividade({ tipo: 'LIGACAO', descricao: '', dataAgendada: '', status: 'PENDENTE' });
      buscarNegociacoes();
    } catch (error) {
      Swal.fire('Erro', 'Não foi possível registrar atividade', 'error');
    }
  };

  const deletarNegociacao = async (id: string) => {
    const result = await Swal.fire({
      title: 'Confirmar exclusão?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/negociacoes/${id}`);
        Swal.fire('Excluído!', 'Negociação removida.', 'success');
        buscarNegociacoes();
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível excluir', 'error');
      }
    }
  };

  const getCorEtapa = (etapa: string) => {
    const etapaInfo = etapasNegociacao.find(e => e.value === etapa);
    return etapaInfo?.cor || 'slate';
  };

  const getLabelEtapa = (etapa: string) => {
    const etapaInfo = etapasNegociacao.find(e => e.value === etapa);
    return etapaInfo?.label || etapa;
  };

  const formatarWhatsApp = (telefone: string | null) => {
    if (!telefone) return null;
    const numero = telefone.replace(/\D/g, '');
    return `https://wa.me/55${numero}`;
  };

  if (carregando) {
    return (
      <div className="p-8 text-slate-200">
        <div className="animate-pulse">Carregando CRM...</div>
      </div>
    );
  }

  // View Detalhes da Negociação
  if (negociacaoSelecionada) {
    return (
      <div className="p-8 text-slate-200 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setNegociacaoSelecionada(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para lista
          </button>
          <div className="flex gap-3">
            {negociacaoSelecionada.cliente.telefone && (
              <a
                href={formatarWhatsApp(negociacaoSelecionada.cliente.telefone) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Cliente
              </a>
            )}
            <button
              onClick={() => setMostrarNovaAtividade(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Atividade
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card Cliente */}
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Cliente
            </h3>
            <div className="space-y-3">
              <p className="text-xl font-bold text-white">{negociacaoSelecionada.cliente.nome}</p>
              <p className="text-slate-400">{negociacaoSelecionada.cliente.email}</p>
              {negociacaoSelecionada.cliente.telefone && (
                <p className="text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {negociacaoSelecionada.cliente.telefone}
                </p>
              )}
            </div>
          </div>

          {/* Card Imóvel */}
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-400" />
              Imóvel
            </h3>
            <div className="space-y-3">
              <p className="text-xl font-bold text-white">{negociacaoSelecionada.imovel.titulo}</p>
              <p className="text-slate-400">
                {negociacaoSelecionada.imovel.bairro}, {negociacaoSelecionada.imovel.cidade}
              </p>
              <p className="text-emerald-400 font-semibold text-lg">
                R$ {Number(negociacaoSelecionada.imovel.valor).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Status e Match */}
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold bg-${getCorEtapa(negociacaoSelecionada.etapa)}-500/20 text-${getCorEtapa(negociacaoSelecionada.etapa)}-400 border border-${getCorEtapa(negociacaoSelecionada.etapa)}-500/30`}>
                {getLabelEtapa(negociacaoSelecionada.etapa)}
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                negociacaoSelecionada.percentualMatch >= 80 ? 'bg-emerald-500 text-white' :
                negociacaoSelecionada.percentualMatch >= 60 ? 'bg-blue-500 text-white' :
                'bg-yellow-500 text-white'
              }`}>
                {negociacaoSelecionada.percentualMatch}% Match
              </div>
            </div>
            
            {/* Atualizar Etapa */}
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm">Mover para:</span>
              <select
                onChange={(e) => e.target.value && atualizarEtapa(negociacaoSelecionada.id, e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                defaultValue=""
              >
                <option value="">Selecionar etapa...</option>
                {etapasNegociacao.map(etapa => (
                  <option key={etapa.value} value={etapa.value} disabled={etapa.value === negociacaoSelecionada.etapa}>
                    {etapa.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timeline de Atividades */}
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Histórico de Atividades
          </h3>
          
          {negociacaoSelecionada.atividades?.length > 0 ? (
            <div className="space-y-4">
              {negociacaoSelecionada.atividades.map((atividade, idx) => {
                const tipoInfo = tiposAtividade.find(t => t.value === atividade.tipo);
                return (
                  <div key={idx} className="flex gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      atividade.status === 'CONCLUIDO' ? 'bg-emerald-500/20 text-emerald-400' :
                      atividade.status === 'CANCELADO' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {tipoInfo?.icone && <tipoInfo.icone className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{tipoInfo?.label || atividade.tipo}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          atividade.status === 'CONCLUIDO' ? 'bg-emerald-500/20 text-emerald-400' :
                          atividade.status === 'CANCELADO' ? 'bg-red-500/20 text-red-400' :
                          atividade.status === 'PENDENTE' && atividade.dataAgendada && new Date(atividade.dataAgendada) < new Date() ?
                            'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {atividade.status === 'PENDENTE' && atividade.dataAgendada && new Date(atividade.dataAgendada) < new Date() ?
                            'ATRASADO' : atividade.status}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm">{atividade.descricao}</p>
                      {atividade.dataAgendada && (
                        <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(atividade.dataAgendada).toLocaleString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma atividade registrada</p>
              <button 
                onClick={() => setMostrarNovaAtividade(true)}
                className="mt-3 text-blue-400 hover:text-blue-300 text-sm"
              >
                + Adicionar primeira atividade
              </button>
            </div>
          )}
        </div>

        {/* Modal Nova Atividade */}
        {mostrarNovaAtividade && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-6 max-w-lg w-full border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Nova Atividade</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Tipo</label>
                  <select
                    value={novaAtividade.tipo}
                    onChange={(e) => setNovaAtividade({...novaAtividade, tipo: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    {tiposAtividade.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Descrição</label>
                  <textarea
                    value={novaAtividade.descricao}
                    onChange={(e) => setNovaAtividade({...novaAtividade, descricao: e.target.value})}
                    placeholder="Descreva a atividade..."
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Data Agendada (opcional)</label>
                  <input
                    type="datetime-local"
                    value={novaAtividade.dataAgendada}
                    onChange={(e) => setNovaAtividade({...novaAtividade, dataAgendada: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setMostrarNovaAtividade(false)}
                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={adicionarAtividade}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Salvar Atividade
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View Lista de Negociações
  return (
    <div className="p-8 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Zap className="w-8 h-8 text-purple-400" />
            Negociações
          </h1>
          <p className="text-slate-400">Pipeline de vendas e acompanhamento de clientes</p>
        </div>
        <button 
          onClick={() => setMostrarNovaNegociacao(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nova Negociação
        </button>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/10">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filtroEtapa}
            onChange={(e) => setFiltroEtapa(e.target.value)}
            className="bg-transparent text-slate-300 focus:outline-none"
          >
            <option value="">Todas as etapas</option>
            {etapasNegociacao.map(e => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
        </div>
        {filtroEtapa && (
          <button
            onClick={() => setFiltroEtapa('')}
            className="text-slate-400 hover:text-white text-sm"
          >
            Limpar filtro ✕
          </button>
        )}
      </div>

      {/* Lista de Negociações */}
      {negociacoes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {negociacoes.map((neg) => (
            <div 
              key={neg.id}
              className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer group"
              onClick={() => setNegociacaoSelecionada(neg)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-${getCorEtapa(neg.etapa)}-500/20 text-${getCorEtapa(neg.etapa)}-400 border border-${getCorEtapa(neg.etapa)}-500/30`}>
                  {getLabelEtapa(neg.etapa)}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  neg.percentualMatch >= 80 ? 'bg-emerald-500 text-white' :
                  neg.percentualMatch >= 60 ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {neg.percentualMatch}%
                </div>
              </div>

              {/* Cliente */}
              <div className="mb-4">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Cliente</p>
                <p className="text-white font-semibold text-lg">{neg.cliente.nome}</p>
              </div>

              {/* Imóvel */}
              <div className="mb-4">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Imóvel</p>
                <p className="text-slate-200">{neg.imovel.titulo}</p>
                <p className="text-emerald-400 font-semibold mt-1">
                  R$ {Number(neg.imovel.valor).toLocaleString('pt-BR')}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  {neg.atividades?.length || 0} atividades
                </div>
                <div className="flex items-center gap-2">
                  {neg.cliente.telefone && (
                    <a
                      href={formatarWhatsApp(neg.cliente.telefone) || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/30 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletarNegociacao(neg.id);
                    }}
                    className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-800/30 rounded-2xl">
          <Zap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg mb-2">Nenhuma negociação encontrada</p>
          <p className="text-slate-500 text-sm mb-6">Comece criando uma nova negociação a partir dos matches</p>
          <Link 
            href="/admin/matches"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Ir para Matches
          </Link>
        </div>
      )}

      {/* Modal Nova Negociação Manual */}
      {mostrarNovaNegociacao && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-lg w-full border border-white/10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-6 h-6 text-emerald-400" />
              Criar Negociação Manual
            </h3>
            
            <div className="space-y-4">
              {/* Selecionar Cliente */}
              <div>
                <label className="block text-slate-400 text-sm mb-2">Cliente *</label>
                <select
                  value={novaNegociacao.clienteId}
                  onChange={(e) => setNovaNegociacao({...novaNegociacao, clienteId: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Selecione um cliente...</option>
                  {clientes.map((cliente: any) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome} {cliente.telefone ? `- ${cliente.telefone}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selecionar Imóvel */}
              <div>
                <label className="block text-slate-400 text-sm mb-2">Imóvel *</label>
                <select
                  value={novaNegociacao.imovelId}
                  onChange={(e) => setNovaNegociacao({...novaNegociacao, imovelId: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Selecione um imóvel...</option>
                  {imoveis.map((imovel: any) => (
                    <option key={imovel.id} value={imovel.id}>
                      {imovel.titulo} - R$ {Number(imovel.valor).toLocaleString('pt-BR')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Etapa Inicial */}
              <div>
                <label className="block text-slate-400 text-sm mb-2">Etapa Inicial</label>
                <select
                  value={novaNegociacao.etapa}
                  onChange={(e) => setNovaNegociacao({...novaNegociacao, etapa: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {etapasNegociacao.map((etapa) => (
                    <option key={etapa.value} value={etapa.value}>
                      {etapa.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Percentual de Match */}
              <div>
                <label className="block text-slate-400 text-sm mb-2">
                  Compatibilidade Estimada: <span className="text-white font-semibold">{novaNegociacao.percentualMatch}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={novaNegociacao.percentualMatch}
                  onChange={(e) => setNovaNegociacao({...novaNegociacao, percentualMatch: Number(e.target.value)})}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-slate-400 text-sm mb-2">Observações</label>
                <textarea
                  value={novaNegociacao.observacoes}
                  onChange={(e) => setNovaNegociacao({...novaNegociacao, observacoes: e.target.value})}
                  placeholder="Detalhes sobre esta negociação..."
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setMostrarNovaNegociacao(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={criarNegociacaoManual}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Criar Negociação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
