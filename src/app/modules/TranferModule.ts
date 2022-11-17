import { Module } from '@nestjs/common';
import { EmailClientImp } from './../integrations/implementations/EmailClientImp';
import { AuthorizationTransactionClientImp } from '../integrations/implementations/AuthorizationTransactionClientImp';
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
    {
      provide: 'EmailClient',
      useClass: EmailClientImp,
    },
    {
      provide: 'AuthorizationTransactionClient',
      useClass: AuthorizationTransactionClientImp,
    },
    TransferService,
    UserService,
    WalletService,
    WalletTypeService,
    RoleService,
    PrismaService,
  ],
  exports: [TransferService],
})
export class TransferModule {}
