import { UserServiceImp } from './../services/implementations/UserServiceImp';
import { Module } from '@nestjs/common';
import { PermissionRoleRepositoryImp } from '../persistence/repositories/implementations/PermissionRoleRepositoryImp';
import { RoleRepositoryImp } from '../persistence/repositories/implementations/RoleRepositoryImp';
import { PermissionRepositoryImp } from '../persistence/repositories/implementations/PermissionRepositoryImp';
import { UserRoleRepositoryImp } from '../persistence/repositories/implementations/UserRoleRepositoryImp';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { UserController } from '../controllers/UserController';
import { PrismaService } from '../config/database/PrismaService';
import { RoleServiceImp } from '../services/implementations/RoleServiceImp';

@Module({
  controllers: [UserController],
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
      provide: 'RoleService',
      useClass: RoleServiceImp,
    },
    {
      provide: 'UserService',
      useClass: UserServiceImp,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'UserService',
      useClass: UserServiceImp,
    },
  ],
})
export class UserModule {}
