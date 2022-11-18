import { LoginDto } from '../dto/LoginDto';
import { TokenDto } from '../dto/TokenDto';
import { User } from '../persistence/entities/UserEntity';

export interface AuthService {
  login(data: LoginDto): Promise<TokenDto>;
  validateCredentials(data: LoginDto): Promise<User>;
}
