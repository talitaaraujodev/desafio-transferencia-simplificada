import { EmailClienteIntegrationImp } from '../persistence/integrations/implementations/emailCliente.integration.imp';
import { AuthorizationIntegrationImp } from '../persistence/integrations/implementations/authorizationTransaction.integration.imp';
import { AuthorizationTransactionIntegration } from '../persistence/integrations/authorizationTransaction.integration';
import { EmailClientIntegration } from '../persistence/integrations/emailClient.integration';
import { WalletTypeRepository } from '../persistence/repositories/WalletTypeRepository';
import { WalletTypeService } from '../services/WalletTypeService';
import { WalletRepository } from '../persistence/repositories/WalletRepository';
import { UserService } from '../services/UserService';
import { PermissionRoleRepository } from '../persistence/repositories/PermissionRoleRepository';
import { PermissionRepository } from '../persistence/repositories/PermissionRepository';
import { RoleRepository } from '../persistence/repositories/RoleRepository';
import { UserRoleRepository } from '../persistence/repositories/UserRoleRepository';
import { UserRepository } from '../persistence/repositories/UserRepository';
import { WalletService } from '../services/WalletService';
import { TransferRepository } from '../persistence/repositories/TransferRepository';
import { Module } from '@nestjs/common';
import { TransferController } from '../controllers/TransferController';
import { TransferService } from '../services/TranferService';
import { PrismaService } from '../config/database/PrismaService';
import { RoleService } from '../services/RoleService';

@Module({
  controllers: [TransferController],
  providers: [
    TransferService,
    TransferRepository,
    UserService,
    WalletService,
    WalletTypeService,
    RoleService,
    EmailClientIntegration,
    EmailClienteIntegrationImp,
    AuthorizationTransactionIntegration,
    AuthorizationIntegrationImp,
    WalletTypeRepository,
    WalletRepository,
    UserRepository,
    UserRoleRepository,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
})
export class TransferModule {}
