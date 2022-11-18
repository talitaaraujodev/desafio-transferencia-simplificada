import { TokenDto } from '../dto/TokenDto';
import { Post, Controller, Body, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/AuthService';
import { LoginDto } from '../dto/LoginDto';

@Controller({ path: 'login' })
@ApiTags('Login')
export class AuthController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}
  @ApiOperation({ summary: 'Autenticação do usuário' })
  @Post()
  async auth(@Body() body: LoginDto): Promise<TokenDto> {
    return await this.authService.login(body);
  }
}
