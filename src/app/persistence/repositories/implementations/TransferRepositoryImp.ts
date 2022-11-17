import { TransferRepository } from '../TranferRepository';
import { Transfer } from '../../entities/TransferEntity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class TransferRepositoryImp implements TransferRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(entity: Transfer): Promise<Transfer> {
    return await this.prisma.transferencias.create({
      data: {
        value: entity.value,
        status: entity.status,
        carteira_origem: entity.carteira_origem,
        carteira_destinatario: entity.carteira_destinatario,
        usuario_origem: entity.usuario_origem,
        usuario_destinatario: entity.usuario_destinatario,
      },
    });
  }
  async update(id: number, entity: Transfer): Promise<Transfer> {
    return await this.prisma.transferencias.update({
      data: {
        value: entity.value,
        status: entity.status,
        carteira_origem: entity.carteira_origem,
        carteira_destinatario: entity.carteira_destinatario,
        usuario_origem: entity.usuario_origem,
        usuario_destinatario: entity.usuario_destinatario,
      },
      where: { id },
    });
  }
  async findAll(): Promise<Transfer[]> {
    return await this.prisma.transferencias.findMany();
  }
  async findOne(id: number): Promise<Transfer> {
    return await this.prisma.transferencias.findUnique({ where: { id } });
  }
  async findLastId(): Promise<Transfer> {
    return await this.prisma.transferencias.findFirst({
      orderBy: { id: 'desc' },
      take: 1,
    });
  }
}
