import { Module } from '@nestjs/common';
import { TipoCarteiraRepository } from '../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { WalletTypeService } from '../services/WalletTypeService';
import { WalletTypeController } from '../controllers/WalletTypeController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [WalletTypeController],
  providers: [WalletTypeService, TipoCarteiraRepository, PrismaService],
  exports: [WalletTypeService, TipoCarteiraRepository],
})
export class WalletTypeModule {}
