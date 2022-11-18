import { WalletTypeServiceImp } from './../services/implementations/WalletTypeServiceImp';
import { UserServiceImp } from './../services/implementations/UserServiceImp';
import { Module } from '@nestjs/common';
import { PermissionRoleRepositoryImp } from '../persistence/repositories/implementations/PermissionRoleRepositoryImp';
import { PermissionRepositoryImp } from '../persistence/repositories/implementations/PermissionRepositoryImp';
import { WalletRepositoryImp } from '../persistence/repositories/implementations/WalletRepositoryImp';
import { WalletTypeRepositoryImp } from '../persistence/repositories/implementations/WalletTypeRepositoryImp';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { WalletController } from '../controllers/WalletController';
import { PrismaService } from '../config/database/PrismaService';
import { UserRoleRepositoryImp } from '../persistence/repositories/implementations/UserRoleRepositoryImp';
import { RoleRepositoryImp } from '../persistence/repositories/implementations/RoleRepositoryImp';
import { PermissionServiceImp } from '../services/implementations/PermissionServiceImp';
import { RoleServiceImp } from '../services/implementations/RoleServiceImp';
import { WalletServiceImp } from '../services/implementations/WalletServiceImp';
@Module({
  controllers: [WalletController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImp,
    },
    {
      provide: 'UserRoleRepository',
      useClass: UserRoleRepositoryImp,
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
      provide: 'RoleRepository',
      useClass: RoleRepositoryImp,
    },
    {
      provide: 'PermissionRoleRepository',
      useClass: PermissionRoleRepositoryImp,
    },
    {
      provide: 'PermissionService',
      useClass: PermissionServiceImp,
    },
    {
      provide: 'RoleService',
      useClass: RoleServiceImp,
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
  exports: [
    {
      provide: 'WalletService',
      useClass: WalletServiceImp,
    },
  ],
})
export class WalletModule {}
