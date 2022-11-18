import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(5, { message: 'Nome deve ter pelo menos 5 caracteres' })
  @ApiProperty({ example: 'Talita' })
  name: string;
  @IsNotEmpty({ message: 'Cpf/Cnpj é obrigatório' })
  @MinLength(11, { message: 'Cpf/Cnpj deve ter pelo menos 11 caracteres' })
  @MaxLength(14, { message: 'Cpf/Cnpj deve ter no máximo 14 caracteres' })
  @ApiProperty({ example: '99999999902' })
  cpf_cnpj: string;
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;
  @IsNotEmpty({ message: 'Password é obrigatório' })
  @MinLength(6, { message: 'Password deve ter pelo menos 6 caracteres' })
  @ApiProperty({ example: '123456' })
  password: string;
}
