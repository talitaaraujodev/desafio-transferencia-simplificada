import { Module } from '@nestjs/common';
import { RoleModule } from './app/modules/role.module';
import { UsuarioModule } from './app/modules/usuario.module';
import { PermissionModule } from './app/modules/permission.module';
import { PrismaModule } from './app/database/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    PermissionModule,
    RoleModule,
    UsuarioModule,
  ],
})
export class AppModule {}
