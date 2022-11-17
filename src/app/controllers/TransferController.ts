import { Transferencia } from '../persistence/entities/transferencia.entity';
import { CreateTransferenciaDto } from '../dto/createTransferencia.dto';
import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransferService } from '../services/TranferService';

@Controller('transferencias')
@ApiTags('Transferencias')
@ApiBearerAuth('access-token')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova tranferencia' })
  async create(@Body() body: CreateTransferenciaDto): Promise<Transferencia> {
    return await this.transferService.create(body);
  }
}
