'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, User } from 'lucide-react';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  tipoInteresse: string;
  valorMinimo: number | null;
  valorMaximo: number | null;
  cidade: string;
  tiposImovel: string;
}

interface ClientSearchSelectProps {
  clientes: Cliente[];
  clienteSelecionado: Cliente | null;
  onSelect: (cliente: Cliente) => void;
  placeholder?: string;
}

export default function ClientSearchSelect({
  clientes,
  clienteSelecionado,
  onSelect,
  placeholder = 'Buscar cliente por nome...'
}: ClientSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtra clientes baseado no termo de busca
  const filteredClientes = searchTerm.trim() === ''
    ? clientes.slice(0, 50) // Mostra primeiros 50 se não houver busca
    : clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.cidade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 100); // Limita a 100 resultados para performance

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reseta highlight quando a lista filtrada muda
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  // Foca no input quando abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredClientes.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter' && filteredClientes.length > 0) {
      e.preventDefault();
      onSelect(filteredClientes[highlightedIndex]);
      setIsOpen(false);
      setSearchTerm('');
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (cliente: Cliente) => {
    onSelect(cliente);
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(null as any);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Campo de seleção / busca */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[48px] px-4 py-3 bg-slate-800 border rounded-xl cursor-pointer transition-all ${
          isOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/10 hover:border-white/20'
        }`}
      >
        {clienteSelecionado ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">{clienteSelecionado.nome}</p>
                <p className="text-xs text-slate-400">
                  {clienteSelecionado.cidade} • {clienteSelecionado.tiposImovel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearSelection}
                className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-400">
              <Search className="w-5 h-5" />
              <span>{placeholder}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        )}
      </div>

      {/* Dropdown com busca */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 max-h-[400px] flex flex-col">
          {/* Campo de busca dentro do dropdown */}
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite para buscar..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {filteredClientes.length} de {clientes.length} clientes
              {searchTerm && ` (filtrado por "${searchTerm}")`}
            </p>
          </div>

          {/* Lista de resultados */}
          <div className="overflow-y-auto flex-1">
            {filteredClientes.length === 0 ? (
              <div className="p-4 text-center text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum cliente encontrado</p>
              </div>
            ) : (
              filteredClientes.map((cliente, index) => (
                <button
                  key={cliente.id}
                  onClick={() => handleSelect(cliente)}
                  className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${
                    index === highlightedIndex
                      ? 'bg-blue-500/20 border-l-2 border-blue-500'
                      : 'hover:bg-white/5 border-l-2 border-transparent'
                  } ${clienteSelecionado?.id === cliente.id ? 'bg-blue-500/10' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    clienteSelecionado?.id === cliente.id ? 'bg-blue-500/30' : 'bg-slate-700'
                  }`}>
                    <User className={`w-4 h-4 ${clienteSelecionado?.id === cliente.id ? 'text-blue-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${clienteSelecionado?.id === cliente.id ? 'text-blue-400' : 'text-white'}`}>
                      {cliente.nome}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {cliente.cidade} • {cliente.tiposImovel}
                    </p>
                  </div>
                  {clienteSelecionado?.id === cliente.id && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
