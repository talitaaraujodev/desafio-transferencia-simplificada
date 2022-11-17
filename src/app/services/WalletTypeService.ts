import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateWalletTypeDto } from '../dto/CreateWalletTypeDto';
import { UpdateWalletTypeDto } from '../dto/UpdateWalletTypeDto';
import { WalletType } from '../persistence/entities/WalletTypeEntity';
import { WalletTypeRepository } from '../persistence/repositories/WalletTypeRepository';

@Injectable()
export class WalletTypeService {
  constructor(
    @Inject('WalletTypeRepository')
    private readonly walletTypeRepository: WalletTypeRepository,
  ) {}

  async create(data: CreateWalletTypeDto): Promise<WalletType> {
    return await this.walletTypeRepository.create(data);
  }
  async findAll(): Promise<WalletType[]> {
    return await this.walletTypeRepository.findAll();
  }
  async findOne(id: number): Promise<WalletType> {
    try {
      const walletType = await this.walletTypeRepository.findOne(id);
      return walletType;
    } catch (error) {
      throw new HttpException(
        'Tipo de carteira não foi encontrado',
        HttpStatus.CONFLICT,
      );
    }
  }
  async delete(id: number): Promise<WalletType> {
    await this.findOne(id);
    return await this.walletTypeRepository.delete(id);
  }
  async update(id: number, data: UpdateWalletTypeDto): Promise<WalletType> {
    await this.findOne(id);
    return await this.walletTypeRepository.update(id, data);
  }
}
