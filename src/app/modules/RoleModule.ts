import { Module } from '@nestjs/common';
import { PrismaService } from '../config/database/PrismaService';
import { RoleService } from '../services/RoleService';
import { PermissionRoleRepository } from '../persistence/repositories/PermissionRoleRepository';
import { PermissionRepository } from '../persistence/repositories/PermissionRepository';
import { RoleRepository } from '../persistence/repositories/RoleRepository';
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
