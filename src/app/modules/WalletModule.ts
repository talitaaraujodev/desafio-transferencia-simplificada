import { Module } from '@nestjs/common';
import { PermissionRoleRepository } from '../persistence/repositories/permissionRole/permissionRole.repository';
import { PermissionRepository } from '../persistence/repositories/permission/permission.repository';
import { RoleService } from '../services/RoleService';
import { CarteiraRepository } from '../persistence/repositories/carteira/carteira.repository';
import { TipoCarteiraRepository } from '../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { UsuarioRepository } from '../persistence/repositories/usuario/usuario.repository';
import { WalletTypeService } from '../services/WalletTypeService';
import { UserService } from '../services/UserService';
import { WalletController } from '../controllers/WalletController';
import { PrismaService } from '../config/database/PrismaService';
import { WalletService } from '../services/WalletService';
import { UsuarioRoleRepository } from '../persistence/repositories/usuarioRole/usuarioRole.repository';
import { RoleRepository } from '../persistence/repositories/role/role.repository';
@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
    CarteiraRepository,
    UserService,
    RoleService,
    WalletTypeService,
    TipoCarteiraRepository,
    UsuarioRepository,
    UsuarioRoleRepository,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
})
export class WalletModule {}
