import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateWalletTypeDto } from '../dto/CreateWalletTypeDto';
import { WalletType } from '../persistence/entities/WalletTypeEntity';
import { WalletTypeRepository } from '../persistence/repositories/WalletTypeRepository';

@Injectable()
export class WalletTypeService {
  constructor(private readonly walletTypeService: WalletTypeRepository) {}

  async create(data: CreateWalletTypeDto): Promise<WalletType> {
    return await this.walletTypeService.create(data);
  }
  async findAll(): Promise<WalletType[]> {
    return await this.walletTypeService.findAll();
  }
  async findOne(id: number): Promise<WalletType> {
    try {
      const walletType = await this.walletTypeService.findOne(id);
      return walletType;
    } catch (error) {
      throw new HttpException(
        'Tipo de carteira não foi encontrado',
        HttpStatus.CONFLICT,
      );
    }
  }
}
