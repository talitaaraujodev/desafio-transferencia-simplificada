import { Module } from '@nestjs/common';
import { WalletTypeRepository } from '../persistence/repositories/WalletTypeRepository';
import { WalletTypeService } from '../services/WalletTypeService';
import { WalletTypeController } from '../controllers/WalletTypeController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [WalletTypeController],
  providers: [WalletTypeService, WalletTypeRepository, PrismaService],
  exports: [WalletTypeService, WalletTypeRepository],
})
export class WalletTypeModule {}
