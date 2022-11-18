import { Transfer } from './../persistence/entities/TransferEntity';
import { CreateTransferDto } from '../dto/CreateTranferDto';

export interface TransferService {
  create(data: CreateTransferDto): Promise<Transfer>;
  findAll(): Promise<Transfer[]>;
  findOne(id: number): Promise<Transfer>;
}
