import { UpdateWalletDto } from '../dto/UpdateWalletDto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { WalletTypeService } from './WalletTypeService';
import { Carteira } from '../persistence/entities/carteira.entity';
import { CreateWalletDto } from '../dto/CreateWalletDto';
import { CarteiraRepository } from '../persistence/repositories/carteira/carteira.repository';
import { UserService } from './UserService';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: CarteiraRepository,
    private readonly userService: UserService,
    private readonly walletTypeService: WalletTypeService,
  ) {}
  async create(data: CreateWalletDto): Promise<Carteira> {
    await this.userService.findOne(data.usuario_id);
    await this.walletTypeService.findOne(data.tipo_id);
    return await this.walletRepository.create(data);
  }
  async findAll(): Promise<Carteira[]> {
    return await this.walletRepository.findAll();
  }
  async findOne(id: number): Promise<Carteira> {
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
  async delete(id: number): Promise<Carteira> {
    await this.findOne(id);
    return await this.walletRepository.delete(id);
  }
  async update(id: number, data: UpdateWalletDto): Promise<Carteira> {
    await this.userService.findOne(data.usuario_id);
    await this.walletTypeService.findOne(data.tipo_id);
    await this.findOne(id);
    return await this.walletRepository.update(id, data);
  }
  async verifySaldo(id: number, value: number): Promise<Carteira> {
    const wallet: Carteira = await this.findOne(id);
    if (wallet.saldo < value) {
      throw new HttpException(
        'Saldo para a trasferência insuficiente',
        HttpStatus.BAD_REQUEST,
      );
    }
    return wallet;
  }
  async decreaseSaldo(id: number, value: number): Promise<Carteira> {
    const wallet = await this.findOne(id);
    const saldoAtual = wallet.saldo - value;
    const data: UpdateWalletDto = {
      saldo: saldoAtual,
      usuario_id: wallet.usuario_id,
      tipo_id: wallet.tipo_id,
    };

    return await this.update(id, data);
  }
  async increaseSaldo(id: number, value: number): Promise<Carteira> {
    const wallet = await this.findOne(id);
    const saldoAtual = wallet.saldo + value;
    const data: UpdateWalletDto = {
      saldo: saldoAtual,
      usuario_id: wallet.usuario_id,
      tipo_id: wallet.tipo_id,
    };

    return await this.update(id, data);
  }
}
