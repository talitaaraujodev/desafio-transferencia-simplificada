import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTipoCarteiraDto } from './../../persistence/dto/createTipoCarteira.dto';
import { TipoCarteira } from './../../persistence/entities/tipoCarteira.entity';
import { TipoCarteiraRepository } from './../../persistence/repositories/tipoCarteira/tipoCarteira.repository';

@Injectable()
export class TipoCarteiraService {
  constructor(
    private readonly tipoCarteiraRepository: TipoCarteiraRepository,
  ) {}

  async create(data: CreateTipoCarteiraDto): Promise<TipoCarteira> {
    return await this.tipoCarteiraRepository.create(data);
  }
  async findAll(): Promise<TipoCarteira[]> {
    return await this.tipoCarteiraRepository.findAll();
  }
  async findOne(id: number): Promise<TipoCarteira> {
    try {
      const tipoCarteira = await this.tipoCarteiraRepository.findOne(id);
      return tipoCarteira;
    } catch (error) {
      throw new HttpException(
        'Tipo de carteira não foi encontrado',
        HttpStatus.CONFLICT,
      );
    }
  }
}
