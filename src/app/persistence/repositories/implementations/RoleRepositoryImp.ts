import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../RoleRepository';
import { PrismaService } from '../../../config/database/PrismaService';
import { Role } from '../../entities/RoleEntity';

@Injectable()
export class RoleRepositoryImp implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(entity: Role): Promise<Role> {
    return await this.prisma.roles.create({ data: entity });
  }
  async findAll(): Promise<Role[]> {
    return await this.prisma.roles.findMany();
  }
  async findByName(name: string): Promise<Role> {
    return await this.prisma.roles.findUnique({ where: { name } });
  }
  async findByLastId(): Promise<Role> {
    return await this.prisma.roles.findFirst({
      orderBy: { id: 'desc' },
      take: 1,
    });
  }
  async findByIds(ids: number[]): Promise<Role[]> {
    return await this.prisma.roles.findMany({
      where: { id: { in: ids } },
    });
  }
}
