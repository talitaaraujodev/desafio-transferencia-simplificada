import { WalletTypeRepository } from '../WalletTypeRepository';
import { Injectable } from '@nestjs/common';
import { WalletType } from '../../entities/WalletTypeEntity';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class WalletTypeRepositoryImp implements WalletTypeRepository {
  constructor(private prisma: PrismaService) {}

  async create(entity: WalletType): Promise<WalletType> {
    return await this.prisma.walletType.create({
      data: {
        name: entity.name,
        description: entity.description,
      },
    });
  }
  async findAll(): Promise<WalletType[]> {
    return await this.prisma.walletType.findMany();
  }
  async findOne(id: number): Promise<WalletType> {
    return await this.prisma.walletType.findUnique({
      where: {
        id,
      },
    });
  }
  async delete(id: number): Promise<WalletType> {
    return await this.prisma.walletType.delete({
      where: {
        id,
      },
    });
  }
  async update(id: number, entity: WalletType): Promise<WalletType> {
    return await this.prisma.walletType.update({
      data: {
        name: entity.name,
        description: entity.description,
      },
      where: {
        id,
      },
    });
  }
}
