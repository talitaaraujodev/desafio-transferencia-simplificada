import { Transferencia } from './../../persistence/entities/transferencia.entity';
import { CreateTransferenciaDto } from './../../persistence/dto/createTransferencia.dto';
import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransferenciaService } from '../../services/transferencia/transferencia.service';

@Controller('transferencias')
@ApiTags('Transferencias')
@ApiBearerAuth('access-token')
export class TransferenciaController {
  constructor(private readonly transferenciaService: TransferenciaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova tranferencia' })
  async create(@Body() body: CreateTransferenciaDto): Promise<Transferencia> {
    return await this.transferenciaService.create(body);
  }
}
