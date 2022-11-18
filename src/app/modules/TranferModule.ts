import { WalletServiceImp } from './../services/implementations/WalletServiceImp';
import { TransferServiceImp } from './../services/implementations/TransferServiceImp';
import { Module } from '@nestjs/common';
import { EmailClientImp } from './../integrations/implementations/EmailClientImp';
import { AuthorizationTransactionClientImp } from '../integrations/implementations/AuthorizationTransactionClientImp';
import { WalletTypeRepositoryImp } from '../persistence/repositories/implementations/WalletTypeRepositoryImp';
import { WalletRepositoryImp } from '../persistence/repositories/implementations/WalletRepositoryImp';
import { PermissionRoleRepositoryImp } from '../persistence/repositories/implementations/PermissionRoleRepositoryImp';
import { PermissionRepositoryImp } from '../persistence/repositories/implementations/PermissionRepositoryImp';
import { RoleRepositoryImp } from '../persistence/repositories/implementations/RoleRepositoryImp';
import { UserRoleRepositoryImp } from '../persistence/repositories/implementations/UserRoleRepositoryImp';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { TransferRepositoryImp } from '../persistence/repositories/implementations/TransferRepositoryImp';
import { TransferController } from '../controllers/TransferController';
import { PrismaService } from '../config/database/PrismaService';
import { RoleServiceImp } from '../services/implementations/RoleServiceImp';
import { UserServiceImp } from '../services/implementations/UserServiceImp';
import { WalletTypeServiceImp } from '../services/implementations/WalletTypeServiceImp';

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
    {
      provide: 'RoleService',
      useClass: RoleServiceImp,
    },
    {
      provide: 'TransferService',
      useClass: TransferServiceImp,
    },
    {
      provide: 'UserService',
      useClass: UserServiceImp,
    },
    {
      provide: 'WalletService',
      useClass: WalletServiceImp,
    },
    {
      provide: 'WalletTypeService',
      useClass: WalletTypeServiceImp,
    },
    PrismaService,
  ],
})
export class TransferModule {}
