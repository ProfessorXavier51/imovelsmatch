/**
 * Módulo Dashboard
 */

import { Module } from '@nestjs/common';
import { DashboardController } from './presentation/controllers/dashboard.controller';
import { GetDashboardStatsUseCase } from './application/use-cases/dashboard/get-dashboard-stats.use-case';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';

@Module({
  controllers: [DashboardController],
  providers: [GetDashboardStatsUseCase, PrismaService],
})
export class DashboardModule {}
