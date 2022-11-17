import { PermissionRepositoryImp } from './../persistence/repositories/implementations/PermissionRepositoryImp';
import { Module } from '@nestjs/common';
import { PrismaService } from '../config/database/PrismaService';
import { PermissionService } from '../services/PermissionService';
import { PermissionController } from '../controllers/PermissionController';

@Module({
  controllers: [PermissionController],
  providers: [
    PermissionService,
    {
      provide: 'PermissionRepository',
      useClass: PermissionRepositoryImp,
    },
    PrismaService,
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
