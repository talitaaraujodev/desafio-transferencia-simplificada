import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from '../../persistence/dto/createRole.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto extends CreateRoleDto {
  @IsNotEmpty({ message: 'Permissões é obrigatório' })
  @ApiProperty()
  permissions: number[];
}
