import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty({ example: 'Criar transferência' })
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty({ example: 'Permissão de criar transferência' })
  descricao: string;
}
