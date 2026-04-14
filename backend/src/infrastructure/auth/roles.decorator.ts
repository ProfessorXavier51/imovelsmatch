// ============================================
// 📦 DECORATOR: roles.decorator.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É a impressora de plaquinha. Cola o cargo necessário em cima da rota.
//
// 📚 ANALOGIA: A PLAQUINHA NA PORTA 🛑
// - Tu bota @Roles('ADMIN') em cima da função.
// - É a mesma coisa que pregar um papel "PROIBIDA ENTRADA DE FUNCIONÁRIOS NORMAIS" na porta.
// ============================================

import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
