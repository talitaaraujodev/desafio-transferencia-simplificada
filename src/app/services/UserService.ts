import { CreateUserRoleDto } from '../dto/CreateUserRoleDto';
import { User } from './../persistence/entities/UserEntity';

export interface UserService {
  create(data: CreateUserRoleDto): Promise<User>;
  verifyExistsEmail(email: string): Promise<User>;
  verifyExistsCpfCnpj(cpf_cnpj: string): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  delete(id: number): Promise<User>;
}
