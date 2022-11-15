import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateUsuarioDto } from './createUsuario.dto';

export class CreateUsuarioRoleDto extends CreateUsuarioDto {
  @ApiProperty()
  @IsNumber({}, { each: true })
  roles: number[];
}
