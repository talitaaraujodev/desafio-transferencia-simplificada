import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './CreateUserDto';

export class CreateUserRoleDto extends CreateUserDto {
  @ApiProperty()
  @IsNumber({}, { each: true })
  roles: number[];
}
