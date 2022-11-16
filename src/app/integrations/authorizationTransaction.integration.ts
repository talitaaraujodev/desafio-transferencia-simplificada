import { Injectable } from '@nestjs/common';
import { AuthorizationIntegrationImp } from './implementations/authorizationTransaction.integration.imp';

@Injectable()
export class AuthorizationTransaction {
  constructor(
    private readonly authorizationTransactionImp: AuthorizationIntegrationImp,
  ) {}
  async authorization() {
    return this.authorizationTransactionImp.authorization();
  }
}
