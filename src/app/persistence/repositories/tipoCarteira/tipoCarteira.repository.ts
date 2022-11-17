import { Injectable } from '@nestjs/common';
import { TipoCarteira } from '../../entities/tipoCarteira.entity';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class TipoCarteiraRepository {
  constructor(private prisma: PrismaService) {}
  async create(entity: TipoCarteira): Promise<TipoCarteira> {
    return await this.prisma.tipoCarteira.create({
      data: {
        name: entity.name,
        descricao: entity.descricao,
      },
    });
  }
  async findAll(): Promise<TipoCarteira[]> {
    return await this.prisma.tipoCarteira.findMany();
  }
  async findOne(id: number): Promise<TipoCarteira> {
    return await this.prisma.permissions.findUnique({
      where: {
        id,
      },
    });
  }
}
