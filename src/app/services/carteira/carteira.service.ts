import { UpdateCarteiraDto } from './../../persistence/dto/updateCarteira.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TipoCarteiraService } from '../../services/tipoCarteira/tipoCarteira.service';
import { Carteira } from './../../persistence/entities/carteira.entity';
import { CreateCarteiraDto } from './../../persistence/dto/createCarteira.dto';
import { CarteiraRepository } from './../../persistence/repositories/carteira/carteira.repository';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class CarteiraService {
  constructor(
    private readonly carteiraRepository: CarteiraRepository,
    private readonly usuarioService: UsuarioService,
    private readonly tipoCarteiraService: TipoCarteiraService,
  ) {}
  async create(data: CreateCarteiraDto): Promise<Carteira> {
    await this.usuarioService.findOne(data.usuario_id);
    await this.tipoCarteiraService.findOne(data.tipo_id);
    return await this.carteiraRepository.create(data);
  }
  async findAll(): Promise<Carteira[]> {
    return await this.carteiraRepository.findAll();
  }
  async findOne(id: number): Promise<Carteira> {
    try {
      const carteira = await this.carteiraRepository.findOne(id);
      return carteira;
    } catch (error) {
      throw new HttpException(
        'Carteira não foi encontrada',
        HttpStatus.CONFLICT,
      );
    }
  }
  async delete(id: number): Promise<Carteira> {
    await this.findOne(id);
    return await this.carteiraRepository.delete(id);
  }
  async;
  async update(id: number, data: UpdateCarteiraDto): Promise<Carteira> {
    await this.usuarioService.findOne(data.usuario_id);
    await this.tipoCarteiraService.findOne(data.tipo_id);
    await this.findOne(id);
    return await this.carteiraRepository.update(id, data);
  }
  async verifySaldo(id: number, value: number): Promise<Carteira> {
    const carteira: Carteira = await this.findOne(id);
    if (carteira.saldo < value) {
      throw new HttpException(
        'Saldo para a trâsferência insuficiente',
        HttpStatus.BAD_REQUEST,
      );
    }
    return carteira;
  }
  async decreaseSaldo(id: number, value: number): Promise<Carteira> {
    const carteira = await this.findOne(id);
    const saldoAtual = carteira.saldo - value;
    const data: UpdateCarteiraDto = {
      saldo: saldoAtual,
      usuario_id: carteira.usuario_id,
      tipo_id: carteira.tipo_id,
    };

    return await this.update(id, data);
  }
  async increaseSaldo(id: number, value: number): Promise<Carteira> {
    const carteira = await this.findOne(id);
    const saldoAtual = carteira.saldo + value;
    const data: UpdateCarteiraDto = {
      saldo: saldoAtual,
      usuario_id: carteira.usuario_id,
      tipo_id: carteira.tipo_id,
    };

    return await this.update(id, data);
  }
}
