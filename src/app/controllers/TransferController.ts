import { Transfer } from '../persistence/entities/TransferEntity';
import { CreateTransferDto } from '../dto/CreateTranferDto';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { TransferService } from '../services/TranferService';

@Controller('transfers')
@ApiTags('Transferencias')
@ApiBearerAuth('access-token')
export class TransferController {
  constructor(
    @Inject('TransferService')
    private readonly transferService: TransferService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova tranferencia' })
  async create(@Body() body: CreateTransferDto): Promise<Transfer> {
    return await this.transferService.create(body);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todas os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de transferências retornada com sucesso',
    type: Transfer,
    isArray: true,
  })
  async findAll(): Promise<Transfer[]> {
    return await this.transferService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma transferência' })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Transfer> {
    return await this.transferService.findOne(id);
  }
}
