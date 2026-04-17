'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '@/lib/api';

export default function CadastroClienteAdminPage() {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoInteresse: '',
    valorMinimo: '',
    valorMaximo: '',
    cidade: '',
    bairrosPreferidos: [] as string[],
    tiposImovel: [] as string[],
    subtiposImovel: [] as string[],
    observacoes: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const tiposDisponiveis = [
    'Comercial',
    'Garagem',
    'Residencial',
    'Rural',
    'Terreno',
  ];

  const subtiposDisponiveis = [
    'Apartamento',
    'Casa',
    'Chácara',
    'Conjunto de Salas',
    'Fazenda',
    'Fundo de Comércio',
    'Galpão',
    'Garagem',
    'Hotel',
    'Imóvel Comercial',
    'Kitnet',
    'Lanchonete / Café',
    'Loja',
    'Pousada',
    'Restaurante',
    'Sala Comercial',
    'Sítio',
    'Terreno',
  ];

  const cidadesDisponiveis = [
    'São Lourenço',
    'Carmo de Minas',
    'Soledade de Minas',
    'São Sebastião da Bela Vista',
    'Pouso Alto',
    'Dom Viçoso',
  ];

  const bairrosPorCidade: Record<string, string[]> = {
    'São Lourenço': [
      'Bela Vista',
      'Carioca',
      'Centro',
      'Estação',
      'Federal',
      'Jardim Serrano',
      'Palmela',
      'Parque Olímpico',
      'Porto Alegre',
      'Residencial Rio Verde I',
      'Santa Mônica I',
      'Santa Mônica II',
      'São Lourenço Velho',
      'Solar dos Lagos',
      'Vila Carneiro',
      'Vila Nova',
    ],
    'Carmo de Minas': [
      'Centro',
    ],
  };

  const toggleArray = (array: string[], item: string) => {
    return array.includes(item) ? array.filter(i => i !== item) : [...array, item];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ========================================
    // VALIDAÇÕES OBRIGATÓRIAS
    // ========================================
    
    // 1. Nome
    if (!dados.nome.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, preencha seu nome completo!',
      });
      return;
    }
    
    // 2. Telefone
    if (!dados.telefone.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, preencha seu telefone!',
      });
      return;
    }
    
    // 3. Email
    if (!dados.email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, preencha seu e-mail!',
      });
      return;
    }
    
    // 4. Tipo de Interesse (comprar/alugar)
    if (!dados.tipoInteresse) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, selecione se deseja COMPRAR ou ALUGAR!',
      });
      return;
    }
    
    // 5. Valor Máximo
    if (!dados.valorMaximo) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, informe o valor máximo que pode pagar!',
      });
      return;
    }
    
    // 6. Cidade
    if (!dados.cidade) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, selecione uma cidade!',
      });
      return;
    }
    
    // 7. Pelo menos 1 tipo de imóvel
    if (dados.tiposImovel.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, selecione pelo menos 1 tipo de imóvel!',
      });
      return;
    }
    
    setEnviando(true);
    
    try {
      // ========================================
      // ENVIAR PARA API COM AXIOS (MAIS SEGURO)
      // ========================================
      await api.post('/clientes', {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        tipoInteresse: dados.tipoInteresse.toUpperCase(),
        valorMinimo: dados.valorMinimo ? parseFloat(dados.valorMinimo) : undefined,
        valorMaximo: parseFloat(dados.valorMaximo),
        cidade: dados.cidade,
        estado: 'MG',
        bairrosPreferidos: dados.bairrosPreferidos.length > 0 ? dados.bairrosPreferidos : undefined,
        tiposImovel: dados.tiposImovel.length > 0 ? dados.tiposImovel : undefined,
        observacoes: dados.observacoes || undefined,
      });

      // Sucesso!
      setSucesso(true);
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || error.message || 'Erro ao cadastrar';
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: mensagemErro,
      });
    } finally {
      setEnviando(false);
    }
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-emerald-800 mb-2">Cliente cadastrado!</h3>
          <p className="text-emerald-600 mb-6">O cliente foi cadastrado com sucesso e já está disponível no sistema.</p>
          <button onClick={() => setSucesso(false)} className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
            Cadastrar outro cliente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🏠</span>
              <h1 className="text-2xl font-bold text-blue-600">ImoveisMatch</h1>
            </div>
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">← Voltar</a>
          </div>
        </div>
      </header>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">
          👤 Cadastrar Cliente
        </h1>
        <p className="text-gray-600">
          Cadastre um novo cliente e seus interesses no sistema
        </p>
      </div>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Cadastro Gratuito
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Cadastre seu interesse</h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Preencha o formulário abaixo e receba notificações automáticas de imóveis compatíveis.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Dados Pessoais */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Dados Pessoais
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                  <input
                    type="text"
                    required
                    value={dados.nome}
                    onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={dados.telefone}
                      onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
                      placeholder="(31) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      required
                      value={dados.email}
                      onChange={(e) => setDados({ ...dados, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Interesse */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg>
                  O que você procura?
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Interesse *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDados({ ...dados, tipoInteresse: 'comprar' })}
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${dados.tipoInteresse === 'comprar' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                    >
                      <svg className={`w-5 h-5 ${dados.tipoInteresse === 'comprar' ? 'text-emerald-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
                      <span className="font-semibold text-gray-700">Comprar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDados({ ...dados, tipoInteresse: 'alugar' })}
                      className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${dados.tipoInteresse === 'alugar' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                    >
                      <svg className={`w-5 h-5 ${dados.tipoInteresse === 'alugar' ? 'text-emerald-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                      <span className="font-semibold text-gray-700">Alugar</span>
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor mínimo (R$)</label>
                    <input
                      type="number"
                      value={dados.valorMinimo}
                      onChange={(e) => setDados({ ...dados, valorMinimo: e.target.value })}
                      placeholder="0,00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor máximo (R$) *</label>
                    <input
                      type="number"
                      required
                      value={dados.valorMaximo}
                      onChange={(e) => setDados({ ...dados, valorMaximo: e.target.value })}
                      placeholder="0,00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Tipos de Imóveis */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Tipos de Imóveis
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Selecione os tipos desejados</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                    {tiposDisponiveis.map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() => setDados({ ...dados, tiposImovel: toggleArray(dados.tiposImovel, tipo) })}
                        className="flex items-center gap-3 cursor-pointer select-none text-left"
                      >
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${dados.tiposImovel.includes(tipo) ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${dados.tiposImovel.includes(tipo) ? 'translate-x-6' : 'translate-x-1'}`}></span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{tipo}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Subtipos de Imóveis</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                    {subtiposDisponiveis.map((subtipo) => (
                      <button
                        key={subtipo}
                        type="button"
                        onClick={() => setDados({ ...dados, subtiposImovel: toggleArray(dados.subtiposImovel, subtipo) })}
                        className="flex items-center gap-3 cursor-pointer select-none text-left"
                      >
                        <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${dados.subtiposImovel.includes(subtipo) ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${dados.subtiposImovel.includes(subtipo) ? 'translate-x-6' : 'translate-x-1'}`}></span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{subtipo}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Localização */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Localização
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Selecione a cidade *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cidadesDisponiveis.map((cidade) => {
                      const isSelected = dados.cidade === cidade;
                      const isDisabled = !!(dados.cidade && !isSelected);
                      return (
                        <button
                          key={cidade}
                          type="button"
                          onClick={() => setDados({ ...dados, cidade })}
                          disabled={isDisabled}
                          className={`relative flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${isSelected ? 'border-emerald-500 bg-emerald-50' : (isDisabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300')}`}
                        >
                          <span className={`font-medium text-sm ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>{cidade}</span>
                          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${isSelected ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${isSelected ? 'translate-x-6' : 'translate-x-1'}`}></span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {dados.cidade && bairrosPorCidade[dados.cidade] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Bairros preferidos em {dados.cidade}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {bairrosPorCidade[dados.cidade].map((bairro) => (
                        <button
                          key={bairro}
                          type="button"
                          onClick={() => setDados({ ...dados, bairrosPreferidos: toggleArray(dados.bairrosPreferidos, bairro) })}
                          className="flex items-center gap-3 cursor-pointer select-none text-left"
                        >
                          <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${dados.bairrosPreferidos.includes(bairro) ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${dados.bairrosPreferidos.includes(bairro) ? 'translate-x-6' : 'translate-x-1'}`}></span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{bairro}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <textarea
                    rows={3}
                    value={dados.observacoes}
                    onChange={(e) => setDados({ ...dados, observacoes: e.target.value })}
                    placeholder="Preferências adicionais: número de quartos, suíte, garagem..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none text-gray-900"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={enviando}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-wait transition-all duration-200 flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    Salvando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Cadastrar meu interesse
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">Seus dados são protegidos e não serão compartilhados com terceiros.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
