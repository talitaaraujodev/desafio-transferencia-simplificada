import { TipoCarteira } from '../persistence/entities/tipoCarteira.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WalletTypeService } from '../services/WalletTypeService';
import { CreateWalletTypeDto } from '../dto/CreateWalletTypeDto';

@Controller({ path: 'tipoCarteira' })
@ApiTags('Tipos de Carteira')
@ApiBearerAuth('access-token')
export class WalletTypeController {
  constructor(private readonly walletTypeService: WalletTypeService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas os tipos de carteira' })
  async findAll(): Promise<TipoCarteira[]> {
    return await this.walletTypeService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo tipo de carteira' })
  async create(@Body() body: CreateWalletTypeDto): Promise<TipoCarteira> {
    return await this.walletTypeService.create(body);
  }
}
