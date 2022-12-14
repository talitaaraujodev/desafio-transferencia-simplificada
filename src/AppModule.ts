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
import { PermissionMiddlewareCreator } from './app/config/middlewares/PermissionMiddleware';
import { AuthMiddleware } from './app/config/middlewares/AuthMiddleware';

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
        { path: 'user', method: RequestMethod.POST },
        { path: 'permission', method: RequestMethod.ALL },
        { path: 'role', method: RequestMethod.ALL },
      )
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.DELETE },
        { path: 'wallet', method: RequestMethod.ALL },
        { path: 'walletType', method: RequestMethod.ALL },
        { path: 'transfer', method: RequestMethod.GET },
      );
    consumer
      .apply(PermissionMiddlewareCreator(['ROLE_COMUM']))
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.POST },
        { path: 'role', method: RequestMethod.ALL },
        { path: 'permission', method: RequestMethod.ALL },
        { path: 'wallet', method: RequestMethod.ALL },
        { path: 'walletType', method: RequestMethod.ALL },
      )
      .forRoutes({ path: 'transfer', method: RequestMethod.POST });
    consumer
      .apply(PermissionMiddlewareCreator(['ROLE_LOJISTA', 'ROLE_COMUM']))
      .forRoutes(
        { path: 'transfer', method: RequestMethod.GET },
        { path: 'wallet', method: RequestMethod.ALL },
        { path: 'walletType', method: RequestMethod.ALL },
      );
  }
}
