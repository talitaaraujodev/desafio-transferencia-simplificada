import { UsuarioModule } from './app/modules/usuario.module';
import { PermissionModule } from './app/modules/permission.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './app/database/prisma.module';

@Module({
  imports: [PrismaModule, UsuarioModule, PermissionModule],
})
export class AppModule {}
