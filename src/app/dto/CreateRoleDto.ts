import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty({ example: 'ROLE_LOJISTA' })
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty({ example: 'Role de usuário lojista' })
  descricao: string;
}
