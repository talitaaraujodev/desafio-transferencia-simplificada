import { Module } from '@nestjs/common';
import { UsuarioRepository } from '../persistence/repositories/usuario/usuario.repository';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { PrismaService } from '../config/database/PrismaService';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsuarioRepository, PrismaService],
})
export class AuthModule {}
