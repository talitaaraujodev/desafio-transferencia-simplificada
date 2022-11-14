import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PermissionService } from './../services/permission/permission.service';
import { PermissionController } from '../controllers/permission/permission.controller';
import { PermissionRepository } from '../persistence/repositories/permission/permission.repository';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository, PrismaService],
})
export class PermissionModule {}
