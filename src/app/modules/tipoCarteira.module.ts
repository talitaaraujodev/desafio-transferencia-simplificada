import { TipoCarteiraService } from '../services/tipoCarteira/tipoCarteira.service';
import { TipoCarteiraController } from '../controllers/tipoCarteira/tipoCarteira.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TipoCarteiraController],
  providers: [TipoCarteiraService],
})
export class TipoCarteiraModule {}
