// ============================================
// 📦 PAGE: admin/matches/page.tsx
// ============================================
// 🎯 O QUE? Sistema de matching (usa layout.tsx compartilhado)
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { Users, Zap, Search, CheckCircle } from 'lucide-react';
import ClientSearchSelect, { Cliente } from '@/app/components/ClientSearchSelect';

interface Imovel {
  id: string;
  titulo: string;
  operacao: 'VENDA' | 'ALUGUEL';
  tipoImovel: string;
  valor: number;
  cidade: string;
  bairro: string;
}

interface MatchResult {
  imovel: Imovel;
  compatibilidade: number;
  motivos: string[];
  detalhes: {
    cidade: boolean;
    operacao: boolean;
    valor: boolean;
    tipo: boolean;
  };
}

export default function MatchesPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    buscarDados();
  }, [router]);

  const buscarDados = async () => {
    try {
      const [resClientes, resImoveis] = await Promise.all([
        api.get('/clientes'),
        api.get('/imoveis')
      ]);
      // Backend retorna paginação: { data: [...], total, page, pageSize }
      const clientesData = resClientes.data?.data || [];
      const imoveisData = resImoveis.data?.data || [];
      setClientes(Array.isArray(clientesData) ? clientesData : []);
      setImoveis(Array.isArray(imoveisData) ? imoveisData : []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const calcularMatches = (cliente: Cliente) => {
    setBuscando(true);
    setClienteSelecionado(cliente);

    setTimeout(() => {
      const resultados: MatchResult[] = [];

      imoveis.forEach((imovel) => {
        let score = 0;
        const motivos: string[] = [];
        const detalhes = {
          cidade: false,
          operacao: false,
          valor: false,
          tipo: false,
        };

        // 1. Cidade (30 pontos)
        const clienteCidade = cliente.cidade || '';
        const imovelCidade = imovel.cidade || '';
        if (clienteCidade.toLowerCase() === imovelCidade.toLowerCase()) {
          score += 30;
          detalhes.cidade = true;
          motivos.push(`✅ Mesma cidade: ${imovelCidade}`);
        } else {
          motivos.push(`❌ Cidade diferente: Cliente quer ${clienteCidade}, imóvel em ${imovelCidade}`);
        }

        // 2. Operação (20 pontos)
        const tipoCliente = (cliente.tipoInteresse || '').toLowerCase();
        const tipoImovel = imovel.operacao || '';
        if ((tipoCliente === 'comprar' && tipoImovel === 'VENDA') ||
            (tipoCliente === 'alugar' && tipoImovel === 'ALUGUEL')) {
          score += 20;
          detalhes.operacao = true;
          motivos.push(`✅ Operação compatível: ${tipoImovel}`);
        } else {
          motivos.push(`❌ Operação incompatível: Cliente quer ${cliente.tipoInteresse || 'N/A'}, imóvel é ${tipoImovel}`);
        }

        // 3. Valor (30 pontos)
        const valorMax = cliente.valorMaximo || Infinity;
        const valorMin = cliente.valorMinimo || 0;
        const imovelValor = imovel.valor || 0;
        if (imovelValor <= valorMax && imovelValor >= valorMin) {
          score += 30;
          detalhes.valor = true;
          motivos.push(`✅ Valor dentro da faixa: ${formatarValor(imovelValor)}`);
        } else if (imovelValor <= valorMax) {
          score += 15;
          motivos.push(`⚠️ Valor abaixo do mínimo: ${formatarValor(imovelValor)} (mín: ${formatarValor(valorMin)})`);
        } else {
          motivos.push(`❌ Valor acima do máximo: ${formatarValor(imovelValor)} (máx: ${formatarValor(valorMax)})`);
        }

        // 4. Tipo de Imóvel (20 pontos)
        const tiposClienteStr = String(cliente.tiposImovel || '');
        const tiposCliente = tiposClienteStr.toLowerCase().split(',');
        const imovelTipo = (imovel.tipoImovel || '').toLowerCase();
        if (tiposCliente.some(t => imovelTipo.includes(t.trim()))) {
          score += 20;
          detalhes.tipo = true;
          motivos.push(`✅ Tipo compatível: ${imovel.tipoImovel || 'N/A'}`);
        } else {
          motivos.push(`❌ Tipo incompatível: Cliente quer ${tiposClienteStr || 'N/A'}, imóvel é ${imovel.tipoImovel || 'N/A'}`);
        }

        // Adiciona mesmo com score baixo para mostrar análise completa
        resultados.push({ imovel, compatibilidade: score, motivos, detalhes });
      });

      resultados.sort((a, b) => b.compatibilidade - a.compatibilidade);
      setMatches(resultados);
      setBuscando(false);
    }, 500);
  };

  const formatarValor = (valor: number | null | undefined) => {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return 'R$ 0,00';
    }
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (carregando) {
    return <div className="p-8 text-slate-200">Carregando...</div>;
  }

  return (
    <div className="p-8 text-slate-200">
      <h1 className="text-2xl font-bold text-white mb-2">Sistema de Matching</h1>
      <p className="text-slate-400 mb-6">Conecte clientes com imóveis compatíveis</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Clientes com Busca */}
        <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Selecione um Cliente
          </h2>

          <ClientSearchSelect
            clientes={clientes}
            clienteSelecionado={clienteSelecionado}
            onSelect={calcularMatches}
            placeholder="Buscar cliente por nome..."
          />

          {/* Estatísticas rápidas */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-2xl font-bold text-white">{clientes.length}</p>
                <p className="text-xs text-slate-400">Total de Clientes</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3">
                <p className="text-2xl font-bold text-emerald-400">
                  {imoveis.length}
                </p>
                <p className="text-xs text-slate-400">Imóveis Disponíveis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2">
          {clienteSelecionado && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Buscando matches para:</h3>
              <p className="text-xl font-bold">{clienteSelecionado.nome}</p>
              <p className="text-blue-100">
                {clienteSelecionado.cidade} • {formatarValor(clienteSelecionado.valorMinimo || 0)} - {formatarValor(clienteSelecionado.valorMaximo || 0)}
              </p>
            </div>
          )}

          {buscando && (
            <div className="text-center py-12">
              <Zap className="w-10 h-10 animate-pulse text-purple-400 mx-auto mb-4" />
              <p className="text-slate-400">Analisando compatibilidade...</p>
            </div>
          )}

          {!buscando && matches.length > 0 && (
            <div className="space-y-4">
              {/* Resumo do Match */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total de imóveis analisados</p>
                    <p className="text-2xl font-bold text-white">{matches.length}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Matches excelentes (80%+)</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      {matches.filter(m => m.compatibilidade >= 80).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Matches bons (60-79%)</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {matches.filter(m => m.compatibilidade >= 60 && m.compatibilidade < 80).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Matches regulares (&lt;60%)</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {matches.filter(m => m.compatibilidade < 60).length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de Matches */}
              <div className="grid grid-cols-1 gap-4">
                {matches.sort((a, b) => b.compatibilidade - a.compatibilidade).map((match) => (
                  <div
                    key={match.imovel.id}
                    className={`rounded-xl border-2 p-5 ${
                      match.compatibilidade >= 80 ? 'border-emerald-500 bg-emerald-500/10' :
                      match.compatibilidade >= 60 ? 'border-blue-500 bg-blue-500/10' :
                      match.compatibilidade >= 40 ? 'border-yellow-500 bg-yellow-500/10' :
                      'border-red-500 bg-red-500/10'
                    }`}
                  >
                    {/* Header do Card */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-white text-lg">{match.imovel.titulo}</h3>
                        <p className="text-slate-400 text-sm">{match.imovel.cidade} • {match.imovel.bairro}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-lg font-bold ${
                        match.compatibilidade >= 80 ? 'bg-emerald-500 text-white' :
                        match.compatibilidade >= 60 ? 'bg-blue-500 text-white' :
                        match.compatibilidade >= 40 ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {match.compatibilidade}% Match
                      </div>
                    </div>

                    {/* Informações do Imóvel */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">Valor</p>
                        <p className="text-emerald-400 font-bold">{formatarValor(match.imovel.valor)}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">Operação</p>
                        <p className="text-white font-semibold">{match.imovel.operacao}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">Tipo</p>
                        <p className="text-white font-semibold">{match.imovel.tipoImovel}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">ID</p>
                        <p className="text-white font-semibold">#{match.imovel.id}</p>
                      </div>
                    </div>

                    {/* Critérios de Compatibilidade */}
                    <div className="bg-slate-800/30 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold text-white mb-2">Análise de Compatibilidade:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className={`flex items-center gap-2 text-sm ${match.detalhes.cidade ? 'text-emerald-400' : 'text-red-400'}`}>
                          {match.detalhes.cidade ? '✅' : '❌'} Cidade (30 pts)
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${match.detalhes.operacao ? 'text-emerald-400' : 'text-red-400'}`}>
                          {match.detalhes.operacao ? '✅' : '❌'} Operação (20 pts)
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${match.detalhes.valor ? 'text-emerald-400' : match.imovel.valor <= (clienteSelecionado?.valorMaximo || Infinity) ? 'text-yellow-400' : 'text-red-400'}`}>
                          {match.detalhes.valor ? '✅' : match.imovel.valor <= (clienteSelecionado?.valorMaximo || Infinity) ? '⚠️' : '❌'} Valor (30 pts)
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${match.detalhes.tipo ? 'text-emerald-400' : 'text-red-400'}`}>
                          {match.detalhes.tipo ? '✅' : '❌'} Tipo (20 pts)
                        </div>
                      </div>
                    </div>

                    {/* Motivos Detalhados */}
                    <div className="space-y-1 mb-4">
                      {match.motivos.map((motivo, idx) => (
                        <p key={idx} className={`text-sm ${
                          motivo.startsWith('✅') ? 'text-emerald-400' :
                          motivo.startsWith('⚠️') ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>{motivo}</p>
                      ))}
                    </div>

                    {/* Botões de Ação */}
                    <div className="space-y-3">
                      {/* Botão WhatsApp - Mensagem Emocionante */}
                      {clienteSelecionado?.telefone && (
                        <a
                          href={`https://wa.me/55${clienteSelecionado.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `🎉 *OLÁ ${clienteSelecionado.nome.split(' ')[0].toUpperCase()}!* 🎉\n\n` +
                            `Temos uma *EXCELENTE NOTÍCIA* para você! 🏠✨\n\n` +
                            `Encontramos um imóvel *MARAVILHOSO* que tem *${match.compatibilidade}% DE COMPATIBILIDADE* com o que você procura!\n\n` +
                            `*${match.imovel.titulo}*\n` +
                            `📍 ${match.imovel.bairro}, ${match.imovel.cidade}\n` +
                            `💰 ${formatarValor(match.imovel.valor)}\n` +
                            `🏡 ${match.imovel.tipoImovel} - ${match.imovel.operacao}\n\n` +
                            `*Detalhes que combinam com você:*\n` +
                            match.motivos.filter(m => m.startsWith('✅')).slice(0, 3).map(m => `✅ ${m.replace('✅ ', '')}`).join('\n') +
                            `\n\n` +
                            `*Quando podemos agendar uma visita?* Estou ansioso para mostrar pessoalmente! 😊\n\n` +
                            `_${new Date().toLocaleDateString('pt-BR')}_`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          📱 ENVIAR PELO WHATSAPP
                        </a>
                      )}

                      {/* Botão Registrar Interesse */}
                      <button
                        onClick={async () => {
                          if (!clienteSelecionado) return;
                          try {
                            // Criar negociação no backend
                            await api.post('/negociacoes', {
                              clienteId: clienteSelecionado.id,
                              imovelId: match.imovel.id,
                              etapa: 'CONTATO_INICIAL',
                              percentualMatch: match.compatibilidade,
                              observacoes: `Match automático: ${match.motivos.join(', ')}`
                            });
                            
                            Swal.fire({
                              icon: 'success',
                              title: '✅ Match registrado no CRM!',
                              html: `<b>${match.imovel.titulo}</b> foi adicionado às negociações.<br>Compatibilidade: <b>${match.compatibilidade}%</b>`,
                              confirmButtonColor: '#3b82f6',
                              showCancelButton: true,
                              cancelButtonText: 'Ir para Negociações',
                              cancelButtonColor: '#10b981'
                            }).then((result) => {
                              if (result.dismiss === Swal.DismissReason.cancel) {
                                window.location.href = '/admin/negociacoes';
                              }
                            });
                          } catch (error) {
                            Swal.fire({
                              icon: 'error',
                              title: 'Erro ao registrar',
                              text: 'Tente novamente ou contate o suporte.',
                              confirmButtonColor: '#3b82f6'
                            });
                          }
                        }}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          match.compatibilidade >= 60
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-slate-600 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5 inline mr-2" />
                        {match.compatibilidade >= 60 ? '💾 SALVAR NO CRM' : '📝 Registrar como Alternativa'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!buscando && clienteSelecionado && matches.length === 0 && (
            <div className="text-center py-12 bg-slate-800/30 rounded-xl">
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Nenhum imóvel compatível encontrado</p>
            </div>
          )}

          {!clienteSelecionado && (
            <div className="text-center py-16 bg-slate-800/30 rounded-xl">
              <Zap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Selecione um cliente para ver matches</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
