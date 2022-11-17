import { Module } from '@nestjs/common';
import { PermissionRoleRepository } from '../persistence/repositories/PermissionRoleRepository';
import { PermissionRepository } from '../persistence/repositories/PermissionRepository';
import { RoleService } from '../services/RoleService';
import { WalletRepository } from '../persistence/repositories/WalletRepository';
import { WalletTypeRepository } from '../persistence/repositories/WalletTypeRepository';
import { UserRepository } from '../persistence/repositories/UserRepository';
import { WalletTypeService } from '../services/WalletTypeService';
import { UserService } from '../services/UserService';
import { WalletController } from '../controllers/WalletController';
import { PrismaService } from '../config/database/PrismaService';
import { WalletService } from '../services/WalletService';
import { UserRoleRepository } from '../persistence/repositories/UserRoleRepository';
import { RoleRepository } from '../persistence/repositories/RoleRepository';
@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
    WalletRepository,
    UserService,
    RoleService,
    WalletTypeService,
    WalletTypeRepository,
    UserRepository,
    UserRoleRepository,
    RoleRepository,
    PermissionRepository,
    PermissionRoleRepository,
    PrismaService,
  ],
})
export class WalletModule {}
