import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWalletTypeDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty({ example: 'Carteira de lojista' })
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty({ example: 'Tipo de carteira lojista' })
  descricao: string;
}
