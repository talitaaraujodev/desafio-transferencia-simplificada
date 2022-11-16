import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCarteiraDto {
  @IsNotEmpty({ message: 'Saldo é obrigatório' })
  @ApiProperty()
  saldo: number;
  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  @ApiProperty()
  usuario_id: number;
  @IsNotEmpty({ message: 'Tipo de carteira é obrigatório' })
  @ApiProperty()
  tipo_id: number;
}
