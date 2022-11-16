import { Module } from '@nestjs/common';
import { CarteiraController } from '../controllers/carteira/carteira.controller';
import { CarteiraService } from '../services/carteira/carteira.service';
@Module({
  controllers: [CarteiraController],
  providers: [CarteiraService],
})
export class CarteiraModule {}
