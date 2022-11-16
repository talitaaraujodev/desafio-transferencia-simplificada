import { Injectable } from '@nestjs/common';
import { EmailClienteIntegrationImp } from './implementations/emailCliente.integration.imp';

@Injectable()
export class EmailClient {
  constructor(
    private readonly emailClienteIntegrationImp: EmailClienteIntegrationImp,
  ) {}
  async notifyEmail() {
    return this.emailClienteIntegrationImp.notifyEmail();
  }
}
