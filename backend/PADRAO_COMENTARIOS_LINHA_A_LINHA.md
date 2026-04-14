# 📚 PADRÃO DE COMENTÁRIOS LINHA A LINHA

## 🎯 OBJETIVO

**CADA LINHA DE CÓDIGO** deve ter comentários explicando:
- **O QUE** ela faz
- **COMO** ela faz
- **ONDE** ela está/atua
- **POR QUÊ** ela existe
- **QUANDO** ela é executada

---

## ✅ EXEMPLO COMPLETO: UploadController

```typescript
// ============================================
// 📦 CONTROLLER: upload.controller.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Recebe imagens do frontend e manda pro Cloudinary guardar na nuvem.
//
// 📚 ANALOGIA: O FOTÓGRAFO DA IMOBILIÁRIA 📸
// - Cliente manda foto da casa.
// - Fotógrafo (Controller) pega a foto.
// - Manda pro estúdio (Cloudinary) revelar e guardar.
// - Devolve o link da foto pra todo mundo ver.
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Não dá pra guardar imagem no banco de dados (fica gigante!).
// A gente guarda no Cloudinary e só salva a URL no banco.
//
// 🎮 QUANDO USAR?
// Quando o corretor tá cadastrando um imóvel e quer adicionar fotos.
// ============================================

// 📦 ONDE: Importa decorators do NestJS pra criar rotas HTTP
import { Controller, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';

// 📦 ONDE: Importa interceptor do Multer pra lidar com arquivos
import { FileInterceptor } from '@nestjs/platform-express';

// 📦 ONDE: Importa decorators do Swagger pra documentar a API
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

// 🔒 ONDE: Importa o guarda JWT pra proteger a rota
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';

// ☁️ ONDE: Importa o serviço que faz upload pro Cloudinary
import { CloudinaryService } from '../../infrastructure/upload/cloudinary.service';

/**
 * 🏗️ CLASSE: UploadController
 * 
 * 🎯 O QUE É? O balcão de atendimento de fotos.
 * 📚 COMO? Recebe requisições HTTP e delega pro CloudinaryService.
 * 📍 ONDE? Rota base: /upload
 * 🤔 POR QUÊ? Pra separar a lógica HTTP da lógica de upload.
 * ⏰ QUANDO? Sempre que o frontend precisar enviar uma imagem.
 */
@ApiTags('upload') // 🏷️ O QUE: Agrupa no Swagger sob a tag "upload"
@ApiBearerAuth() // 🔑 O QUE: Indica que precisa de token JWT no Swagger
@UseGuards(JwtAuthGuard) // 👮 O QUE: Aplica proteção JWT em TODAS as rotas deste controller
@Controller('upload') // 🌐 O QUE: Define prefixo de rota "/upload"
export class UploadController {
  
  /**
   * 🏗️ CONSTRUTOR
   * 
   * 🎯 O QUE FAZ? Injeta o CloudinaryService.
   * 📚 COMO? O NestJS vê "private" e automaticamente injeta a dependência.
   * 🤔 POR QUÊ? Pra poder usar o serviço de upload dentro do controller.
   * ⏰ QUANDO? Na criação da instância do controller (boot do app).
   */
  constructor(
    private cloudinaryService: CloudinaryService // ☁️ Serviço injetado automaticamente
  ) {}

  /**
   * 📸 MÉTODO: uploadImage
   * 
   * 🎯 O QUE FAZ? Recebe uma imagem e faz upload pro Cloudinary.
   * 📚 COMO? Usa FileInterceptor pra extrair o arquivo da requisição.
   * 📍 ONDE? Rota: POST /upload/image
   * 🤔 POR QUÊ? Pra permitir que o frontend envie fotos de imóveis.
   * ⏰ QUANDO? Quando o corretor cadastra/edita um imóvel com fotos.
   * 
   * 📥 ENTRADA: file (multipart/form-data)
   * 📤 SAÍDA: { url: "https://cloudinary.com/..." }
   */
  @Post('image') // 🌐 O QUE: Define método HTTP POST na rota /upload/image
  @ApiConsumes('multipart/form-data') // 📄 O QUE: Informa ao Swagger que aceita arquivos
  @ApiBody({ // 📋 O QUE: Documenta o corpo da requisição no Swagger
    schema: {
      type: 'object', // 🎯 Tipo do corpo: objeto
      properties: {
        file: { // 📁 Campo "file"
          type: 'string', // 🎯 Tipo: string (binário)
          format: 'binary', // 🎯 Formato: arquivo binário
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) // 🎣 O QUE: Intercepta e extrai o arquivo do campo "file"
  async uploadImage(
    @UploadedFile() file: any // 📁 O QUE: Injeta o arquivo extraído pelo interceptor
  ) {
    // ☁️ PASSO 1: Envia arquivo pro Cloudinary e aguarda a URL de retorno
    // 🎯 O QUE: Chama o método uploadImage do CloudinaryService
    // 📚 COMO: Passa o arquivo recebido como parâmetro
    // 🤔 POR QUÊ: Pra guardar a imagem na nuvem e obter URL pública
    // ⏰ QUANDO: Imediatamente após receber o arquivo
    const url = await this.cloudinaryService.uploadImage(file);
    
    // 📤 PASSO 2: Retorna a URL pro frontend
    // 🎯 O QUE: Retorna objeto com a URL da imagem
    // 📚 COMO: Formato JSON { url: "..." }
    // 🤔 POR QUÊ: Pra o frontend poder salvar essa URL no banco
    // ⏰ QUANDO: Após o upload ser concluído com sucesso
    return { url };
  }
}
```

---

## 📋 CHECKLIST DE COMENTÁRIOS

### ✅ CABEÇALHO DO ARQUIVO (Sempre no topo):
```typescript
// ============================================
// 📦 TIPO: nome-do-arquivo.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// [Explicação clara]
//
// 📚 ANALOGIA: [Comparação do mundo real]
// - [Ponto 1]
// - [Ponto 2]
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// [Justificativa]
//
// 🎮 QUANDO USAR?
// [Situações de uso]
// ============================================
```

### ✅ IMPORTS (Cada import ou grupo):
```typescript
// 📦 ONDE: [De onde vem]
// 🎯 O QUE: [O que importa]
// 🤔 POR QUÊ: [Por que precisa]
import { ... } from '...';
```

### ✅ CLASSES:
```typescript
/**
 * 🏗️ CLASSE: NomeDaClasse
 * 
 * 🎯 O QUE É? [Descrição]
 * 📚 COMO? [Como funciona]
 * 📍 ONDE? [Onde atua]
 * 🤔 POR QUÊ? [Justificativa]
 * ⏰ QUANDO? [Quando é usado]
 */
@Decorator() // 🏷️ O QUE: [Explicação do decorator]
export class NomeDaClasse {
```

### ✅ CONSTRUTORES:
```typescript
/**
 * 🏗️ CONSTRUTOR
 * 
 * 🎯 O QUE FAZ? [Descrição]
 * 📚 COMO? [Como injeta]
 * 🤔 POR QUÊ? [Justificativa]
 * ⏰ QUANDO? [Quando executa]
 */
constructor(
  @Decorator() // 🔑 O QUE: [Explicação]
  private dependency: Type, // 📦 [Descrição da dependência]
) {}
```

### ✅ MÉTODOS:
```typescript
/**
 * 🚀 MÉTODO: nomeDoMetodo
 * 
 * 🎯 O QUE FAZ? [Descrição]
 * 📚 COMO? [Como funciona]
 * 📍 ONDE? [Onde é chamado]
 * 🤔 POR QUÊ? [Justificativa]
 * ⏰ QUANDO? [Quando executa]
 * 
 * 📥 ENTRADA: [Parâmetros]
 * 📤 SAÍDA: [Retorno]
 * ⚠️ ERRO: [Exceções possíveis]
 */
@Decorator() // 🌐 O QUE: [Explicação]
async nomeDoMetodo(
  @Decorator() param: Type // 📁 O QUE: [Explicação]
) {
```

### ✅ LINHAS DE CÓDIGO (Dentro de métodos):
```typescript
// ========================================
// 🔍 PASSO 1: [TÍTULO DO PASSO]
// ========================================
// 🎯 O QUE: [O que faz]
// 📚 COMO: [Como faz]
// 🤔 POR QUÊ: [Por que faz]
// ⏰ QUANDO: [Quando executa]
const variavel = await algumMetodo();

// 🎯 O QUE: [Explicação da condição]
// 📚 COMO: [Como verifica]
// 🤔 POR QUÊ: [Por que verifica]
// ⏰ QUANDO: [Quando verifica]
if (condicao) {
  // [Ação]
}
```

### ✅ DECORATORS:
```typescript
@Decorator() // 🏷️ O QUE: [Explicação completa do decorator]
```

### ✅ PROPRIEDADES:
```typescript
private propriedade: Type; // 📦 [Descrição da propriedade]
```

---

## 🎨 EMOJIS PADRÃO

- 📦 **ONDE** - Localização, importação
- 🎯 **O QUE** - Descrição, função
- 📚 **COMO** - Funcionamento, implementação
- 🤔 **POR QUÊ** - Justificativa, motivo
- ⏰ **QUANDO** - Momento de execução
- 📍 **ONDE** (contexto) - Localização no fluxo
- 🏗️ **CLASSE/CONSTRUTOR** - Estrutura
- 🚀 **MÉTODO** - Função/ação
- 📥 **ENTRADA** - Input/parâmetros
- 📤 **SAÍDA** - Output/retorno
- ⚠️ **ERRO** - Exceções/erros
- 🔒 **SEGURANÇA** - Autenticação/autorização
- 💾 **BANCO** - Persistência
- 🔍 **BUSCA** - Consulta/validação
- ✅ **SUCESSO** - Confirmação
- ❌ **FALHA** - Erro/rejeição

---

## 📊 ARQUIVOS JÁ COMENTADOS LINHA A LINHA:

1. ✅ `src/presentation/controllers/upload.controller.ts` - COMPLETO!
2. ✅ `src/application/use-cases/imovel/create-imovel.use-case.ts` - COMPLETO!

---

## 📝 ARQUIVOS PENDENTES (Precisam de comentários linha a linha):

### **Controllers:**
- ⏳ `src/presentation/controllers/match.controller.ts`
- ⏳ `src/presentation/controllers/imovel.controller.ts`
- ⏳ `src/presentation/controllers/cliente.controller.ts`
- ⏳ `src/presentation/controllers/auth.controller.ts`

### **Use Cases:**
- ⏳ `src/application/use-cases/match/find-matches-for-imovel.use-case.ts`
- ⏳ `src/application/use-cases/auth/login.use-case.ts`
- ⏳ `src/application/use-cases/auth/register.use-case.ts`
- ⏳ `src/application/use-cases/cliente/*`

### **Repositories:**
- ⏳ `src/infrastructure/database/repositories/prisma-imovel.repository.ts`
- ⏳ `src/infrastructure/database/repositories/prisma-user.repository.ts`
- ⏳ `src/infrastructure/database/repositories/prisma-cliente.repository.ts`

### **Services:**
- ⏳ `src/infrastructure/upload/cloudinary.service.ts`
- ⏳ `src/infrastructure/websocket/notifications.gateway.ts`

### **Entities:**
- ⏳ `src/domain/entities/imovel.entity.ts`
- ⏳ `src/domain/entities/user.entity.ts`
- ⏳ `src/domain/entities/cliente.entity.ts`

### **DTOs:**
- ⏳ `src/application/dtos/imovel/create-imovel.dto.ts`
- ⏳ `src/application/dtos/imovel/update-imovel.dto.ts`
- ⏳ `src/application/dtos/cliente/create-cliente.dto.ts`
- ⏳ `src/application/dtos/auth/login.dto.ts`
- ⏳ `src/application/dtos/auth/register.dto.ts`

### **Modules:**
- ⏳ `src/presentation/modules/upload.module.ts`
- ⏳ `src/presentation/modules/match.module.ts`
- ⏳ `src/presentation/modules/imovel.module.ts`
- ⏳ `src/presentation/modules/cliente.module.ts`
- ⏳ `src/presentation/modules/auth.module.ts`

---

## 🎯 PRÓXIMOS PASSOS:

1. Aplicar este padrão em TODOS os arquivos listados acima
2. Cada linha de código deve ter comentários explicativos
3. Usar os emojis padrão para facilitar identificação
4. Manter consistência em todo o projeto

---

## 💡 DICA IMPORTANTE:

**NÃO ECONOMIZE EM COMENTÁRIOS!**

É melhor ter comentários demais do que de menos. O código deve ser auto-explicativo para qualquer desenvolvedor que nunca viu o projeto antes.

**REGRA DE OURO:** Se você precisa pensar pra entender o que uma linha faz, ela precisa de comentário!
