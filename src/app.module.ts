import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WalletModule } from './app/modules/WalletModule';
import { WalletTypeModule } from './app/modules/WalletTypeModule';
import { RoleModule } from './app/modules/RoleModule';
import { UserModule } from './app/modules/UserModule';
import { PermissionModule } from './app/modules/PermissionModule';
import { PrismaModule } from './app/config/database/PrismaModule';
import { AuthModule } from './app/modules/AuthModule';
import { TransferModule } from './app/modules/TranferModule';
import { PermissionMiddlewareCreator } from './app/config/middlewares/permission.middleware';
import { AuthMiddleware } from './app/config/middlewares/auth.middleware';

@Module({
  imports: [
    PrismaModule,
    PermissionModule,
    RoleModule,
    UserModule,
    AuthModule,
    WalletTypeModule,
    WalletModule,
    TransferModule,
  ],
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
