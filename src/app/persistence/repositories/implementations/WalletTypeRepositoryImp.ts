import { WalletTypeRepository } from '../WalletTypeRepository';
import { Injectable } from '@nestjs/common';
import { WalletType } from '../../entities/WalletTypeEntity';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class WalletTypeRepositoryImp implements WalletTypeRepository {
  constructor(private prisma: PrismaService) {}
  async create(entity: WalletType): Promise<WalletType> {
    return await this.prisma.tipoCarteira.create({
      data: {
        name: entity.name,
        descricao: entity.descricao,
      },
    });
  }
  async findAll(): Promise<WalletType[]> {
    return await this.prisma.tipoCarteira.findMany();
  }
  async findOne(id: number): Promise<WalletType> {
    return await this.prisma.permissions.findUnique({
      where: {
        id,
      },
    });
  }
}
