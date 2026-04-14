// ============================================
// 📦 MODULE: upload.module.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Organiza tudo relacionado a upload de imagens.
//
// 📚 ANALOGIA: O DEPARTAMENTO DE FOTOGRAFIA 📸
// - Tem o balcão de atendimento (Controller)
// - Tem o fotógrafo profissional (CloudinaryService)
// - Exporta o serviço pra outros departamentos usarem
//
// 🤔 POR QUÊ PRECISAMOS DISSO?
// Pra manter o código organizado e reutilizável.
// Outros módulos podem importar e usar o CloudinaryService.
// ============================================

import { Module } from '@nestjs/common';
import { UploadController } from '../controllers/upload.controller';
import { CloudinaryService } from '../../infrastructure/upload/cloudinary.service';

/**
 * 🏗️ MODULE: UploadModule
 *
 * 🎯 O QUE FAZ?
 * Gerencia upload de arquivos para o Cloudinary.
 *
 * 📦 COMPONENTES:
 * - UploadController: Recebe requisições de upload
 * - CloudinaryService: Faz upload pro Cloudinary
 *
 * 📤 EXPORTA:
 * - CloudinaryService: Outros módulos podem usar
 *
 * 🔗 USADO POR:
 * - ImovelModule: Para upload de fotos de imóveis
 * - Qualquer módulo que precise fazer upload
 */
@Module({
  controllers: [UploadController],
  providers: [CloudinaryService],
  exports: [CloudinaryService], // Exporta pra outros módulos usarem
})
export class UploadModule {}
