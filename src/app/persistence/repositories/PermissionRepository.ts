import { Permission } from '../entities/PermissionEntity';

export interface PermissionRepository {
  create(entity: Permission): Promise<Permission>;
  findAll(): Promise<Permission[]>;
  findByName(name: string): Promise<Permission>;
  findManyByIds(ids: number[]): Promise<Permission[]>;
}
