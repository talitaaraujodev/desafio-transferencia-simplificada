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
@ApiTags('Transfers')
@ApiBearerAuth('access-token')
export class TransferController {
  constructor(
    @Inject('TransferService')
    private readonly transferService: TransferService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova tranfer' })
  async create(@Body() body: CreateTransferDto): Promise<Transfer> {
    return await this.transferService.create(body);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todas as transfers' })
  @ApiResponse({
    status: 200,
    description: 'Lista de transfers retornada com sucesso',
    type: Transfer,
    isArray: true,
  })
  async findAll(): Promise<Transfer[]> {
    return await this.transferService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma transfer' })
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
