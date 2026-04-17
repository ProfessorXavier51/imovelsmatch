# 🚀 ImoveisMatch - Frontend

Sistema de matching imobiliário inteligente - Interface Web com Next.js 14

---

## 📋 ÍNDICE

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando](#executando)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## 📖 SOBRE

Frontend moderno construído com Next.js 14 (App Router), TypeScript e TailwindCSS.

### **🎯 FUNCIONALIDADES:**

- ✅ Autenticação JWT
- ✅ CRUD de Clientes
- ✅ CRUD de Imóveis
- ✅ Sistema de Matching
- ✅ Upload de Imagens
- ✅ Mapas Interativos
- ✅ Notificações em Tempo Real
- ✅ Dashboard com Métricas

---

## 🛠️ TECNOLOGIAS

### **Core:**
- ⚡ **Next.js 14** - Framework React com App Router
- 🔷 **TypeScript** - Tipagem estática
- ⚛️ **React 18** - Biblioteca UI

### **Estilização:**
- 🎨 **TailwindCSS** - Utility-first CSS
- 🧩 **shadcn/ui** - Componentes reutilizáveis
- 🎭 **Lucide Icons** - Ícones modernos

### **Estado e Dados:**
- 📊 **React Query** - Cache e sincronização de dados
- 🌐 **Axios** - Cliente HTTP
- 📝 **React Hook Form** - Gerenciamento de formulários
- ✅ **Zod** - Validação de schemas

### **Mapas:**
- 🗺️ **Leaflet** - Mapas interativos
- 📍 **React Leaflet** - Integração com React

### **UX:**
- 🔔 **React Hot Toast** - Notificações
- 🎬 **Framer Motion** - Animações (opcional)

---

## 📦 PRÉ-REQUISITOS

Antes de começar, certifique-se de ter instalado:

- ✅ **Node.js** >= 18.0.0
- ✅ **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- ✅ **Backend** rodando em `http://localhost:3001`

---

## 🚀 INSTALAÇÃO

### **PASSO 1: Clonar o repositório**

```bash
# Se ainda não clonou
git clone <url-do-repositorio>
cd imovelsmatch/frontend
```

### **PASSO 2: Instalar dependências**

```bash
npm install
```

**OU com Yarn:**

```bash
yarn install
```

### **PASSO 3: Configurar variáveis de ambiente**

Copie o arquivo `.env.local` e configure:

```bash
# Já existe um .env.local de exemplo
# Edite conforme necessário
```

**Variáveis obrigatórias:**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui
```

**Variáveis opcionais:**

```env
NEXT_PUBLIC_MAPBOX_TOKEN=seu-token-mapbox
```

---

## ⚙️ CONFIGURAÇÃO

### **1. Backend**

Certifique-se de que o backend está rodando:

```bash
cd ../backend
npm run start:dev
```

Backend deve estar em: `http://localhost:3001`

### **2. Banco de Dados**

O backend deve estar conectado ao MySQL.

---

## 🎮 EXECUTANDO

### **Modo Desenvolvimento:**

```bash
npm run dev
```

Acesse: **http://localhost:3000**

### **Build de Produção:**

```bash
npm run build
npm run start
```

### **Verificar Tipos:**

```bash
npm run type-check
```

### **Lint:**

```bash
npm run lint
```

---

## 📁 ESTRUTURA DO PROJETO

```
frontend/
├── 📱 app/                          # Next.js App Router
│   ├── (auth)/                      # Grupo de rotas de autenticação
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/                 # Grupo de rotas protegidas
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── clientes/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── novo/
│   │   │       └── page.tsx
│   │   ├── imoveis/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── novo/
│   │   │       └── page.tsx
│   │   └── matches/
│   │       └── page.tsx
│   │
│   ├── layout.tsx                   # Layout raiz
│   ├── page.tsx                     # Página inicial
│   └── globals.css                  # Estilos globais
│
├── 🧩 components/                   # Componentes reutilizáveis
│   ├── ui/                          # Componentes base (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── forms/                       # Formulários
│   │   ├── cliente-form.tsx
│   │   └── imovel-form.tsx
│   ├── tables/                      # Tabelas
│   │   ├── clientes-table.tsx
│   │   └── imoveis-table.tsx
│   ├── maps/                        # Mapas
│   │   └── imovel-map.tsx
│   └── providers.tsx                # Providers globais
│
├── 🔧 lib/                          # Utilitários
│   ├── api.ts                       # Cliente HTTP (Axios)
│   ├── auth.ts                      # Funções de autenticação
│   └── utils.ts                     # Helpers gerais
│
├── 📊 hooks/                        # Custom hooks
│   ├── use-clientes.ts              # Hook de clientes
│   ├── use-imoveis.ts               # Hook de imóveis
│   └── use-matches.ts               # Hook de matches
│
├── 🔐 types/                        # TypeScript types
│   ├── cliente.ts
│   ├── imovel.ts
│   └── match.ts
│
├── 🎨 styles/                       # Estilos adicionais
│   └── ...
│
├── 📄 Arquivos de configuração
│   ├── next.config.js               # Config do Next.js
│   ├── tailwind.config.ts           # Config do Tailwind
│   ├── tsconfig.json                # Config do TypeScript
│   ├── package.json                 # Dependências
│   └── .env.local                   # Variáveis de ambiente
│
└── 📚 README.md                     # Este arquivo
```

---

## 🎨 PADRÕES DE CÓDIGO

### **📝 COMENTÁRIOS ULTRA DETALHADOS**

Todos os arquivos seguem o padrão:

```typescript
// ============================================
// 📦 TIPO: nome-do-arquivo.tsx
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// [Descrição clara]
//
// 📚 ANALOGIA: [Comparação do mundo real]
// - [Pontos principais]
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// [Justificativa]
//
// ⏰ QUANDO USAR?
// [Situações de uso]
// ============================================

// 📦 ONDE: [Origem]
// 🎯 O QUE: [Descrição]
// 🤔 POR QUÊ: [Justificativa]
import { ... } from '...';

/**
 * 🏗️ COMPONENT: NomeDoComponente
 * 
 * 🎯 O QUE FAZ? [Descrição]
 * 📚 COMO? [Funcionamento]
 * 📍 ONDE? [Localização]
 * 🤔 POR QUÊ? [Justificativa]
 * ⏰ QUANDO? [Momento de uso]
 */
```

### **🎯 EMOJIS PADRÃO:**

- 🎯 **O QUE** - Descrição
- 📚 **COMO** - Funcionamento
- 📍 **ONDE** - Localização
- 🤔 **POR QUÊ** - Justificativa
- ⏰ **QUANDO** - Momento de uso

### **📏 CONVENÇÕES:**

- ✅ Componentes em PascalCase: `ClienteForm.tsx`
- ✅ Hooks em camelCase: `use-clientes.ts`
- ✅ Tipos em PascalCase: `Cliente`, `Imovel`
- ✅ Constantes em UPPER_CASE: `API_URL`
- ✅ Funções em camelCase: `formatCurrency()`

---

## 📜 SCRIPTS DISPONÍVEIS

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Cria build de produção
npm run start            # Inicia servidor de produção

# Qualidade de Código
npm run lint             # Verifica erros de lint
npm run type-check       # Verifica tipos TypeScript

# Limpeza
npm run clean            # Remove .next e node_modules
```

---

## 🔐 AUTENTICAÇÃO

O app usa **JWT** para autenticação:

1. **Login:** POST `/auth/login`
2. **Token** salvo no `localStorage`
3. **Interceptor** adiciona token automaticamente
4. **Redirect** para `/login` se token inválido

---

## 🗺️ MAPAS

Para usar mapas, configure o token do Mapbox:

1. Crie conta em: https://account.mapbox.com/
2. Copie o token
3. Adicione em `.env.local`:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
```

---

## 📊 REACT QUERY

Cache configurado para:

- ⏱️ **Stale Time:** 5 minutos
- 🔄 **Refetch on Focus:** Desabilitado
- 🔁 **Retry:** 1 tentativa

---

## 🎨 TAILWIND CSS

Cores customizadas:

- 🔵 **Primary:** Azul (#3b82f6)
- 🟢 **Success:** Verde (#22c55e)
- 🔴 **Error:** Vermelho (#ef4444)
- 🟡 **Warning:** Amarelo (#f59e0b)

---

## 🐛 TROUBLESHOOTING

### **Erro: Cannot find module**

```bash
npm install
```

### **Erro: Port 3000 already in use**

```bash
# Matar processo na porta 3000
npx kill-port 3000
```

### **Erro: Backend não responde**

Verifique se o backend está rodando em `http://localhost:3001`

---

## 📝 PRÓXIMOS PASSOS

1. ✅ Instalar dependências
2. ✅ Configurar .env.local
3. ✅ Rodar backend
4. ✅ Rodar frontend
5. ✅ Acessar http://localhost:3000
6. ✅ Fazer login
7. ✅ Começar a usar!

---

## 🎉 PRONTO!

Seu frontend está configurado e pronto para uso!

**Acesse:** http://localhost:3000

**Documentação da API:** http://localhost:3001/api/docs

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

**Desenvolvido com ❤️ e muito ☕**
