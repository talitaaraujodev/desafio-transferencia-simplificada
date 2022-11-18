import { UpdateWalletTypeDto } from './../dto/UpdateWalletTypeDto';
import { CreateWalletTypeDto } from '../dto/CreateWalletTypeDto';
import { WalletType } from '../persistence/entities/WalletTypeEntity';

export interface WalletTypeService {
  create(data: CreateWalletTypeDto): Promise<WalletType>;
  findAll(): Promise<WalletType[]>;
  findOne(id: number): Promise<WalletType>;
  delete(id: number): Promise<WalletType>;
  update(id: number, data: UpdateWalletTypeDto): Promise<WalletType>;
}
