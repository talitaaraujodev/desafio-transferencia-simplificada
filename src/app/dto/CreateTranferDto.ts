import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransferDto {
  @IsNotEmpty({ message: 'Valor é obrigatório' })
  @ApiProperty()
  value: number;
  @IsOptional()
  status: 'Pendente' | 'Finalizado';
  @IsNotEmpty({ message: 'Carteira de origem é obrigatório' })
  @ApiProperty()
  wallet_origem: number;
  @IsNotEmpty({ message: 'Carteira de destinatário é obrigatório' })
  @ApiProperty()
  wallet_destinatario: number;
  @IsNotEmpty({ message: 'Usuário de origem é obrigatório' })
  @ApiProperty()
  user_origem: number;
  @IsNotEmpty({ message: 'Usuário de destinatário é obrigatório' })
  @ApiProperty()
  user_destinatario: number;
}
