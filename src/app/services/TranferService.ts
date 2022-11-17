import { Injectable } from '@nestjs/common';
import { AuthorizationTransactionIntegration } from '../persistence/integrations/authorizationTransaction.integration';
import { EmailClientIntegration } from '../persistence/integrations/emailClient.integration';
import { CreateTransferDto } from '../dto/CreateTranferDto';
import { UserService } from './UserService';
import { Transfer } from '../persistence/entities/TransferEntity';
import { TransferenciaRepository } from '../persistence/repositories/transferencia/transferencia.repository';
import { WalletService } from './WalletService';

@Injectable()
export class TransferService {
  constructor(
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly transferRepository: TransferenciaRepository,
    private readonly emailClientIntegration: EmailClientIntegration,
    private readonly authorizationTransactionIntegration: AuthorizationTransactionIntegration,
  ) {}

  async create(data: CreateTransferDto): Promise<Transfer> {
    await this.walletService.findOne(data.carteira_origem);
    await this.walletService.findOne(data.carteira_destinatario);
    await this.userService.findOne(data.usuario_origem);
    await this.walletService.findOne(data.usuario_destinatario);
    await this.walletService.verifySaldo(data.carteira_origem, data.value);

    const transfer = await this.transferRepository.create(data);
    const verifyAuthorization =
      await this.authorizationTransactionIntegration.authorization();
    const sendEmail = await this.emailClientIntegration.notifyEmail();

    const updateCarteiraOrigem = await this.walletService.decreaseSaldo(
      data.carteira_origem,
      data.value,
    );
    const updateCarteiraDestinatario = await this.walletService.increaseSaldo(
      data.carteira_destinatario,
      data.value,
    );
    const findLastIdTransferencia = await this.transferRepository.findLastId();

    const result: any = Promise.all([
      transfer,
      verifyAuthorization,
      findLastIdTransferencia,
      updateCarteiraOrigem,
      updateCarteiraDestinatario,
      sendEmail,
    ])
      .then(() => {
        const transferencia: Transfer = {
          value: data.value,
          status: 'Finalizado',
          carteira_origem: data.carteira_origem,
          carteira_destinatario: data.carteira_destinatario,
          usuario_origem: data.usuario_origem,
          usuario_destinatario: data.usuario_destinatario,
        };

        return this.transferRepository.update(
          findLastIdTransferencia.id,
          transferencia,
        );
      })
      .catch((erro) => {
        console.log(erro);
      });

    return result;
  }
}
