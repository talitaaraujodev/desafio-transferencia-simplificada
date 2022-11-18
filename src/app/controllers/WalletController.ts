import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Body,
  Inject,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateWalletDto } from '../dto/UpdateWalletDto';
import { CreateWalletDto } from '../dto/CreateWalletDto';
import { Wallet } from '../persistence/entities/WalletEntity';
import { WalletService } from '../services/WalletService';

@Controller({ path: 'wallets' })
@ApiTags('Carteiras')
@ApiBearerAuth('access-token')
export class WalletController {
  constructor(
    @Inject('WalletService')
    private readonly walletService: WalletService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova wallet' })
  async create(@Body() body: CreateWalletDto): Promise<Wallet> {
    return await this.walletService.create(body);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todas as wallets' })
  @ApiResponse({
    status: 200,
    description: 'Lista de wallets retornada com sucesso',
    type: Wallet,
    isArray: true,
  })
  async findAll(): Promise<Wallet[]> {
    return await this.walletService.findAll();
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma wallet' })
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateWalletDto,
  ): Promise<Wallet> {
    return await this.walletService.update(id, body);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma wallet' })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Wallet> {
    return await this.walletService.findOne(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma wallet' })
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Wallet> {
    return await this.walletService.delete(id);
  }
}
