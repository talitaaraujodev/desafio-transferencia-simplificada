export interface PermissionRoleRepository {
  create(role: number, permissions: number[]): Promise<void>;
}
