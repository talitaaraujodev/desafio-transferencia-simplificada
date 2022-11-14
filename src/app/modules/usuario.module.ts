import { UsuarioRepository } from './../persistence/repositories/usuario/usuario.repository';
import { Module } from '@nestjs/common';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioController } from '../controllers/usuario/usuario.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, PrismaService],
})
export class UsuarioModule {}
