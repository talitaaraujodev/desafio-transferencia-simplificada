import { PermissionRoleRepository } from '../persistence/repositories/permissionRole/permissionRole.repository';
import { RoleRepository } from '../persistence/repositories/role/role.repository';
import { PermissionRepository } from '../persistence/repositories/permission/permission.repository';
import { RoleService } from '../services/role/role.service';
import { Module } from '@nestjs/common';
import { UsuarioRoleRepository } from '../persistence/repositories/usuarioRole/usuarioRole.repository';
import { UsuarioRepository } from '../persistence/repositories/usuario/usuario.repository';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UserController } from '../controllers/UserController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [UserController],
  providers: [
    UsuarioService,
    UsuarioRepository,
    UsuarioRoleRepository,
    RoleService,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
  exports: [UsuarioRepository, UsuarioService],
})
export class UserModule {}
