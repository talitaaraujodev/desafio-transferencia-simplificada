import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { RoleService } from './RoleService';
import { CreateUserRoleDto } from '../dto/CreateUserRoleDto';
import { UserRoleRepository } from '../persistence/repositories/UserRoleRepository';
import { UserRepository } from '../persistence/repositories/UserRepository';
import { User } from '../persistence/entities/UserEntity';
import { CreateUserDto } from '../dto/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    private readonly roleService: RoleService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('UserRoleRepository')
    private readonly userRoleRepository: UserRoleRepository,
  ) {}
  async create(data: CreateUserRoleDto): Promise<User> {
    await this.verifyExistsEmail(data.email);
    await this.verifyExistsCpfCnpj(data.cpf_cnpj);
    await this.roleService.verifyExistsRoles(data.roles);

    const user: CreateUserDto = {
      name: data.name,
      cpf_cnpj: data.cpf_cnpj,
      email: data.email,
      password: data.password,
    };
    const createUser = await this.userRepository.create(user);
    const findLastUser = await this.userRepository.findByLastId();
    const createUserRole = this.userRoleRepository.create(
      findLastUser.id,
      data.roles,
    );
    const result = Promise.all([createUser, findLastUser, createUserRole])
      .then(() => {
        return {
          id: createUser.id,
          nome: createUser.name,
          email: createUser.email,
          roles: data.roles,
        };
      })
      .catch((erro) => {
        console.log(erro);
        return null;
      });
    return result;
  }
  async verifyExistsEmail(email: string): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new HttpException(
        'Usuário já existente existente por e-mail',
        HttpStatus.CONFLICT,
      );
    }
    return await this.userRepository.findByEmail(email);
  }
  async verifyExistsCpfCnpj(cpf_cnpj: string): Promise<User> {
    const cpfCnpjExists = await this.userRepository.findByCpfCnpj(cpf_cnpj);
    if (cpfCnpjExists) {
      throw new HttpException(
        'Usuário já existente por Cpf/Cnpj ',
        HttpStatus.CONFLICT,
      );
    }
    return await this.userRepository.findByCpfCnpj(cpf_cnpj);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);
      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(
        'Usuário não foi encontrado',
        HttpStatus.CONFLICT,
      );
    }
  }
  async delete(id: number): Promise<User> {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}
