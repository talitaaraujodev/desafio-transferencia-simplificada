import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty()
  descricao: string;
}
