import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './CreateRoleDto';
import { IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto extends CreateRoleDto {
  @IsNotEmpty({ message: 'Permissões é obrigatório' })
  @ApiProperty({ example: [1] })
  permissions: number[];
}
