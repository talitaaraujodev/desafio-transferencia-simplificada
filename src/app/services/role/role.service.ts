import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from '../../persistence/dto/createRolePermission.dto';
import { CreateRoleDto } from '../../persistence/dto/createRole.dto';
import { Permission } from './../../persistence/entities/permission.entity';
import { Role } from './../../persistence/entities/role.entity';
import { PermissionRepository } from '../../persistence/repositories/permission/permission.repository';
import { RoleRepository } from '../../persistence/repositories/role/RoleRepository';
import { PermissionRoleRepository } from '../../persistence/repositories/permissionRole/permissionRole.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly permissionRole: PermissionRoleRepository,
  ) {}

  async create(data: CreateRolePermissionDto): Promise<Role> {
    await this.verifyExistsRole(data.name);
    await this.permissionRepository.findManyByIds(data.permissions);

    const role: CreateRoleDto = {
      name: data.name,
      descricao: data.descricao,
    };
    const createRole = await this.roleRepository.create(role);
    const findLastRole = await this.roleRepository.findByLastId();

    const createPermissionRole = await this.permissionRole.create(
      findLastRole.id,
      data.permissions,
    );
    const result = Promise.all([createRole, findLastRole, createPermissionRole])
      .then(() => {
        return {
          id: createRole.id,
          nome: createRole.name,
          descricao: createRole.descricao,
          permissions: data.permissions,
        };
      })
      .catch((erro) => {
        console.log(erro);
        return null;
      });
    return result;
  }
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }
  async verifyExistsRole(name: string): Promise<Role | HttpException> {
    const roleExists = await this.roleRepository.findByName(name);
    if (roleExists) {
      throw new HttpException('Role já existente', HttpStatus.CONFLICT);
    }
    return await this.roleRepository.findByName(name);
  }
  async verifyExistsPermission(
    permissions: number[],
  ): Promise<Permission[] | HttpException> {
    const permissionExists = await this.permissionRepository.findManyByIds(
      permissions,
    );
    if (permissionExists) {
      throw new HttpException('Permission já existente', HttpStatus.CONFLICT);
    }
    return await this.permissionRepository.findManyByIds(permissions);
  }
  async verifyExistsRoles(ids: number[]): Promise<Role[]> {
    const roles: Role[] = await this.roleRepository.findByIds(ids);
    if (roles.length === 0) {
      throw new HttpException('Roles são inválidas', HttpStatus.CONFLICT);
    }
    return roles;
  }
}
