import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Permission } from '../persistence/entities/PermissionEntity';
import { CreatePermissionDto } from '../dto/CreatePermissionDto';
import { PermissionRepository } from '../persistence/repositories/PermissionRepository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}
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
