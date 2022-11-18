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
  Inject,
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
@ApiTags('Wallet Types')
@ApiBearerAuth('access-token')
export class WalletTypeController {
  constructor(
    @Inject('WalletTypeService')
    private readonly walletTypeService: WalletTypeService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo wallet type' })
  async create(@Body() body: CreateWalletTypeDto): Promise<WalletType> {
    return await this.walletTypeService.create(body);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todas os wallet type' })
  @ApiResponse({
    status: 200,
    description: 'Lista de wallet type retornada com sucesso',
    type: WalletType,
    isArray: true,
  })
  async findAll(): Promise<WalletType[]> {
    return await this.walletTypeService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de um wallet type' })
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
  @ApiOperation({ summary: 'Remover um wallet type' })
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
  @ApiOperation({ summary: 'Atualizar um wallet type' })
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
