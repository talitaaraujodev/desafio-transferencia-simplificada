import { Carteira } from './../../entities/carteira.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../../database/prisma.service';

@Injectable()
export class CarteiraRepository {
  constructor(private prisma: PrismaService) {}
  async create(entity: Carteira): Promise<Carteira> {
    return await this.prisma.carteiras.create({
      data: {
        saldo: parseFloat(entity.saldo),
        usuario_id: entity.usuario_id,
        tipo_id: entity.tipo_id,
      },
    });
  }
  async findAll(): Promise<Carteira[]> {
    return await this.prisma.carteiras.findMany();
  }
  async findOne(id: number): Promise<Carteira> {
    return await this.prisma.carteiras.findUnique({
      where: {
        id,
      },
    });
  }
  async delete(id: number): Promise<Carteira> {
    return await this.prisma.carteiras.delete({
      where: {
        id,
      },
    });
  }
  async update(id: number, entity: Carteira): Promise<Carteira> {
    return await this.prisma.carteiras.update({
      data: {
        saldo: entity.saldo,
        usuario_id: entity.usuario_id,
        tipo_id: entity.tipo_id,
      },
      where: {
        id,
      },
    });
  }
}
