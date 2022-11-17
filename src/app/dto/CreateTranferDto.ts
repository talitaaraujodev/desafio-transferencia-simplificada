import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransferDto {
  @IsNotEmpty({ message: 'Valor é obrigatório' })
  @ApiProperty({ example: 50 })
  value: number;
  @IsOptional()
  status: 'Pendente' | 'Finalizado';
  @IsNotEmpty({ message: 'Carteira de origem é obrigatório' })
  @ApiProperty({ example: 1 })
  wallet_origem: number;
  @IsNotEmpty({ message: 'Carteira de destinatário é obrigatório' })
  @ApiProperty({ example: 2 })
  wallet_destinatario: number;
  @IsNotEmpty({ message: 'Usuário de origem é obrigatório' })
  @ApiProperty({ example: 1 })
  user_origem: number;
  @IsNotEmpty({ message: 'Usuário de destinatário é obrigatório' })
  @ApiProperty({ example: 2 })
  user_destinatario: number;
}
