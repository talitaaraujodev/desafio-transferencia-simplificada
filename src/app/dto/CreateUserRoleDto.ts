import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './CreateUserDto';

export class CreateUserRoleDto extends CreateUserDto {
  @ApiProperty({ example: [1] })
  @IsNotEmpty({ message: 'Roles é obrigatório' })
  roles: number[];
}
