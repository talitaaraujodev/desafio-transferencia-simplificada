import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { RoleService } from '../services/role/role.service';
import { PermissionRoleRepository } from './../persistence/repositories/permissionRole/permissionRole.repository';
import { PermissionRepository } from './../persistence/repositories/permission/permission.repository';
import { RoleRepository } from '../persistence/repositories/role/role.repository';
import { RoleController } from './../controllers/role/role.controller';

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
