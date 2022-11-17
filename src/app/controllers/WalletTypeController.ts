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
import { TipoCarteiraService } from '../services/tipoCarteira/tipoCarteira.service';
import { CreateTipoCarteiraDto } from '../persistence/dto/createTipoCarteira.dto';

@Controller({ path: 'tipoCarteira' })
@ApiTags('Tipos de Carteira')
@ApiBearerAuth('access-token')
export class WalletTypeController {
  constructor(private readonly walletTypeService: TipoCarteiraService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas os tipos de carteira' })
  async findAll(): Promise<TipoCarteira[]> {
    return await this.walletTypeService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo tipo de carteira' })
  async create(@Body() body: CreateTipoCarteiraDto): Promise<TipoCarteira> {
    return await this.walletTypeService.create(body);
  }
}
