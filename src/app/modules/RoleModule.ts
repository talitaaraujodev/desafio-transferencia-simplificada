import { Module } from '@nestjs/common';
import { PrismaService } from '../config/database/PrismaService';
import { RoleService } from '../services/RoleService';
import { PermissionRoleRepository } from '../persistence/repositories/permissionRole/permissionRole.repository';
import { PermissionRepository } from '../persistence/repositories/permission/permission.repository';
import { RoleRepository } from '../persistence/repositories/role/role.repository';
import { RoleController } from '../controllers/RoleController';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
