import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../persistence/repositories/usuario/usuario.repository';
import { Usuario } from '../../persistence/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/app/persistence/dto/createUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const emailExists = await this.usuarioRepository.findByEmail(data.email);
    const cpfCnpjExists = await this.usuarioRepository.findByCpfCnpj(
      data.cpf_cnpj,
    );
    if (emailExists) {
      throw new HttpException('E-mail já existente', HttpStatus.CONFLICT);
    } else if (cpfCnpjExists) {
      throw new HttpException('Cpf/Cnpj já existente', HttpStatus.CONFLICT);
    }
    return await this.usuarioRepository.create(data);
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
