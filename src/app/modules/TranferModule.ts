import { EmailClienteIntegrationImp } from '../integrations/implementations/emailCliente.integration.imp';
import { AuthorizationIntegrationImp } from '../integrations/implementations/authorizationTransaction.integration.imp';
import { AuthorizationTransactionIntegration } from '../integrations/authorizationTransaction.integration';
import { EmailClientIntegration } from '../integrations/emailClient.integration';
import { WalletTypeRepositoryImp } from '../persistence/repositories/implementations/WalletTypeRepositoryImp';
import { WalletTypeService } from '../services/WalletTypeService';
import { WalletRepositoryImp } from '../persistence/repositories/implementations/WalletRepositoryImp';
import { UserService } from '../services/UserService';
import { PermissionRoleRepositoryImp } from '../persistence/repositories/implementations/PermissionRoleRepositoryImp';
import { PermissionRepositoryImp } from '../persistence/repositories/implementations/PermissionRepositoryImp';
import { RoleRepositoryImp } from '../persistence/repositories/implementations/RoleRepositoryImp';
import { UserRoleRepositoryImp } from '../persistence/repositories/implementations/UserRoleRepositoryImp';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { WalletService } from '../services/WalletService';
import { TransferRepositoryImp } from '../persistence/repositories/implementations/TransferRepositoryImp';
import { Module } from '@nestjs/common';
import { TransferController } from '../controllers/TransferController';
import { TransferService } from '../services/TranferService';
import { PrismaService } from '../config/database/PrismaService';
import { RoleService } from '../services/RoleService';

@Module({
  controllers: [TransferController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImp,
    },
    {
      provide: 'WalletRepository',
      useClass: WalletRepositoryImp,
    },
    {
      provide: 'WalletTypeRepository',
      useClass: WalletTypeRepositoryImp,
    },
    {
      provide: 'PermissionRepository',
      useClass: PermissionRepositoryImp,
    },
    {
      provide: 'PermissionRoleRepository',
      useClass: PermissionRoleRepositoryImp,
    },
    {
      provide: 'RoleRepository',
      useClass: RoleRepositoryImp,
    },
    {
      provide: 'UserRoleRepository',
      useClass: UserRoleRepositoryImp,
    },
    {
      provide: 'TransferRepository',
      useClass: TransferRepositoryImp,
    },
    TransferService,
    UserService,
    WalletService,
    WalletTypeService,
    RoleService,
    EmailClientIntegration,
    EmailClienteIntegrationImp,
    AuthorizationTransactionIntegration,
    AuthorizationIntegrationImp,
    PrismaService,
  ],
  exports: [TransferService],
})
export class TransferModule {}
