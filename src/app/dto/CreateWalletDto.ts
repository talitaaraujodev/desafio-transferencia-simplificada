import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty({ message: 'Saldo é obrigatório' })
  @ApiProperty({ example: 100 })
  balance: number;
  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  @ApiProperty({ example: 1 })
  user_id: number;
  @IsNotEmpty({ message: 'Tipo de carteira é obrigatório' })
  @ApiProperty({ example: 1 })
  tipo_id: number;
}
