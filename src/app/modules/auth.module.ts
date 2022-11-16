import { Module } from '@nestjs/common';
import { UsuarioRepository } from './../persistence/repositories/usuario/usuario.repository';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsuarioRepository, PrismaService],
})
export class AuthModule {}
