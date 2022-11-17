import { Role } from '../entities/RoleEntity';

export interface RoleRepository {
  create(entity: Role): Promise<Role>;
  findAll(): Promise<Role[]>;
  findByName(name: string): Promise<Role>;
  findByLastId(): Promise<Role>;
  findByIds(ids: number[]): Promise<Role[]>;
}
