import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleService } from './RoleService';
import { CreateUsuarioRoleDto } from '../dto/createUsuarioRole.dto';
import { UsuarioRoleRepository } from '../persistence/repositories/usuarioRole/usuarioRole.repository';
import { UsuarioRepository } from '../persistence/repositories/usuario/usuario.repository';
import { Usuario } from '../persistence/entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/createUsuario.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsuarioRepository,
    private readonly roleService: RoleService,
    private readonly userRoleRepository: UsuarioRoleRepository,
  ) {}
  async create(data: CreateUsuarioRoleDto): Promise<Usuario> {
    await this.verifyExistsEmail(data.email);
    await this.verifyExistsCpfCnpj(data.cpf_cnpj);
    await this.roleService.verifyExistsRoles(data.roles);

    const user: CreateUsuarioDto = {
      name: data.name,
      cpf_cnpj: data.cpf_cnpj,
      email: data.email,
      password: data.password,
    };
    const createUser = await this.userRepository.create(user);
    const findLastUser = await this.userRepository.findByLastId();
    const createUsuarioRole = this.userRoleRepository.create(
      findLastUser.id,
      data.roles,
    );
    const result = Promise.all([createUser, findLastUser, createUsuarioRole])
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
  async verifyExistsEmail(email: string): Promise<Usuario> {
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new HttpException(
        'Usuário já existente existente por e-mail',
        HttpStatus.CONFLICT,
      );
    }
    return await this.userRepository.findByEmail(email);
  }
  async verifyExistsCpfCnpj(cpf_cnpj: string): Promise<Usuario> {
    const cpfCnpjExists = await this.userRepository.findByCpfCnpj(cpf_cnpj);
    if (cpfCnpjExists) {
      throw new HttpException(
        'Usuário já existente por Cpf/Cnpj ',
        HttpStatus.CONFLICT,
      );
    }
    return await this.userRepository.findByCpfCnpj(cpf_cnpj);
  }
  async findAll(): Promise<Usuario[]> {
    return await this.userRepository.findAll();
  }
  async findOne(id: number): Promise<Usuario> {
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
  async delete(id: number): Promise<Usuario> {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}
