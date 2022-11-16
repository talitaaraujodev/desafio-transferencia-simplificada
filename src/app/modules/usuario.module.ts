import { PermissionRoleRepository } from './../persistence/repositories/permissionRole/permissionRole.repository';
import { RoleRepository } from '../persistence/repositories/role/role.repository';
import { PermissionRepository } from './../persistence/repositories/permission/permission.repository';
import { RoleService } from './../services/role/role.service';
import { Module } from '@nestjs/common';
import { UsuarioRoleRepository } from './../persistence/repositories/usuarioRole/usuarioRole.repository';
import { UsuarioRepository } from './../persistence/repositories/usuario/usuario.repository';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioController } from '../controllers/usuario/usuario.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [UsuarioController],
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
export class UsuarioModule {}
