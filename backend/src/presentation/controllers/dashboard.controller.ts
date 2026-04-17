/**
 * Controller: Dashboard
 * Rotas para estatísticas e relatórios do dashboard
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { GetDashboardStatsUseCase } from '../../application/use-cases/dashboard/get-dashboard-stats.use-case';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getDashboardStatsUseCase: GetDashboardStatsUseCase
  ) {}

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas do Dashboard' })
  @ApiResponse({ status: 200, description: 'Estatísticas completas retornadas' })
  async getStats() {
    return this.getDashboardStatsUseCase.execute();
  }
}
