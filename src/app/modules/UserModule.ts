import { PermissionRoleRepository } from '../persistence/repositories/PermissionRoleRepository';
import { RoleRepository } from '../persistence/repositories/RoleRepository';
import { PermissionRepository } from '../persistence/repositories/PermissionRepository';
import { RoleService } from '../services/RoleService';
import { Module } from '@nestjs/common';
import { UserRoleRepository } from '../persistence/repositories/UserRoleRepository';
import { UserRepository } from '../persistence/repositories/UserRepository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserRoleRepository,
    RoleService,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
  exports: [UserRepository, UserService],
})
export class UserModule {}
