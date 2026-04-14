// ============================================
// 📦 USE-CASE: register.use-case.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Registra o primeiro acesso/cadastro do usuário administrativo do sistema.
//
// 📚 ANALOGIA: RECEPCIONISTA IMPRIMINDO O CRACHÁ 🖨️
// - O cara fala "Quero trabalhar aqui".
// - Ela checa se já tem alguém com esse e-mail empregado aí. (Conflict)
// - Se não tiver, soca a senha no triturador do Bcrypt e salva o registro na gaveta.
// ============================================

import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  /**
   * 🚀 O FLUXO DE CRIAR UM ADMIN NOVO
   */
  async execute(data: { nome: string; email: string; senha: string }): Promise<User> {
    // 1. O Recalque: "Esse e-mail já existe?"
    const exists = await this.userRepository.findByEmail(data.email);
    if (exists) {
      throw new ConflictException('Já tem um maluco com esse e-mail no sistema');
    }

    // 2. Proteção máxima: Criptografa a senha antes de mandar pro banco
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    
    // 3. Monta a Entidade blindada (o Crachá)
    const user = new User({
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
    });

    // 4. Salva de vez
    return this.userRepository.create(user);
  }
}
