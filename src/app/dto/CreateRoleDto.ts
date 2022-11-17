import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(5, { message: 'Nome deve ter pelo menos 5 caracteres' })
  @ApiProperty({ example: 'ROLE_LOJISTA' })
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty({ example: 'Role de usuário lojista' })
  descricao: string;
}
