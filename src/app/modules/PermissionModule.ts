import { Module } from '@nestjs/common';
import { PrismaService } from '../config/database/PrismaService';
import { PermissionService } from '../services/permission/permission.service';
import { PermissionController } from '../controllers/PermissionController';
import { PermissionRepository } from '../persistence/repositories/permission/permission.repository';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository, PrismaService],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
