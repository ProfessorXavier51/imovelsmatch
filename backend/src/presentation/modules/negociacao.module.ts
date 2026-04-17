/**
 * Módulo Negociação
 */

import { Module } from '@nestjs/common';
import { NegociacaoController } from '../controllers/negociacao.controller';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@Module({
  controllers: [NegociacaoController],
  providers: [PrismaService],
})
export class NegociacaoModule {}
