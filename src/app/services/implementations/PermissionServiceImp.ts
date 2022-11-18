import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Permission } from '../../persistence/entities/PermissionEntity';
import { CreatePermissionDto } from '../../dto/CreatePermissionDto';
import { PermissionRepository } from '../../persistence/repositories/PermissionRepository';
import { PermissionService } from '../PermissionService';

@Injectable()
export class PermissionServiceImp implements PermissionService {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepository,
  ) {}
  async create(data: CreatePermissionDto): Promise<Permission> {
    const permissionExists = await this.permissionRepository.findByName(
      data.name,
    );
    if (permissionExists) {
      throw new HttpException('Permissão já existente', HttpStatus.CONFLICT);
    }
    return await this.permissionRepository.create(data);
  }
  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.findAll();
  }
}
