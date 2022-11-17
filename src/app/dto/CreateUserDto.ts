import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: 'Cpf/Cnpj é obrigatório' })
  @MinLength(11, { message: 'Cpf/Cnpj deve ter pelo menos 11 caracteres' })
  @MaxLength(14, { message: 'Cpf/Cnpj deve ter no máximo 14 caracteres' })
  @ApiProperty()
  cpf_cnpj: string;
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: 'Password é obrigatório' })
  @MinLength(6, { message: 'Password deve ter pelo menos 6 caracteres' })
  @ApiProperty()
  password: string;
}
