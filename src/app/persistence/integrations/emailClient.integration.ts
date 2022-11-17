import { Injectable } from '@nestjs/common';
import { EmailClienteIntegrationImp } from './implementations/emailCliente.integration.imp';

@Injectable()
export class EmailClientIntegration {
  constructor(
    private readonly emailClienteIntegrationImp: EmailClienteIntegrationImp,
  ) {}
  async notifyEmail() {
    return await this.emailClienteIntegrationImp.notify();
  }
}
