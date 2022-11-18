import { HttpException } from '@nestjs/common';
import { Permission } from './../persistence/entities/PermissionEntity';
import { CreateRolePermissionDto } from '../dto/CreateRolePermissionDto';
import { Role } from '../persistence/entities/RoleEntity';

export interface RoleService {
  create(data: CreateRolePermissionDto): Promise<Role>;
  findAll(): Promise<Role[]>;
  verifyExistsRole(name: string): Promise<Role | HttpException>;
  verifyExistsRoles(ids: number[]): Promise<Role[]>;
  verifyExistsPermissions(
    permissions: number[],
  ): Promise<Permission[] | HttpException>;
}
