import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { RoleService } from './../RoleService';
import { CreateRolePermissionDto } from '../../dto/CreateRolePermissionDto';
import { CreateRoleDto } from '../../dto/CreateRoleDto';
import { Permission } from '../../persistence/entities/PermissionEntity';
import { Role } from '../../persistence/entities/RoleEntity';
import { PermissionRepository } from '../../persistence/repositories/PermissionRepository';
import { RoleRepository } from '../../persistence/repositories/RoleRepository';
import { PermissionRoleRepository } from '../../persistence/repositories/PermissionRoleRepository';

@Injectable()
export class RoleServiceImp implements RoleService {
  constructor(
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository,
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepository,
    @Inject('PermissionRoleRepository')
    private readonly permissionRoleRepository: PermissionRoleRepository,
  ) {}

  async create(data: CreateRolePermissionDto): Promise<Role> {
    await this.verifyExistsRole(data.name);
    await this.permissionRepository.findManyByIds(data.permissions);

    const role: CreateRoleDto = {
      name: data.name,
      description: data.description,
    };
    const createRole = await this.roleRepository.create(role);
    const findLastRole = await this.roleRepository.findByLastId();

    const createPermissionRole = await this.permissionRoleRepository.create(
      findLastRole.id,
      data.permissions,
    );
    const result = Promise.all([createRole, findLastRole, createPermissionRole])
      .then(() => {
        return {
          id: createRole.id,
          nome: createRole.name,
          description: createRole.description,
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
  async verifyExistsPermissions(
    permissions: number[],
  ): Promise<Permission[] | HttpException> {
    const permissionExists = await this.permissionRepository.findManyByIds(
      permissions,
    );
    if (permissionExists) {
      throw new HttpException('Permissiões são inválidas', HttpStatus.CONFLICT);
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
