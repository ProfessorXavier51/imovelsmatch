'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '@/lib/api';

export default function CadastroImovelPage() {
  const [dados, setDados] = useState({
    titulo: '',
    descricao: '',
    operacao: '', // venda ou aluguel
    tipo_imovel: '',
    subtipo_imovel: '',
    valor: '',
    valor_condominio: '',
    valor_iptu: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: 'MG',
    cep: '',
    quartos: '',
    suites: '',
    banheiros: '',
    vagas: '',
    area_m2: '',
    area_terreno_m2: '',
    aceita_financiamento: false,
    aceita_permuta: false,
    mobiliado: false,
    destaque: false,
    observacoes: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // ========================================
  // DADOS ESTÁTICOS
  // ========================================
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ========================================
    // VALIDAÇÕES OBRIGATÓRIAS
    // ========================================
    
    if (!dados.titulo.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, preencha o título do imóvel!',
      });
      return;
    }
    
    if (!dados.operacao) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, selecione VENDA ou ALUGUEL!',
      });
      return;
    }
    
    if (!dados.tipo_imovel) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, selecione o tipo de imóvel!',
      });
      return;
    }
    
    if (!dados.valor) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, informe o valor do imóvel!',
      });
      return;
    }
    
    if (!dados.cidade) {
      Swal.fire({
        icon: 'error',
        title: 'Campo obrigatório',
        text: 'Por favor, selecione a cidade!',
      });
      return;
    }
    
    setEnviando(true);
    
    try {
      // ========================================
      // ENVIAR PARA API COM AXIOS
      // ========================================
      await api.post('/imoveis', {
        titulo: dados.titulo,
        descricao: dados.descricao || undefined,
        operacao: dados.operacao.toUpperCase(),
        tipo_imovel: dados.tipo_imovel,
        subtipo_imovel: dados.subtipo_imovel || undefined,
        valor: parseFloat(dados.valor),
        valor_condominio: dados.valor_condominio ? parseFloat(dados.valor_condominio) : undefined,
        valor_iptu: dados.valor_iptu ? parseFloat(dados.valor_iptu) : undefined,
        endereco: dados.endereco || undefined,
        numero: dados.numero || undefined,
        complemento: dados.complemento || undefined,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
        cep: dados.cep || undefined,
        quartos: dados.quartos ? parseInt(dados.quartos) : undefined,
        suites: dados.suites ? parseInt(dados.suites) : undefined,
        banheiros: dados.banheiros ? parseInt(dados.banheiros) : undefined,
        vagas: dados.vagas ? parseInt(dados.vagas) : undefined,
        area_m2: dados.area_m2 ? parseFloat(dados.area_m2) : undefined,
        area_terreno_m2: dados.area_terreno_m2 ? parseFloat(dados.area_terreno_m2) : undefined,
        aceita_financiamento: dados.aceita_financiamento,
        aceita_permuta: dados.aceita_permuta,
        mobiliado: dados.mobiliado,
        destaque: dados.destaque,
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
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Imóvel cadastrado!</h2>
          <p className="text-emerald-700 mb-6">
            O imóvel foi cadastrado com sucesso e já está disponível no sistema.
          </p>
          <button
            onClick={() => setSucesso(false)}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Cadastrar outro imóvel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            🏠 Cadastrar Imóvel
          </h1>
          <p className="text-gray-600">
            Preencha os dados do imóvel para cadastrá-lo no sistema
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Dados Básicos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Dados Básicos
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título do Imóvel *</label>
              <input
                type="text"
                required
                value={dados.titulo}
                onChange={(e) => setDados({ ...dados, titulo: e.target.value })}
                placeholder="Ex: Casa com 3 quartos no Centro"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                rows={4}
                value={dados.descricao}
                onChange={(e) => setDados({ ...dados, descricao: e.target.value })}
                placeholder="Descreva o imóvel com detalhes..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none text-gray-900"
              />
            </div>
          </div>

          {/* Operação e Tipo */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Tipo e Operação
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operação *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDados({ ...dados, operacao: 'venda' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${dados.operacao === 'venda' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                >
                  <span className="font-semibold text-gray-700">Venda</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDados({ ...dados, operacao: 'aluguel' })}
                  className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${dados.operacao === 'aluguel' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                >
                  <span className="font-semibold text-gray-700">Aluguel</span>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Imóvel *</label>
                <select
                  required
                  value={dados.tipo_imovel}
                  onChange={(e) => setDados({ ...dados, tipo_imovel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                >
                  <option value="">Selecione...</option>
                  {tiposDisponiveis.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtipo</label>
                <select
                  value={dados.subtipo_imovel}
                  onChange={(e) => setDados({ ...dados, subtipo_imovel: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                >
                  <option value="">Selecione...</option>
                  {subtiposDisponiveis.map((subtipo) => (
                    <option key={subtipo} value={subtipo}>{subtipo}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Valores
            </h3>

            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor *</label>
                <input
                  type="number"
                  required
                  value={dados.valor}
                  onChange={(e) => setDados({ ...dados, valor: e.target.value })}
                  placeholder="0,00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condomínio</label>
                <input
                  type="number"
                  value={dados.valor_condominio}
                  onChange={(e) => setDados({ ...dados, valor_condominio: e.target.value })}
                  placeholder="0,00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IPTU</label>
                <input
                  type="number"
                  value={dados.valor_iptu}
                  onChange={(e) => setDados({ ...dados, valor_iptu: e.target.value })}
                  placeholder="0,00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Localização */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Localização
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                <select
                  required
                  value={dados.cidade}
                  onChange={(e) => setDados({ ...dados, cidade: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                >
                  <option value="">Selecione...</option>
                  {cidadesDisponiveis.map((cidade) => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                <input
                  type="text"
                  value={dados.bairro}
                  onChange={(e) => setDados({ ...dados, bairro: e.target.value })}
                  placeholder="Nome do bairro"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input
                  type="text"
                  value={dados.endereco}
                  onChange={(e) => setDados({ ...dados, endereco: e.target.value })}
                  placeholder="Rua, Avenida..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                <input
                  type="text"
                  value={dados.numero}
                  onChange={(e) => setDados({ ...dados, numero: e.target.value })}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                <input
                  type="text"
                  value={dados.complemento}
                  onChange={(e) => setDados({ ...dados, complemento: e.target.value })}
                  placeholder="Apto, Bloco..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                <input
                  type="text"
                  value={dados.cep}
                  onChange={(e) => setDados({ ...dados, cep: e.target.value })}
                  placeholder="00000-000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Características
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quartos</label>
                <input
                  type="number"
                  value={dados.quartos}
                  onChange={(e) => setDados({ ...dados, quartos: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suítes</label>
                <input
                  type="number"
                  value={dados.suites}
                  onChange={(e) => setDados({ ...dados, suites: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banheiros</label>
                <input
                  type="number"
                  value={dados.banheiros}
                  onChange={(e) => setDados({ ...dados, banheiros: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vagas</label>
                <input
                  type="number"
                  value={dados.vagas}
                  onChange={(e) => setDados({ ...dados, vagas: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                <input
                  type="number"
                  value={dados.area_m2}
                  onChange={(e) => setDados({ ...dados, area_m2: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Área Terreno (m²)</label>
                <input
                  type="number"
                  value={dados.area_terreno_m2}
                  onChange={(e) => setDados({ ...dados, area_terreno_m2: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Opções */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Opções
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDados({ ...dados, aceita_financiamento: !dados.aceita_financiamento })}
                className="flex items-center gap-3 cursor-pointer select-none text-left"
              >
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${dados.aceita_financiamento ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${dados.aceita_financiamento ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </div>
                <span className="text-sm font-medium text-gray-700">Aceita Financiamento</span>
              </button>

              <button
                type="button"
                onClick={() => setDados({ ...dados, aceita_permuta: !dados.aceita_permuta })}
                className="flex items-center gap-3 cursor-pointer select-none text-left"
              >
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${dados.aceita_permuta ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${dados.aceita_permuta ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </div>
                <span className="text-sm font-medium text-gray-700">Aceita Permuta</span>
              </button>

              <button
                type="button"
                onClick={() => setDados({ ...dados, mobiliado: !dados.mobiliado })}
                className="flex items-center gap-3 cursor-pointer select-none text-left"
              >
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${dados.mobiliado ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${dados.mobiliado ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </div>
                <span className="text-sm font-medium text-gray-700">Mobiliado</span>
              </button>

              <button
                type="button"
                onClick={() => setDados({ ...dados, destaque: !dados.destaque })}
                className="flex items-center gap-3 cursor-pointer select-none text-left"
              >
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${dados.destaque ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${dados.destaque ? 'translate-x-6' : 'translate-x-1'}`}></span>
                </div>
                <span className="text-sm font-medium text-gray-700">Destaque</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <textarea
                rows={3}
                value={dados.observacoes}
                onChange={(e) => setDados({ ...dados, observacoes: e.target.value })}
                placeholder="Informações adicionais sobre o imóvel..."
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
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cadastrando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Cadastrar Imóvel
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
