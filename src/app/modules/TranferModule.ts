import { EmailClienteIntegrationImp } from '../persistence/integrations/implementations/emailCliente.integration.imp';
import { AuthorizationIntegrationImp } from '../persistence/integrations/implementations/authorizationTransaction.integration.imp';
import { AuthorizationTransactionIntegration } from '../persistence/integrations/authorizationTransaction.integration';
import { EmailClientIntegration } from '../persistence/integrations/emailClient.integration';
import { TipoCarteiraRepository } from './../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { WalletTypeService } from '../services/WalletTypeService';
import { CarteiraRepository } from './../persistence/repositories/carteira/carteira.repository';
import { UserService } from '../services/UserService';
import { PermissionRoleRepository } from './../persistence/repositories/permissionRole/permissionRole.repository';
import { PermissionRepository } from './../persistence/repositories/permission/permission.repository';
import { RoleRepository } from './../persistence/repositories/role/role.repository';
import { UsuarioRoleRepository } from './../persistence/repositories/usuarioRole/usuarioRole.repository';
import { UsuarioRepository } from './../persistence/repositories/usuario/usuario.repository';
import { WalletService } from '../services/WalletService';
import { TransferenciaRepository } from './../persistence/repositories/transferencia/transferencia.repository';
import { Module } from '@nestjs/common';
import { TransferController } from '../controllers/TransferController';
import { TransferService } from '../services/TranferService';
import { PrismaService } from '../config/database/PrismaService';
import { RoleService } from '../services/RoleService';

@Module({
  controllers: [TransferController],
  providers: [
    TransferService,
    TransferenciaRepository,
    UserService,
    WalletService,
    WalletTypeService,
    RoleService,
    EmailClientIntegration,
    EmailClienteIntegrationImp,
    AuthorizationTransactionIntegration,
    AuthorizationIntegrationImp,
    TipoCarteiraRepository,
    CarteiraRepository,
    UsuarioRepository,
    UsuarioRoleRepository,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
})
export class TransferModule {}
