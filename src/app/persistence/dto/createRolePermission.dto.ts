import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: 'Descrição é obrigatório' })
  @ApiProperty()
  descricao: string;
  @IsNotEmpty({ message: 'Permissions é obrigatório' })
  @ApiProperty()
  permissions: number[];
}
