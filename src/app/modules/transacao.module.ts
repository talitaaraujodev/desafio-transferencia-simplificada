import { Module } from '@nestjs/common';
import { TransacaoService } from '../services/transacao/transacao.service';
import { TransacaoController } from './../controllers/transacao/transacao.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService, PrismaService],
})
export class TransacaoModule {}
