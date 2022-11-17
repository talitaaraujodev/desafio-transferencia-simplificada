import { WalletType } from '../entities/WalletTypeEntity';

export interface WalletTypeRepository {
  create(entity: WalletType): Promise<WalletType>;
  findAll(): Promise<WalletType[]>;
  findOne(id: number): Promise<WalletType>;
  delete(id: number): Promise<WalletType>;
  update(id: number, entity: WalletType): Promise<WalletType>;
}
