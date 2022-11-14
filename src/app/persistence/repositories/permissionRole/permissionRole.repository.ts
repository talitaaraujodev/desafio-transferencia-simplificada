import { PrismaService } from '../../../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRoleRepository {
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
