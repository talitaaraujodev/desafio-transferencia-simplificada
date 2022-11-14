import { Injectable } from '@nestjs/common';
import { Permission } from './../../entities/permission.entity';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class PermissionRepository {
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
  async findByIds(entity: Permission[]): Promise<Permission[]> {
    return await this.prisma.permissions.findMany({
      where: {
        id: {
          in: entity.map((permission) => permission.id),
        },
      },
    });
  }
}
