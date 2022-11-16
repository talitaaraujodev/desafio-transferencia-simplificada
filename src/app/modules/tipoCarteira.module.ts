import { Module } from '@nestjs/common';
import { TipoCarteiraRepository } from './../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { TipoCarteiraService } from '../services/tipoCarteira/tipoCarteira.service';
import { TipoCarteiraController } from '../controllers/tipoCarteira/tipoCarteira.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [TipoCarteiraController],
  providers: [TipoCarteiraService, TipoCarteiraRepository, PrismaService],
  exports: [TipoCarteiraService, TipoCarteiraRepository],
})
export class TipoCarteiraModule {}
