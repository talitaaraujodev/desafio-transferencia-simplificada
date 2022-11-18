import { UpdateWalletDto } from './../dto/UpdateWalletDto';
import { CreateWalletDto } from './../dto/CreateWalletDto';
import { Wallet } from '../persistence/entities/WalletEntity';

export interface WalletService {
  create(data: CreateWalletDto): Promise<Wallet>;
  findAll(): Promise<Wallet[]>;
  findOne(id: number): Promise<Wallet>;
  delete(id: number): Promise<Wallet>;
  update(id: number, data: UpdateWalletDto): Promise<Wallet>;
  verifyBalance(id: number, value: number): Promise<Wallet>;
  decreaseBalance(id: number, value: number): Promise<Wallet>;
  increaseBalance(id: number, value: number): Promise<Wallet>;
}
