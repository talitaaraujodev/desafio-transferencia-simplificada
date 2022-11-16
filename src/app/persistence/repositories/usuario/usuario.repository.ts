import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../database/prisma.service';
import { Usuario } from '../../entities/usuario.entity';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(entity: Usuario): Promise<Usuario> {
    return await this.prisma.usuarios.create({
      data: {
        name: entity.name,
        cpf_cnpj: entity.cpf_cnpj,
        email: entity.email,
        password: await bcrypt.hash(entity.password, 10),
      },
    });
  }
  async findAll(): Promise<Usuario[]> {
    return await this.prisma.usuarios.findMany();
  }
  async findOne(id: number): Promise<Usuario> {
    return await this.prisma.usuarios.findUnique({
      where: { id },
      include: { UsuariosRoles: { include: { Roles: true } } },
    });
  }
  async findByEmail(email: string): Promise<Usuario> {
    return await this.prisma.usuarios.findUnique({ where: { email } });
  }
  async findByCpfCnpj(cpf_cnpj: string): Promise<Usuario> {
    return await this.prisma.usuarios.findUnique({ where: { cpf_cnpj } });
  }

  async findByLastId(): Promise<Usuario> {
    return await this.prisma.usuarios.findFirst({
      orderBy: { id: 'desc' },
      take: 1,
    });
  }

  async delete(id: number): Promise<Usuario> {
    return await this.prisma.usuarios.delete({ where: { id } });
  }
}
