import { Module } from '@nestjs/common';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImp,
    },
    AuthService,
    PrismaService,
  ],
})
export class AuthModule {}
