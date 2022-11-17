import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(5, { message: 'Nome deve ter pelo menos 5 caracteres' })
  @ApiProperty({ example: 'Criar transferência' })
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty({ example: 'Permissão de criar transferência' })
  descricao: string;
}
