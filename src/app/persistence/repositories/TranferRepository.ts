import { Transfer } from '../entities/TransferEntity';

export interface TransferRepository {
  create(entity: Transfer): Promise<Transfer>;
  update(id: number, entity: Transfer): Promise<Transfer>;
  findAll(): Promise<Transfer[]>;
  findOne(id: number): Promise<Transfer>;
  findLastId(): Promise<Transfer>;
}
