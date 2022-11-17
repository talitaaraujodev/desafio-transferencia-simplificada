import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../UserRoleRepository';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class UserRoleRepositoryImp implements UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(usuario: number, roles: number[]): Promise<void> {
    for (const role of roles) {
      await this.prisma.usersRoles.create({
        data: { user_id: usuario, role_id: role },
      });
    }
  }
}
