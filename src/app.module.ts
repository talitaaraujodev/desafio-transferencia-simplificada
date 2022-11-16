import { PermissionMiddleware } from './app/middlewares/permission.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RoleModule } from './app/modules/role.module';
import { UsuarioModule } from './app/modules/usuario.module';
import { PermissionModule } from './app/modules/permission.module';
import { PrismaModule } from './app/database/prisma.module';
import { AuthModule } from './app/modules/auth.module';
import { AuthMiddleware } from './app/middlewares/auth.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    PrismaModule,
    PermissionModule,
    RoleModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'usuarios', method: RequestMethod.POST },
      )
      .forRoutes(
        { path: 'usuarios', method: RequestMethod.ALL },
        { path: 'roles', method: RequestMethod.ALL },
        { path: 'permissions', method: RequestMethod.ALL },
      );
    // consumer
    //   .apply(PermissionMiddleware['ROLE_LOJISTA'])
    //   .forRoutes(
    //     { path: 'usuarios', method: RequestMethod.ALL },
    //     { path: 'roles', method: RequestMethod.ALL },
    //     { path: 'permissions', method: RequestMethod.ALL },
    //   );
  }
}
