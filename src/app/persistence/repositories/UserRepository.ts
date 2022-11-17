import { User } from '../entities/UserEntity';

export interface UserRepository {
  create(entity: User): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByCpfCnpj(cpf_cnpj: string): Promise<User>;
  findByLastId(): Promise<User>;
  delete(id: number): Promise<User>;
}
