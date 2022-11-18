import { Module } from '@nestjs/common';
import { PrismaService } from '../config/database/PrismaService';
import { PermissionRoleRepositoryImp } from '../persistence/repositories/implementations/PermissionRoleRepositoryImp';
import { PermissionRepositoryImp } from '../persistence/repositories/implementations/PermissionRepositoryImp';
import { RoleRepositoryImp } from '../persistence/repositories/implementations/RoleRepositoryImp';
import { RoleController } from '../controllers/RoleController';
import { RoleServiceImp } from '../services/implementations/RoleServiceImp';

@Module({
  controllers: [RoleController],
  providers: [
    {
      provide: 'PermissionRoleRepository',
      useClass: PermissionRoleRepositoryImp,
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
      provide: 'RoleService',
      useClass: RoleServiceImp,
    },
    PrismaService,
  ],
})
export class RoleModule {}
