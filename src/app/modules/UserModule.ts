import { PermissionRoleRepository } from '../persistence/repositories/permissionRole/permissionRole.repository';
import { RoleRepository } from '../persistence/repositories/role/role.repository';
import { PermissionRepository } from '../persistence/repositories/permission/permission.repository';
import { RoleService } from '../services/RoleService';
import { Module } from '@nestjs/common';
import { UsuarioRoleRepository } from '../persistence/repositories/usuarioRole/usuarioRole.repository';
import { UsuarioRepository } from '../persistence/repositories/usuario/usuario.repository';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UsuarioRepository,
    UsuarioRoleRepository,
    RoleService,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
  exports: [UsuarioRepository, UserService],
})
export class UserModule {}
