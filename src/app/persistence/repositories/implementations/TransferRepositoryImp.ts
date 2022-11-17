import { TransferRepository } from '../TranferRepository';
import { Transfer } from '../../entities/TransferEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class TransferRepositoryImp implements TransferRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(entity: Transfer): Promise<Transfer> {
    return await this.prisma.transfers.create({
      data: {
        value: entity.value,
        status: entity.status,
        wallet_origem: entity.wallet_origem,
        wallet_destinatario: entity.wallet_destinatario,
        user_origem: entity.user_origem,
        user_destinatario: entity.user_destinatario,
      },
    });
  }
  async update(id: number, entity: Transfer): Promise<Transfer> {
    return await this.prisma.transfers.update({
      data: {
        value: entity.value,
        status: entity.status,
        wallet_origem: entity.wallet_origem,
        wallet_destinatario: entity.wallet_destinatario,
        user_origem: entity.user_origem,
        user_destinatario: entity.user_destinatario,
      },
      where: { id },
    });
  }
  async findAll(): Promise<Transfer[]> {
    return await this.prisma.transfers.findMany();
  }
  async findOne(id: number): Promise<Transfer> {
    return await this.prisma.transfers.findUnique({ where: { id } });
  }
  async findLastId(): Promise<Transfer> {
    return await this.prisma.transfers.findFirst({
      orderBy: { id: 'desc' },
      take: 1,
    });
  }
}
