import { Module } from '@nestjs/common';
import { TipoCarteiraRepository } from '../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { TipoCarteiraService } from '../services/tipoCarteira/tipoCarteira.service';
import { WalletTypeController } from '../controllers/WalletTypeController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [WalletTypeController],
  providers: [TipoCarteiraService, TipoCarteiraRepository, PrismaService],
  exports: [TipoCarteiraService, TipoCarteiraRepository],
})
export class WalletTypeModule {}
