import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUsuarioRoleDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: 'Cpf/Cnpj é obrigatório' })
  @ApiProperty()
  cpf_cnpj: string;
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: 'Password é obrigatório' })
  @ApiProperty()
  password: string;
  @IsNotEmpty({ message: 'Roles é obrigatório' })
  @ApiProperty()
  roles: number[];
}
