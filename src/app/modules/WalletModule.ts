import { Module } from '@nestjs/common';
import { PermissionRoleRepository } from '../persistence/repositories/permissionRole/permissionRole.repository';
import { PermissionRepository } from '../persistence/repositories/permission/permission.repository';
import { RoleService } from '../services/role/role.service';
import { CarteiraRepository } from '../persistence/repositories/carteira/carteira.repository';
import { TipoCarteiraRepository } from '../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { UsuarioRepository } from '../persistence/repositories/usuario/usuario.repository';
import { TipoCarteiraService } from '../services/tipoCarteira/tipoCarteira.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { WalletController } from '../controllers/WalletController';
import { PrismaService } from '../config/database/PrismaService';
import { CarteiraService } from '../services/carteira/carteira.service';
import { UsuarioRoleRepository } from '../persistence/repositories/usuarioRole/usuarioRole.repository';
import { RoleRepository } from '../persistence/repositories/role/role.repository';
@Module({
  controllers: [WalletController],
  providers: [
    CarteiraService,
    CarteiraRepository,
    UsuarioService,
    RoleService,
    TipoCarteiraService,
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