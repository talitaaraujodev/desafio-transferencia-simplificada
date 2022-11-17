import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../WalletRepository';
import { Wallet } from '../../entities/WalletEntity';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class WalletRepositoryImp implements WalletRepository {
  constructor(private prisma: PrismaService) {}
  async create(entity: Wallet): Promise<Wallet> {
    return await this.prisma.carteiras.create({
      data: {
        saldo: parseFloat(entity.saldo),
        usuario_id: entity.usuario_id,
        tipo_id: entity.tipo_id,
      },
    });
  }
  async findAll(): Promise<Wallet[]> {
    return await this.prisma.carteiras.findMany();
  }
  async findOne(id: number): Promise<Wallet> {
    return await this.prisma.carteiras.findUnique({
      where: {
        id,
      },
    });
  }
  async delete(id: number): Promise<Wallet> {
    return await this.prisma.carteiras.delete({
      where: {
        id,
      },
    });
  }
  async update(id: number, entity: Wallet): Promise<Wallet> {
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
