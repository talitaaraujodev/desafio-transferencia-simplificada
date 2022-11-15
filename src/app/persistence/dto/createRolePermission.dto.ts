import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from '../../persistence/dto/createRole.dto';
import { IsArray } from 'class-validator';

export class CreateRolePermissionDto extends CreateRoleDto {
  @IsArray()
  @ApiProperty()
  permissions: number[];
}
