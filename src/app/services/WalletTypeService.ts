import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateWalletTypeDto } from '../dto/CreateWalletTypeDto';
import { TipoCarteira } from '../persistence/entities/tipoCarteira.entity';
import { TipoCarteiraRepository } from '../persistence/repositories/tipoCarteira/tipoCarteira.repository';

@Injectable()
export class WalletTypeService {
  constructor(private readonly walletTypeService: TipoCarteiraRepository) {}

  async create(data: CreateWalletTypeDto): Promise<TipoCarteira> {
    return await this.walletTypeService.create(data);
  }
  async findAll(): Promise<TipoCarteira[]> {
    return await this.walletTypeService.findAll();
  }
  async findOne(id: number): Promise<TipoCarteira> {
    try {
      const tipoCarteira = await this.walletTypeService.findOne(id);
      return tipoCarteira;
    } catch (error) {
      throw new HttpException(
        'Tipo de carteira não foi encontrado',
        HttpStatus.CONFLICT,
      );
    }
  }
}
