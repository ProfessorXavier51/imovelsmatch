// ============================================
// 📦 STRATEGY: jwt.strategy.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Descriptografa o Token bizarro que o cara mandou e extrai os dados dele.
//
// 📚 ANALOGIA: O LEITOR DE CÓDIGO DE BARRAS 📠
// - O segurança da porta passou o crachá aqui.
// - O Leitor apita e fala: "Ah, esse código significa que é o João, do RH, código 123".
// - Joga isso no `request.user` pra gente usar na aplicação.
// ============================================

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Puxa o token do cabeçalho da requisição (Aquele Bearer bla-bla-bla)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // A senha mestra pra abrir a caixa mágica
      secretOrKey: process.env.JWT_SECRET || 'secret-key-change-in-production',
    });
  }

  /**
   * 🔍 MÉTODO: validate
   *
   * 🎯 O QUE FAZ? Traduz o payload criptografado pra algo legível.
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
