import { PermissionServiceImp } from './../services/implementations/PermissionServiceImp';
import { PermissionRepositoryImp } from './../persistence/repositories/implementations/PermissionRepositoryImp';
import { Module } from '@nestjs/common';
import { PrismaService } from '../config/database/PrismaService';
import { PermissionController } from '../controllers/PermissionController';

@Module({
  controllers: [PermissionController],
  providers: [
    {
      provide: 'PermissionRepository',
      useClass: PermissionRepositoryImp,
    },
    {
      provide: 'PermissionService',
      useClass: PermissionServiceImp,
    },
    PrismaService,
  ],
})
export class PermissionModule {}
