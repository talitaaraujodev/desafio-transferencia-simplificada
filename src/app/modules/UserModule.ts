import { Module } from '@nestjs/common';
import { PermissionRoleRepositoryImp } from '../persistence/repositories/implementations/PermissionRoleRepositoryImp';
import { RoleRepositoryImp } from '../persistence/repositories/implementations/RoleRepositoryImp';
import { PermissionRepositoryImp } from '../persistence/repositories/implementations/PermissionRepositoryImp';
import { RoleService } from '../services/RoleService';
import { UserRoleRepositoryImp } from '../persistence/repositories/implementations/UserRoleRepositoryImp';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { UserService } from '../services/UserService';
import { UserController } from '../controllers/UserController';
import { PrismaService } from '../config/database/PrismaService';

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
    UserService,
    RoleService,
    PrismaService,
  ],
  exports: [UserService],
})
export class UserModule {}
