// ============================================
// 📦 REPOSITORY: prisma-user.repository.ts
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Faz a ponte direta com as tabelinhas do Banco de Dados para a galera de 'Usuários'.
//
// 📚 ANALOGIA: O FICHÁRIO DO RH 🗄️
// - A interface disse "precisamos de um lugar pra guardar crachás".
// - O PrismaUserRepository é a GAVETA MÁGICA. A gente joga os dados pra ela e ela assenta no SQL de verdade.
// ============================================

import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { User as PrismaUser } from '@prisma/client';

/**
 * 🏗️ CLASSE: PrismaUserRepository
 *
 * 🎯 O QUE FAZ? A implementação real da portaria usando Prisma.
 */
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * 💾 MÉTODO: create
   */
  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        nome: user.nome,
        email: user.email,
        senha: user.senha,
        role: user.role,
        ativo: user.ativo,
      },
    });
    return this.toDomain(created);
  }

  /**
   * 🔍 MÉTODO: findById
   */
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  /**
   * 📧 MÉTODO: findByEmail
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  /**
   * 🔄 MÉTODO: update
   */
  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        nome: user.nome,
        email: user.email,
        role: user.role,
        ativo: user.ativo,
      },
    });
    return this.toDomain(updated);
  }

  /**
   * 🗑️ MÉTODO: delete
   */
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  /**
   * 📊 MÉTODO: findAll
   */
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => this.toDomain(u));
  }

  /**
   * 🎭 MÉTODO: toDomain
   *
   * 🎯 O QUE FAZ? Converte o JSON sujo do Prisma numa Entidade Domínio blindada.
   */
  private toDomain(prismaUser: PrismaUser): User {
    return new User(
      {
        nome: prismaUser.nome,
        email: prismaUser.email,
        senha: prismaUser.senha,
        role: prismaUser.role as 'ADMIN' | 'USER',
      },
      prismaUser.id,
    );
  }
}
