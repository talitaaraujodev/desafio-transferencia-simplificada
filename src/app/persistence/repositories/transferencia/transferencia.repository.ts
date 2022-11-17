import { Transferencia } from '../../entities/transferencia.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/database/PrismaService';

@Injectable()
export class TransferenciaRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(entity: Transferencia): Promise<Transferencia> {
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
  async update(id: number, entity: Transferencia): Promise<Transferencia> {
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
  async findAll(): Promise<Transferencia[]> {
    return await this.prisma.transferencias.findMany();
  }
  async findOne(id: number): Promise<Transferencia> {
    return await this.prisma.transferencias.findUnique({ where: { id } });
  }
  async findLastId(): Promise<Transferencia> {
    return await this.prisma.transferencias.findFirst({
      orderBy: { id: 'desc' },
      take: 1,
    });
  }
}
