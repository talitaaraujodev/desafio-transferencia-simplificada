import { RoleService } from './../role/role.service';
import { CreateUsuarioRoleDto } from './../../persistence/dto/createUsuarioRole.dto';
import { UsuarioRoleRepository } from './../../persistence/repositories/usuarioRole/usuarioRole.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../persistence/repositories/usuario/usuario.repository';
import { Usuario } from '../../persistence/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/app/persistence/dto/createUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly roleService: RoleService,
    private readonly usuarioRoleRepository: UsuarioRoleRepository,
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
    const createUser = await this.usuarioRepository.create(user);
    const findLastUser = await this.usuarioRepository.findByLastId();
    const createUsuarioRole = this.usuarioRoleRepository.create(
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
    const emailExists = await this.usuarioRepository.findByEmail(email);
    if (emailExists) {
      throw new HttpException('E-mail já existente', HttpStatus.CONFLICT);
    }
    return await this.usuarioRepository.findByEmail(email);
  }
  async verifyExistsCpfCnpj(cpf_cnpj: string): Promise<Usuario> {
    const cpfCnpjExists = await this.usuarioRepository.findByCpfCnpj(cpf_cnpj);
    if (cpfCnpjExists) {
      throw new HttpException('Cpf/Cnpj já existente', HttpStatus.CONFLICT);
    }
    return await this.usuarioRepository.findByCpfCnpj(cpf_cnpj);
  }
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.findAll();
  }
  async findOne(id: number): Promise<Usuario> {
    const usuarioExists = await this.usuarioRepository.findOne(id);
    if (usuarioExists) {
      throw new HttpException('Usuário já existente', HttpStatus.BAD_REQUEST);
    }
    return await this.usuarioRepository.findOne(id);
  }
  async delete(id: number): Promise<Usuario> {
    await this.findOne(id);
    return await this.usuarioRepository.delete(id);
  }
}
