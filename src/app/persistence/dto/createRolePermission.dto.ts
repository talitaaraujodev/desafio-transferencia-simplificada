import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/app/persistence/dto/createRole.dto';
import { IsArray } from 'class-validator';

export class CreateRolePermissionDto extends CreateRoleDto {
  @IsArray()
  @ApiProperty()
  permissions: number[];
}
