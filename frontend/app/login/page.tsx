// ============================================
// 📦 PAGE: login/page.tsx (REDIRECIONAMENTO)
// ============================================
// 🎯 O QUE? Redireciona /login → /admin/login
// 🤔 POR QUÊ? Facilitar acesso - alguns usuários digitam /login direto
// 📚 COMO? useEffect redireciona automaticamente
// ============================================

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // 🎯 Redireciona para a rota correta do admin
    router.push('/admin/login');
  }, [router]);

  // 🎯 Mostra loading enquanto redireciona
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 font-medium">Redirecionando...</p>
      </div>
    </div>
  );
}
