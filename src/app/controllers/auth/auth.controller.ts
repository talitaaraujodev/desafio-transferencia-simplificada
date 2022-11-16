import { TokenDto } from './../../persistence/dto/token.dto';
import { Post, Controller, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './../../services/auth/auth.service';
import { LoginDto } from './../../persistence/dto/login.dto';

@Controller({ path: 'login' })
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async auth(@Body() body: LoginDto): Promise<TokenDto> {
    return await this.authService.login(body);
  }
}
