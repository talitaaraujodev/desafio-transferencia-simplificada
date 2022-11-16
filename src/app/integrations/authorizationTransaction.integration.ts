import { Injectable } from '@nestjs/common';
import { AuthorizationIntegrationImp } from './implementations/authorizationTransaction.integration.imp';

@Injectable()
export class AuthorizationTransactionIntegration {
  constructor(
    private readonly authorizationTransactionImp: AuthorizationIntegrationImp,
  ) {}
  async authorization() {
    return await this.authorizationTransactionImp.authorization();
  }
}
