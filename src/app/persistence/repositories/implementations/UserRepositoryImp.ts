import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../config/database/PrismaService';
import { User } from '../../entities/UserEntity';
import { UserRepository } from '../UserRepository';

@Injectable()
export class UserRepositoryImp implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(entity: User): Promise<User> {
    return await this.prisma.users.create({
      data: {
        name: entity.name,
        cpf_cnpj: entity.cpf_cnpj,
        email: entity.email,
        password: await bcrypt.hash(entity.password, 10),
      },
    });
  }
  async findAll(): Promise<User[]> {
    return await this.prisma.users.findMany({
      select: {
        name: true,
        cpf_cnpj: true,
        email: true,
      },
    });
  }
  async findOne(id: number): Promise<User> {
    return await this.prisma.users.findUnique({
      where: { id },
      include: { UsersRoles: { include: { Roles: true } } },
    });
  }
  async findByEmail(email: string): Promise<User> {
    return await this.prisma.users.findUnique({ where: { email } });
  }
  async findByCpfCnpj(cpf_cnpj: string): Promise<User> {
    return await this.prisma.users.findUnique({ where: { cpf_cnpj } });
  }

  async findByLastId(): Promise<User> {
    return await this.prisma.users.findFirst({
      orderBy: { id: 'desc' },
      take: 1,
    });
  }

  async delete(id: number): Promise<User> {
    return await this.prisma.users.delete({ where: { id } });
  }
}
