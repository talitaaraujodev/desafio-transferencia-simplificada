import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { TipoCarteiraService } from '../../services/tipoCarteira/tipoCarteira.service';
import { CreateTipoCarteiraDto } from './../../persistence/dto/createTipoCarteira.dto';

@Controller({ path: 'tipoCarteira' })
export class TipoCarteiraController {
  constructor(private readonly tipoCarteiraService: TipoCarteiraService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas os tipos de carteira' })
  async findAll() {
    return await this.tipoCarteiraService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo tipo de carteira' })
  async create(@Body() body: CreateTipoCarteiraDto) {
    return await this.tipoCarteiraService.create(body);
  }
}
