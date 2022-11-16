import { PermissionMiddlewareCreator } from './app/middlewares/permission.middleware';
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
import { CarteiraController } from './app/controllers/carteira/carteira.controller';
import { CarteiraService } from './app/services/carteira/carteira.service';

@Module({
  imports: [
    PrismaModule,
    PermissionModule,
    RoleModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [CarteiraController],
  providers: [CarteiraService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'usuarios', method: RequestMethod.POST },
      )
      .forRoutes({ path: 'usuarios', method: RequestMethod.ALL });
    consumer
      .apply(PermissionMiddlewareCreator(['ROLE_LOJISTA']))
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'usuarios', method: RequestMethod.POST },
      )
      .forRoutes({ path: 'usuarios', method: RequestMethod.ALL });
  }
}
