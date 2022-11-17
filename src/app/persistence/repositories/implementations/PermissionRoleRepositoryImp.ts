import { Injectable } from '@nestjs/common';
import { PermissionRoleRepository } from '../PermissionRoleRepository';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class PermissionRoleRepositoryImp implements PermissionRoleRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(role: number, permissions: number[]): Promise<void> {
    for (const permission of permissions) {
      await this.prisma.permissionsRoles.create({
        data: {
          role_id: role,
          permission_id: permission,
        },
      });
    }
  }
}
