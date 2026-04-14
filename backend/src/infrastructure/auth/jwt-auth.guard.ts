// ============================================
// 📦 GUARD: jwt-auth.guard.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// É o segurança da porta giratória. Só barra quem não tem o Token (Crachá).
//
// 📚 ANALOGIA: O SEGURANÇA DA PORTARIA 👮‍♂️
// - Ele não liga se tu é o chefe ou o estagiário.
// - Tem o crachá pendurado no pescoço? Passa. Não tem? Fica de fora (401).
// ============================================

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
