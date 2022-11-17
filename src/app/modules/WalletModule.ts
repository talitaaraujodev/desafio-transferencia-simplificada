import { PermissionService } from './../services/PermissionService';
import { Module } from '@nestjs/common';
import { PermissionRoleRepositoryImp } from '../persistence/repositories/implementations/PermissionRoleRepositoryImp';
import { PermissionRepositoryImp } from '../persistence/repositories/implementations/PermissionRepositoryImp';
import { RoleService } from '../services/RoleService';
import { WalletRepositoryImp } from '../persistence/repositories/implementations/WalletRepositoryImp';
import { WalletTypeRepositoryImp } from '../persistence/repositories/implementations/WalletTypeRepositoryImp';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { WalletTypeService } from '../services/WalletTypeService';
import { UserService } from '../services/UserService';
import { WalletController } from '../controllers/WalletController';
import { PrismaService } from '../config/database/PrismaService';
import { WalletService } from '../services/WalletService';
import { UserRoleRepositoryImp } from '../persistence/repositories/implementations/UserRoleRepositoryImp';
import { RoleRepositoryImp } from '../persistence/repositories/implementations/RoleRepositoryImp';
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
    WalletService,
    UserService,
    PermissionService,
    RoleService,
    WalletTypeService,
    PrismaService,
  ],
})
export class WalletModule {}
