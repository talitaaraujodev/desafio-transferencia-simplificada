import { PermissionRepository } from '../PermissionRepository';
import { Injectable } from '@nestjs/common';
import { Permission } from '../../entities/PermissionEntity';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class PermissionRepositoryImp implements PermissionRepository {
  constructor(private prisma: PrismaService) {}
  async create(entity: Permission): Promise<Permission> {
    return await this.prisma.permissions.create({
      data: {
        name: entity.name,
        descricao: entity.descricao,
      },
    });
  }
  async findAll(): Promise<Permission[]> {
    return await this.prisma.permissions.findMany();
  }
  async findByName(name: string): Promise<Permission> {
    return await this.prisma.permissions.findUnique({ where: { name } });
  }
  async findManyByIds(ids: number[]): Promise<Permission[]> {
    return await this.prisma.permissions.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
