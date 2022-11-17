import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty()
  descricao: string;
}
