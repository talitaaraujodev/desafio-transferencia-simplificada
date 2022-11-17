import { AuthorizationDto } from '../dto/AuthorizationDto';

export interface AuthorizationTransactionClient {
  authorization(): Promise<AuthorizationDto>;
}
