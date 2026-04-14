// ============================================
// 📦 USE-CASE: login.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Confere a senha do cara e dá a pulseirinha VIP (Token JWT) se ele for quem diz ser.
//
// 📚 ANALOGIA: O LEÃO DE CHÁCARA DA BALADA 🦁
// - "Qual teu nome? Qual tua senha?"
// - Vai lá na portaria (Repository) procurar o maluco.
// - Pega o Bcrypt, descriptografa na mente pura.
// - Se for mentira, barramento (Unauthorized 401).
// - Se for verdade, carimba o Token JWT na mão e mete ele pra dentro!
// ============================================

import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * 🚀 O FLUXO DA CHECAGEM
   */
  async execute(email: string, senha: string): Promise<{ access_token: string; user: any }> {
    // 1. Procura o mano no banco
    const user = await this.userRepository.findByEmail(email);
    
    // 2. Se não existir, ou tomou ban (não ativo), é rua
    if (!user || !user.ativo) {
      throw new UnauthorizedException('Credenciais inválidas. Nem tenta.');
    }

    // 3. Testa a senha com a marreta do Bcrypt
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      throw new UnauthorizedException('Credenciais inválidas. Senha zuada.');
    }

    // 4. Se passou, cria a pulseirinha VIP (Payload e Token)
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    };
  }
}
