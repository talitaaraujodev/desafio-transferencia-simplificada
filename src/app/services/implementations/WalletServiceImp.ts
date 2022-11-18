import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { WalletService } from '../WalletService';
import { UpdateWalletDto } from '../../dto/UpdateWalletDto';
import { WalletTypeService } from '../WalletTypeService';
import { Wallet } from '../../persistence/entities/WalletEntity';
import { CreateWalletDto } from '../../dto/CreateWalletDto';
import { WalletRepository } from '../../persistence/repositories/WalletRepository';
import { UserService } from '../UserService';

@Injectable()
export class WalletServiceImp implements WalletService {
  constructor(
    @Inject('WalletTypeService')
    private readonly walletTypeService: WalletTypeService,
    @Inject('WalletRepository')
    private readonly walletRepository: WalletRepository,
    @Inject('UserService')
    private readonly userService: UserService,
  ) {}
  async create(data: CreateWalletDto): Promise<Wallet> {
    await this.userService.findOne(data.user_id);
    await this.walletTypeService.findOne(data.tipo_id);

    return await this.walletRepository.create(data);
  }
  async findAll(): Promise<Wallet[]> {
    return await this.walletRepository.findAll();
  }
  async findOne(id: number): Promise<Wallet> {
    try {
      const wallet = await this.walletRepository.findOne(id);
      return wallet;
    } catch (error) {
      throw new HttpException(
        'Carteira não foi encontrada',
        HttpStatus.CONFLICT,
      );
    }
  }
  async delete(id: number): Promise<Wallet> {
    await this.findOne(id);
    return await this.walletRepository.delete(id);
  }
  async update(id: number, data: UpdateWalletDto): Promise<Wallet> {
    await this.userService.findOne(data.user_id);
    await this.walletTypeService.findOne(data.tipo_id);
    await this.findOne(id);
    return await this.walletRepository.update(id, data);
  }
  async verifyBalance(id: number, value: number): Promise<Wallet> {
    const wallet: Wallet = await this.findOne(id);

    if (wallet.balance < value) {
      throw new HttpException(
        'Saldo para a trasferência insuficiente',
        HttpStatus.BAD_REQUEST,
      );
    }
    return wallet;
  }
  async decreaseBalance(id: number, value: number): Promise<Wallet> {
    const wallet = await this.findOne(id);
    const balanceAtual = wallet.balance - value;
    const data: UpdateWalletDto = {
      balance: balanceAtual,
      user_id: wallet.user_id,
      tipo_id: wallet.tipo_id,
    };

    return await this.update(id, data);
  }
  async increaseBalance(id: number, value: number): Promise<Wallet> {
    const wallet = await this.findOne(id);
    const balanceAtual = wallet.balance + value;
    const data: UpdateWalletDto = {
      balance: balanceAtual,
      user_id: wallet.user_id,
      tipo_id: wallet.tipo_id,
    };
    return await this.update(id, data);
  }
}
