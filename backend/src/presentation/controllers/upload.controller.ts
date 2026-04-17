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
  ) { }

  /**
   * 📸 MÉTODO: uploadImage
   * 
   * 🎯 O QUE FAZ? Recebe uma imagem e faz upload pro Cloudinary.
   * 📚 COMO? Usa FileInterceptor pra extrair o arquivo da requisição.
   * � ONDE? Rota: POST /upload/image
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
