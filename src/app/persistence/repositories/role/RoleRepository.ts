import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Role } from '../../entities/role.entity';

@Injectable()
export class RoleRepository {
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
