import { Wallet } from '../entities/WalletEntity';

export interface WalletRepository {
  create(entity: Wallet): Promise<Wallet>;
  findAll(): Promise<Wallet[]>;
  findOne(id: number): Promise<Wallet>;
  delete(id: number): Promise<Wallet>;
  update(id: number, entity: Wallet): Promise<Wallet>;
}
