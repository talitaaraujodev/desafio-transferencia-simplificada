import { Module } from '@nestjs/common';
import { WalletTypeServiceImp } from './../services/implementations/WalletTypeServiceImp';
import { WalletTypeRepositoryImp } from '../persistence/repositories/implementations/WalletTypeRepositoryImp';
import { WalletTypeController } from '../controllers/WalletTypeController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [WalletTypeController],
  providers: [
    {
      provide: 'WalletTypeRepository',
      useClass: WalletTypeRepositoryImp,
    },
    {
      provide: 'WalletTypeService',
      useClass: WalletTypeServiceImp,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: 'WalletTypeService',
      useClass: WalletTypeServiceImp,
    },
  ],
})
export class WalletTypeModule {}
