# 🏗️ NOVA ESTRUTURA - ImoveisMatch

**Data:** 14/04/2026  
**Modelo:** Página Pública + Dashboard Admin (estilo Filament)

---

## 🎯 **CONCEITO:**

### **Inspirado em:**
- 🏠 **ZAP Imóveis** - Página pública
- 🔐 **Filament** - Dashboard admin

---

## 📊 **ESTRUTURA COMPLETA:**

```
┌─────────────────────────────────────────────────────┐
│  🌐 PÁGINA INICIAL (Pública - SEM LOGIN)           │
│  Rota: /                                            │
│  ─────────────────────────────────────────────────  │
│  ✅ Busca de imóveis disponíveis                    │
│  ✅ Filtros (comprar/alugar, cidade, preço)         │
│  ✅ Lista de imóveis com fotos                      │
│  ✅ Detalhes do imóvel                              │
│  ✅ Formulário: "Não achou? Cadastre seu interesse" │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  🔐 DASHBOARD ADMIN (Protegido - COM LOGIN)         │
│  Rota: /admin                                       │
│  ─────────────────────────────────────────────────  │
│  ✅ Login obrigatório                               │
│  ✅ CRUD de Clientes                                │
│  ✅ CRUD de Imóveis                                 │
│  ✅ Sistema de Matching                             │
│  ✅ Notificações                                    │
│  ✅ Relatórios                                      │
└─────────────────────────────────────────────────────┘
```

---

## 🌐 **PÁGINA INICIAL (Pública):**

### **Rota:** `/`

### **Funcionalidades:**

1. **🔍 BUSCA DE IMÓVEIS:**
   ```
   ┌─────────────────────────────────────┐
   │  🔍 Buscar Imóveis                  │
   │  ─────────────────────────────────  │
   │  [ ] Comprar  [ ] Alugar            │
   │  Cidade: [_________]                │
   │  Preço: [___] até [___]             │
   │  Quartos: [___]                     │
   │  [Buscar]                           │
   └─────────────────────────────────────┘
   ```

2. **📋 LISTA DE IMÓVEIS:**
   ```
   ┌─────────────────────────────────────┐
   │  🏠 Casa 3 quartos - R$ 500.000     │
   │  📍 São Paulo, SP                   │
   │  [Ver detalhes]                     │
   └─────────────────────────────────────┘
   ```

3. **❌ NÃO ACHOU? CADASTRE:**
   ```
   ┌─────────────────────────────────────┐
   │  😞 Não encontrou o que procura?    │
   │  ─────────────────────────────────  │
   │  Cadastre seu interesse e te        │
   │  avisamos quando aparecer!          │
   │  [Cadastrar Interesse]              │
   └─────────────────────────────────────┘
   ```

4. **📝 FORMULÁRIO DE INTERESSE:**
   ```
   ┌─────────────────────────────────────┐
   │  📝 Cadastre seu Interesse          │
   │  ─────────────────────────────────  │
   │  Nome: [_________]                  │
   │  Email: [_________]                 │
   │  Telefone: [_________]              │
   │  Tipo: [ ] Comprar [ ] Alugar       │
   │  Cidade: [_________]                │
   │  Preço máximo: [_________]          │
   │  Quartos: [___]                     │
   │  [Cadastrar]                        │
   └─────────────────────────────────────┘
   ```

---

## 🔐 **DASHBOARD ADMIN:**

### **Rota:** `/admin`

### **Funcionalidades:**

1. **🔑 LOGIN:**
   ```
   ┌─────────────────────────────────────┐
   │  🔐 Login - ImoveisMatch            │
   │  ─────────────────────────────────  │
   │  Email: [_________]                 │
   │  Senha: [_________]                 │
   │  [Entrar]                           │
   └─────────────────────────────────────┘
   ```

2. **📊 DASHBOARD:**
   ```
   ┌─────────────────────────────────────┐
   │  📊 Dashboard                       │
   │  ─────────────────────────────────  │
   │  👥 100 Clientes                    │
   │  🏠 50 Imóveis                      │
   │  💖 25 Matches                      │
   └─────────────────────────────────────┘
   ```

3. **👥 CLIENTES:**
   ```
   ┌─────────────────────────────────────┐
   │  👥 Clientes                        │
   │  ─────────────────────────────────  │
   │  [+ Novo Cliente]                   │
   │  ─────────────────────────────────  │
   │  📋 Lista de Clientes               │
   │  [Editar] [Deletar]                 │
   └─────────────────────────────────────┘
   ```

4. **🏠 IMÓVEIS:**
   ```
   ┌─────────────────────────────────────┐
   │  🏠 Imóveis                         │
   │  ─────────────────────────────────  │
   │  [+ Novo Imóvel]                    │
   │  ─────────────────────────────────  │
   │  📋 Lista de Imóveis                │
   │  [Editar] [Deletar]                 │
   └─────────────────────────────────────┘
   ```

5. **💖 MATCHES:**
   ```
   ┌─────────────────────────────────────┐
   │  💖 Matches                         │
   │  ─────────────────────────────────  │
   │  Cliente X ↔ Imóvel Y               │
   │  [Notificar Cliente]                │
   └─────────────────────────────────────┘
   ```

---

## 📁 **ESTRUTURA DE PASTAS:**

```
frontend/
├── app/
│   ├── (public)/                    # Rotas públicas
│   │   ├── page.tsx                 # Página inicial
│   │   ├── imoveis/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Detalhes do imóvel
│   │   └── cadastro-interesse/
│   │       └── page.tsx             # Formulário de interesse
│   │
│   └── (admin)/                     # Rotas protegidas
│       ├── layout.tsx               # Layout admin
│       ├── login/
│       │   └── page.tsx             # Login
│       ├── dashboard/
│       │   └── page.tsx             # Dashboard
│       ├── clientes/
│       │   ├── page.tsx             # Lista
│       │   ├── [id]/
│       │   │   └── page.tsx         # Editar
│       │   └── novo/
│       │       └── page.tsx         # Criar
│       ├── imoveis/
│       │   ├── page.tsx             # Lista
│       │   ├── [id]/
│       │   │   └── page.tsx         # Editar
│       │   └── novo/
│       │       └── page.tsx         # Criar
│       └── matches/
│           └── page.tsx             # Matches
```

---

## 🎨 **DESIGN:**

### **Página Pública:**
- 🎨 Design moderno e limpo
- 📱 Responsivo (mobile-first)
- 🖼️ Imagens grandes dos imóveis
- 🔍 Busca destacada no topo
- 💚 Cores: Verde/Azul (confiança)

### **Dashboard Admin:**
- 🎨 Estilo Filament (clean e profissional)
- 📊 Cards com estatísticas
- 📋 Tabelas com filtros
- 🔔 Notificações
- 💙 Cores: Azul/Cinza (profissional)

---

## 🔄 **FLUXO DO USUÁRIO:**

### **Cliente (Público):**

```
1. Acessa site (/)
   ↓
2. Busca imóveis
   ↓
3a. ACHOU → Ver detalhes → Contato
3b. NÃO ACHOU → Cadastra interesse
   ↓
4. Recebe notificação quando aparecer
```

### **Admin:**

```
1. Acessa /admin/login
   ↓
2. Faz login
   ↓
3. Vê dashboard
   ↓
4. Gerencia clientes/imóveis
   ↓
5. Sistema faz matching automático
   ↓
6. Notifica clientes
```

---

## 🚀 **PRÓXIMOS PASSOS:**

### **FASE 1: Página Pública (2-3 dias)**
1. ✅ Página inicial com busca
2. ✅ Lista de imóveis
3. ✅ Detalhes do imóvel
4. ✅ Formulário de interesse

### **FASE 2: Dashboard Admin (3-4 dias)**
1. ✅ Login
2. ✅ Dashboard
3. ✅ CRUD Clientes
4. ✅ CRUD Imóveis
5. ✅ Matches

### **FASE 3: Integrações (2-3 dias)**
1. ✅ Notificações por email
2. ✅ WhatsApp (opcional)
3. ✅ Upload de imagens
4. ✅ Mapas

---

## 💡 **DIFERENCIAIS:**

1. ✅ **Cliente cadastra interesse** - Não precisa ligar
2. ✅ **Matching automático** - Sistema avisa quando aparecer
3. ✅ **Sem login para buscar** - Facilita acesso
4. ✅ **Dashboard profissional** - Estilo Filament

---

## 🎯 **TECNOLOGIAS:**

- ⚡ Next.js 16 (App Router)
- 🎨 TailwindCSS
- 🧩 shadcn/ui
- 📊 React Query
- 🗺️ Leaflet (mapas)
- 📧 Nodemailer (emails)

---

**BORA COMEÇAR A CRIAR?** 🚀
