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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateWalletDto } from '../dto/UpdateWalletDto';
import { CreateWalletDto } from '../dto/CreateWalletDto';
import { Wallet } from '../persistence/entities/WalletEntity';
import { WalletService } from '../services/WalletService';

@Controller({ path: 'carteiras' })
@ApiTags('Carteiras')
@ApiBearerAuth('access-token')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as carteiras' })
  async findAll(): Promise<Wallet[]> {
    return await this.walletService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova carteira' })
  async create(@Body() body: CreateWalletDto): Promise<Wallet> {
    return await this.walletService.create(body);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma carteira' })
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
  @ApiOperation({ summary: 'Exibir os dados de uma carteira' })
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
  @ApiOperation({ summary: 'Remover uma carteira' })
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
