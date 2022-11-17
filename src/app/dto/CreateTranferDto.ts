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
  carteira_origem: number;
  @IsNotEmpty({ message: 'Carteira de destinatário é obrigatório' })
  @ApiProperty()
  carteira_destinatario: number;
  @IsNotEmpty({ message: 'Usuário de origem é obrigatório' })
  @ApiProperty()
  usuario_origem: number;
  @IsNotEmpty({ message: 'Usuário de destinatário é obrigatório' })
  @ApiProperty()
  usuario_destinatario: number;
}
