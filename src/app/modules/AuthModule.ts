import { AuthServiceImp } from './../services/implementations/AuthServiceImp';
import { Module } from '@nestjs/common';
import { UserRepositoryImp } from '../persistence/repositories/implementations/UserRepositoryImp';
import { AuthController } from '../controllers/AuthController';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImp,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImp,
    },
    PrismaService,
  ],
})
export class AuthModule {}
