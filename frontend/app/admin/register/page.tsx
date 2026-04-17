// ============================================
// 📦 PAGE: admin/register/page.tsx
// ============================================
// 🎯 O QUE? Página para criar o primeiro usuário admin
// 🤔 POR QUÊ? Sistema novo precisa de pelo menos 1 usuário
// ============================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Swal from 'sweetalert2';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function AdminRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (form.senha !== form.confirmarSenha) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'As senhas não coincidem'
      });
      return;
    }

    if (form.senha.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Senha deve ter pelo menos 6 caracteres'
      });
      return;
    }

    setCarregando(true);

    try {
      // 🎯 Envia dados para criar usuário (sem role - backend define padrão)
      await api.post('/auth/register', {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      });

      Swal.fire({
        icon: 'success',
        title: 'Admin criado!',
        text: `Usuário ${form.email} cadastrado com sucesso.`,
        timer: 2000,
        showConfirmButton: false
      });

      // Redireciona para login
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);

    } catch (error: any) {
      const mensagem = error.response?.data?.message || 'Erro ao cadastrar';
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: mensagem
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Criar Admin
            </h1>
            <p className="text-slate-400">
              Cadastre o primeiro usuário administrador
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={form.nome}
                onChange={(e) => setForm({...form, nome: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Administrador"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@imoveis.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                required
                value={form.senha}
                onChange={(e) => setForm({...form, senha: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                required
                value={form.confirmarSenha}
                onChange={(e) => setForm({...form, confirmarSenha: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite a senha novamente"
              />
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? 'Criando...' : 'Criar Administrador'}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 text-center">
            <a 
              href="/admin/login"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Já tem conta? Faça login
            </a>
          </div>

          {/* Dica */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-sm text-blue-300">
              <strong>Dica:</strong> Use email <code>admin@imoveis.com</code> e senha <code>admin123</code> para facilitar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
