import { PrismaService } from 'src/app/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRoleRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(usuario: number, roles: number[]): Promise<void> {
    for (const role of roles) {
      await this.prisma.usuariosRoles.create({
        data: { usuario_id: usuario, role_id: role },
      });
    }
  }
}
