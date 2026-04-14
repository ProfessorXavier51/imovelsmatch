// ============================================
// 📦 SERVICE: cloudinary.service.ts
// ============================================
// 🎯 O QUE É?
// Serviço para fazer upload de imagens para o Cloudinary
//
// 📚 ANALOGIA: É como um FOTÓGRAFO PROFISSIONAL 📸
// - Você entrega a foto (arquivo)
// - Ele tira, edita e guarda na nuvem
// - Te devolve o link da foto
//
// 🤔 POR QUÊ CLOUDINARY?
// - Armazena imagens na nuvem (não no servidor)
// - Otimiza automaticamente (compressão, resize)
// - CDN global (carrega rápido em qualquer lugar)
// - Grátis até 25GB/mês
// ============================================

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

/**
 * 📸 SERVICE: CloudinaryService
 * 
 * 🎯 O QUE FAZ?
 * - Faz upload de imagens para o Cloudinary
 * - Deleta imagens do Cloudinary
 * - Retorna URL pública da imagem
 * 
 * 📚 ANALOGIA: FOTÓGRAFO PROFISSIONAL
 * - uploadImage() = Tirar e guardar foto
 * - deleteImage() = Apagar foto do álbum
 */
@Injectable()
export class CloudinaryService {
  // ========================================
  // CONSTRUTOR (Configuração do Cloudinary)
  // ========================================
  
  /**
   * 🏭 MÉTODO: Construtor
   * 
   * 🎯 O QUE FAZ?
   * - Configura credenciais do Cloudinary
   * - Lê variáveis de ambiente (.env)
   * 
   * 📚 ANALOGIA: CADASTRO NO SERVIÇO DE FOTOS
   * - Você precisa dar seu nome, senha e conta
   * - Depois pode usar o serviço
   * 
   * 🔑 VARIÁVEIS NECESSÁRIAS NO .ENV:
   * - CLOUDINARY_CLOUD_NAME = Nome da sua conta
   * - CLOUDINARY_API_KEY = Chave pública
   * - CLOUDINARY_API_SECRET = Chave secreta
   */
  constructor(private configService: ConfigService) {
    // Configura o Cloudinary com as credenciais
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  // ========================================
  // MÉTODO: uploadImage
  // ========================================
  
  /**
   * 📤 MÉTODO: uploadImage
   * 
   * 🎯 O QUE FAZ?
   * - Recebe um arquivo de imagem
   * - Faz upload para o Cloudinary
   * - Retorna a URL pública da imagem
   * 
   * 📚 ANALOGIA: ENVIAR FOTO PARA O INSTAGRAM
   * 1. Você escolhe a foto do celular (file)
   * 2. Instagram faz upload
   * 3. Instagram te dá o link da foto
   * 
   * 📥 ENTRADA:
   * - file: Arquivo de imagem (Express.Multer.File)
   *   - file.buffer = Dados binários da imagem
   *   - file.mimetype = Tipo (image/jpeg, image/png)
   * 
   * 📤 SAÍDA:
   * - URL pública da imagem (string)
   *   - Exemplo: "https://res.cloudinary.com/demo/image/upload/v1234/imoveis/foto.jpg"
   * 
   * 🔧 COMO FUNCIONA?
   * 1. Cria uma Promise (operação assíncrona)
   * 2. Usa cloudinary.uploader.upload_stream()
   * 3. Define pasta de destino: 'imoveis'
   * 4. Se sucesso: retorna URL segura (HTTPS)
   * 5. Se erro: rejeita a Promise
   * 
   * 💡 POR QUÊ PROMISE?
   * - Upload é assíncrono (demora)
   * - Precisamos esperar terminar
   * - Promise permite usar async/await
   */
  async uploadImage(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      // upload_stream = Faz upload de um stream de dados
      cloudinary.uploader.upload_stream(
        // Opções do upload
        { folder: 'imoveis' }, // Pasta no Cloudinary
        
        // Callback quando terminar
        (error, result) => {
          // Se deu erro, rejeita a Promise
          if (error) return reject(error);
          
          // Se sucesso, retorna a URL segura (HTTPS)
          resolve(result.secure_url);
        },
      ).end(file.buffer); // Envia os dados da imagem
    });
  }

  // ========================================
  // MÉTODO: deleteImage
  // ========================================
  
  /**
   * 🗑️ MÉTODO: deleteImage
   * 
   * 🎯 O QUE FAZ?
   * - Deleta uma imagem do Cloudinary
   * 
   * 📚 ANALOGIA: APAGAR FOTO DO INSTAGRAM
   * - Você passa o ID da foto
   * - Instagram apaga permanentemente
   * 
   * 📥 ENTRADA:
   * - publicId: ID público da imagem no Cloudinary
   *   - Exemplo: "imoveis/foto123"
   * 
   * 📤 SAÍDA:
   * - void (não retorna nada)
   * 
   * 💡 QUANDO USAR?
   * - Quando deletar um imóvel
   * - Quando substituir uma foto
   * - Para limpar fotos antigas
   */
  async deleteImage(publicId: string): Promise<void> {
    // destroy = Deleta permanentemente a imagem
    await cloudinary.uploader.destroy(publicId);
  }
}

// ============================================
// 📝 EXEMPLO DE USO:
// ============================================
// 
// // No controller:
// @Post('upload')
// @UseInterceptors(FileInterceptor('file'))
// async upload(@UploadedFile() file: Express.Multer.File) {
//   const url = await this.cloudinaryService.uploadImage(file);
//   return { url }; // "https://res.cloudinary.com/..."
// }
//
// // Para deletar:
// await this.cloudinaryService.deleteImage('imoveis/foto123');
// ============================================
