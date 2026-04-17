// ============================================
// 📦 PAGE: admin/imoveis/page.tsx
// ============================================
// 🎯 O QUE? Listagem de imóveis (usa layout.tsx compartilhado)
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { Search, Plus, MapPin, Home, Bed, Car } from 'lucide-react';

interface Imovel {
  id: number;
  titulo: string;
  tipoOperacao: 'venda' | 'aluguel';
  tipoImovel: string;
  valor: number;
  cidade: string;
  bairro: string;
  quartos: number | null;
  vagasGaragem: number | null;
  areaUtil: number | null;
}

export default function ImoveisPage() {
  const router = useRouter();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [filtrados, setFiltrados] = useState<Imovel[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    buscarImoveis();
  }, [router]);

  const buscarImoveis = async () => {
    try {
      const res = await api.get('/imoveis');
      // Backend retorna paginação: { data: [...], total, page, pageSize }
      const dados = res.data?.data || [];
      setImoveis(dados);
      setFiltrados(dados);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleBusca = (termo: string) => {
    setBusca(termo);
    if (!termo.trim()) {
      setFiltrados(imoveis);
      return;
    }
    const termoLower = termo.toLowerCase();
    const resultado = imoveis.filter(i =>
      i.titulo.toLowerCase().includes(termoLower) ||
      i.cidade.toLowerCase().includes(termoLower) ||
      i.bairro.toLowerCase().includes(termoLower)
    );
    setFiltrados(resultado);
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const excluirImovel = async (id: number, titulo: string) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Confirmar exclusão?',
      text: `Deseja excluir "${titulo}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444'
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/imoveis/${id}`);
      setImoveis(prev => prev.filter(i => i.id !== id));
      setFiltrados(prev => prev.filter(i => i.id !== id));
      Swal.fire('Excluído!', 'Imóvel removido.', 'success');
    } catch (error) {
      Swal.fire('Erro!', 'Não foi possível excluir.', 'error');
    }
  };

  if (carregando) {
    return <div className="p-8 text-slate-200">Carregando...</div>;
  }

  return (
    <div className="p-8 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventário de Imóveis</h1>
          <p className="text-slate-400">{imoveis.length} imóvel(is) cadastrado(s)</p>
        </div>
        <Link 
          href="/admin/imoveis/novo" 
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Novo Imóvel
        </Link>
      </div>

      {/* Busca */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por título, cidade ou bairro..."
          value={busca}
          onChange={(e) => handleBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500"
        />
      </div>

      {/* Grid */}
      {filtrados.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/30 rounded-xl">
          <Home className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">Nenhum imóvel encontrado</p>
          <Link href="/admin/imoveis/novo" className="text-emerald-400 hover:text-emerald-300">
            Cadastrar primeiro imóvel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((imovel) => (
            <div key={imovel.id} className="bg-slate-800/50 border border-white/5 rounded-xl overflow-hidden">
              {/* Imagem Placeholder */}
              <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                <Home className="w-16 h-16 text-slate-500" />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  imovel.tipoOperacao === 'venda' ? 'bg-emerald-500' : 'bg-purple-500'
                } text-white`}>
                  {imovel.tipoOperacao === 'venda' ? 'Venda' : 'Aluguel'}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-white mb-1">{imovel.titulo}</h3>
                <p className="text-sm text-slate-400 mb-3">{imovel.tipoImovel}</p>

                <p className="text-2xl font-bold text-emerald-400 mb-3">
                  {formatarValor(imovel.valor)}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  {imovel.bairro}, {imovel.cidade}
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  {imovel.quartos !== null && imovel.quartos > 0 && (
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {imovel.quartos}
                    </span>
                  )}
                  {imovel.vagasGaragem !== null && imovel.vagasGaragem > 0 && (
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4" /> {imovel.vagasGaragem}
                    </span>
                  )}
                  {imovel.areaUtil !== null && imovel.areaUtil > 0 && (
                    <span>{imovel.areaUtil}m²</span>
                  )}
                </div>

                <button
                  onClick={() => excluirImovel(imovel.id, imovel.titulo)}
                  className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
