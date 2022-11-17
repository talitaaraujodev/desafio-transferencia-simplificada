export interface UserRoleRepository {
  create(usuario: number, roles: number[]): Promise<void>;
}
