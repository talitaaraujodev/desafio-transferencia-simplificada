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
import { UpdateCarteiraDto } from '../persistence/dto/updateCarteira.dto';
import { CreateCarteiraDto } from '../persistence/dto/createCarteira.dto';
import { Carteira } from '../persistence/entities/carteira.entity';
import { CarteiraService } from '../services/carteira/carteira.service';

@Controller({ path: 'carteiras' })
@ApiTags('Carteiras')
@ApiBearerAuth('access-token')
export class WalletController {
  constructor(private readonly walletService: CarteiraService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as carteiras' })
  async findAll(): Promise<Carteira[]> {
    return await this.walletService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova carteira' })
  async create(@Body() body: CreateCarteiraDto): Promise<Carteira> {
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
    @Body() body: UpdateCarteiraDto,
  ): Promise<Carteira> {
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
  ): Promise<Carteira> {
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
  ): Promise<Carteira> {
    return await this.walletService.delete(id);
  }
}
