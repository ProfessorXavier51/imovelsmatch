// ============================================
// 📦 PAGE: admin/clientes/page.tsx
// ============================================
// 🎯 O QUE? Listagem de clientes (usa layout.tsx compartilhado)
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { Search, Plus, Trash2 } from 'lucide-react';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  tipoInteresse: string;
  createdAt: string;
}

export default function ClientesPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtrados, setFiltrados] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    buscarClientes();
  }, [router]);

  const buscarClientes = async () => {
    try {
      const res = await api.get('/clientes');
      // Backend retorna paginação: { data: [...], total, page, pageSize }
      const dados = res.data?.data || [];
      setClientes(dados);
      setFiltrados(dados);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleBusca = (termo: string) => {
    setBusca(termo);
    if (!termo.trim()) {
      setFiltrados(clientes);
      return;
    }
    const termoLower = termo.toLowerCase();
    const resultado = clientes.filter(c =>
      c.nome.toLowerCase().includes(termoLower) ||
      c.email.toLowerCase().includes(termoLower) ||
      c.cidade.toLowerCase().includes(termoLower)
    );
    setFiltrados(resultado);
  };

  const excluirCliente = async (id: number, nome: string) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Confirmar exclusão?',
      text: `Deseja excluir "${nome}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444'
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/clientes/${id}`);
      setClientes(prev => prev.filter(c => c.id !== id));
      setFiltrados(prev => prev.filter(c => c.id !== id));
      Swal.fire('Excluído!', 'Cliente removido.', 'success');
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
          <h1 className="text-2xl font-bold text-white">Gestão de Clientes</h1>
          <p className="text-slate-400">{clientes.length} cliente(s) cadastrado(s)</p>
        </div>
        <Link 
          href="/admin/clientes/novo" 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Novo Cliente
        </Link>
      </div>

      {/* Busca */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por nome, email ou cidade..."
          value={busca}
          onChange={(e) => handleBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500"
        />
      </div>

      {/* Tabela */}
      {filtrados.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/30 rounded-xl">
          <p className="text-slate-400 mb-4">Nenhum cliente encontrado</p>
          <Link href="/admin/clientes/novo" className="text-blue-400 hover:text-blue-300">
            Cadastrar primeiro cliente
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800/30 border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contato</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Localização</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Interesse</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtrados.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                        {cliente.nome.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{cliente.nome}</p>
                        <p className="text-xs text-slate-500">#{cliente.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-300">{cliente.email}</p>
                    <p className="text-sm text-slate-500">{cliente.telefone}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{cliente.cidade}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                      {cliente.tipoInteresse}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => excluirCliente(cliente.id, cliente.nome)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
