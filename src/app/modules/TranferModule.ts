import { EmailClienteIntegrationImp } from './../integrations/implementations/emailCliente.integration.imp';
import { AuthorizationIntegrationImp } from './../integrations/implementations/authorizationTransaction.integration.imp';
import { AuthorizationTransactionIntegration } from './../integrations/authorizationTransaction.integration';
import { EmailClientIntegration } from './../integrations/emailClient.integration';
import { TipoCarteiraRepository } from './../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { TipoCarteiraService } from './../services/tipoCarteira/tipoCarteira.service';
import { CarteiraRepository } from './../persistence/repositories/carteira/carteira.repository';
import { UsuarioService } from './../services/usuario/usuario.service';
import { PermissionRoleRepository } from './../persistence/repositories/permissionRole/permissionRole.repository';
import { PermissionRepository } from './../persistence/repositories/permission/permission.repository';
import { RoleRepository } from './../persistence/repositories/role/role.repository';
import { UsuarioRoleRepository } from './../persistence/repositories/usuarioRole/usuarioRole.repository';
import { UsuarioRepository } from './../persistence/repositories/usuario/usuario.repository';
import { CarteiraService } from './../services/carteira/carteira.service';
import { TransferenciaRepository } from './../persistence/repositories/transferencia/transferencia.repository';
import { Module } from '@nestjs/common';
import { TransferController } from '../controllers/TransferController';
import { TransferenciaService } from '../services/transferencia/transferencia.service';
import { PrismaService } from '../config/database/PrismaService';
import { RoleService } from '../services/role/role.service';

@Module({
  controllers: [TransferController],
  providers: [
    TransferenciaService,
    TransferenciaRepository,
    UsuarioService,
    CarteiraService,
    TipoCarteiraService,
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
