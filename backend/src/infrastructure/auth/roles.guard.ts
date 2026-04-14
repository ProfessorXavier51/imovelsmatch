// ============================================
// 📦 GUARD: roles.guard.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Confere se o cargo do cara bate com a plaquinha da porta.
//
// 📚 ANALOGIA: O SEGURANÇA DA ÁREA VIP 🕶️
// - O cara já passou na portaria (tem token).
// - Mas ele tenta entrar na "Área do Admin".
// - O segurança olha o crachá (user.role) e fala: "Ih, tu é USER normal, a plaquinha ali diz ADMIN. Rala peito!"
// ============================================

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Lê a plaquinha na porta da Rota (Ex: "Só ADMIN")
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    // 2. Se não tem plaquinha, é farra, entra qualquer um!
    if (!requiredRoles) {
      return true;
    }

    // 3. Puxa os dados do cara que o Leitor de Código de Barras (JwtStrategy) preparou
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // 4. Bate o cargo do maluco com o cargo da plaquinha
    return requiredRoles.some((role) => user.role === role);
  }
}
