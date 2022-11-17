import { Module } from '@nestjs/common';
import { WalletTypeRepositoryImp } from '../persistence/repositories/implementations/WalletTypeRepositoryImp';
import { WalletTypeService } from '../services/WalletTypeService';
import { WalletTypeController } from '../controllers/WalletTypeController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [WalletTypeController],
  providers: [
    WalletTypeService,

    {
      provide: 'WalletTypeRepository',
      useClass: WalletTypeRepositoryImp,
    },
    PrismaService,
  ],
  exports: [WalletTypeService],
})
export class WalletTypeModule {}
