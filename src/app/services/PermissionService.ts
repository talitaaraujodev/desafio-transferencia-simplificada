import { Permission } from './../persistence/entities/PermissionEntity';
import { CreatePermissionDto } from './../dto/CreatePermissionDto';
export interface PermissionService {
  create(data: CreatePermissionDto): Promise<Permission>;
  findAll(): Promise<Permission[]>;
}
