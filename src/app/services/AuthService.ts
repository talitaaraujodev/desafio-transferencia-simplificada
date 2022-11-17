import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../persistence/repositories/UserRepository';
import { PayloadDto } from '../dto/PayloadDto';
import { LoginDto } from '../dto/LoginDto';
import { TokenDto } from '../dto/TokenDto';
import { User } from '../persistence/entities/UserEntity';
import env from '../config/env';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}
  async login(data: LoginDto): Promise<TokenDto> {
    const user = await this.validateCredentials(data);

    const payload: PayloadDto = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      access_token: sign(
        {
          subject: payload,
        },
        env.jwtSecret,
        { expiresIn: env.expiresIn },
      ),
    };
  }
  async validateCredentials(data: LoginDto): Promise<User> {
    const usuario = await this.userRepository.findByEmail(data.email);

    if (usuario) {
      const isPasswordValid = compareSync(data.password, usuario.password);
      if (isPasswordValid) {
        return usuario;
      }
    }
    throw new HttpException(
      'E-mail ou senha estão incorretos',
      HttpStatus.BAD_REQUEST,
    );
  }
}
