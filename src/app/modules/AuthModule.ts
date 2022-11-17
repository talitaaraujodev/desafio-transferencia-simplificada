import { Module } from '@nestjs/common';
import { UserRepository } from '../persistence/repositories/UserRepository';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaService],
})
export class AuthModule {}
