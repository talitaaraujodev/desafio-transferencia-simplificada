import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../WalletRepository';
import { Wallet } from '../../entities/WalletEntity';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class WalletRepositoryImp implements WalletRepository {
  constructor(private prisma: PrismaService) {}
  async create(entity: Wallet): Promise<Wallet> {
    return await this.prisma.wallets.create({
      data: {
        balance: entity.balance,
        user_id: entity.user_id,
        tipo_id: entity.tipo_id,
      },
    });
  }
  async findAll(): Promise<Wallet[]> {
    return await this.prisma.wallets.findMany();
  }
  async findOne(id: number): Promise<Wallet> {
    return await this.prisma.wallets.findUnique({
      where: {
        id,
      },
    });
  }
  async delete(id: number): Promise<Wallet> {
    return await this.prisma.wallets.delete({
      where: {
        id,
      },
    });
  }
  async update(id: number, entity: Wallet): Promise<Wallet> {
    return await this.prisma.wallets.update({
      data: {
        balance: entity.balance,
        user_id: entity.user_id,
        tipo_id: entity.tipo_id,
      },
      where: {
        id,
      },
    });
  }
}
