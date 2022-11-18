import { WalletType } from '../persistence/entities/WalletTypeEntity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WalletTypeService } from '../services/WalletTypeService';
import { CreateWalletTypeDto } from '../dto/CreateWalletTypeDto';
import { UpdateWalletTypeDto } from '../dto/UpdateWalletTypeDto';

@Controller({ path: 'walletTypes' })
@ApiTags('Tipos de Carteira')
@ApiBearerAuth('access-token')
export class WalletTypeController {
  constructor(private readonly walletTypeService: WalletTypeService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo tipo de carteira' })
  async create(@Body() body: CreateWalletTypeDto): Promise<WalletType> {
    return await this.walletTypeService.create(body);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todas os tipos de carteira' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de carteira retornada com sucesso',
    type: WalletType,
    isArray: true,
  })
  async findAll(): Promise<WalletType[]> {
    return await this.walletTypeService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma carteira' })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<WalletType> {
    return await this.walletTypeService.findOne(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um tipo de carteira' })
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<WalletType> {
    return await this.walletTypeService.delete(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um tipo de carteira' })
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: UpdateWalletTypeDto,
  ): Promise<WalletType> {
    return await this.walletTypeService.update(id, body);
  }
}
