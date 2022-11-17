import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { EmailClient } from './../integrations/EmailClient';
import { AuthorizationTransactionClient } from './../integrations/AuthorizationTransactionClient';
import { CreateTransferDto } from '../dto/CreateTranferDto';
import { UserService } from './UserService';
import { Transfer } from '../persistence/entities/TransferEntity';
import { TransferRepository } from '../persistence/repositories/TranferRepository';
import { WalletService } from './WalletService';

@Injectable()
export class TransferService {
  constructor(
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    @Inject('EmailClient')
    private readonly emailClient: EmailClient,
    @Inject('AuthorizationTransactionClient')
    private readonly authorizationTransactionClient: AuthorizationTransactionClient,
    @Inject('TransferRepository')
    private readonly transferRepository: TransferRepository,
  ) {}

  async create(data: CreateTransferDto): Promise<Transfer> {
    await this.walletService.findOne(data.carteira_origem);
    await this.walletService.findOne(data.carteira_destinatario);
    await this.userService.findOne(data.usuario_origem);
    await this.walletService.findOne(data.usuario_destinatario);
    await this.walletService.verifySaldo(data.carteira_origem, data.value);

    const transfer = await this.transferRepository.create(data);
    const verifyAuthorization =
      await this.authorizationTransactionClient.authorization();
    const sendEmail = await this.emailClient.notifyEmail();

    const updateWalletOrigem = await this.walletService.decreaseSaldo(
      data.carteira_origem,
      data.value,
    );
    const updateWalletDestinatario = await this.walletService.increaseSaldo(
      data.carteira_destinatario,
      data.value,
    );
    const findLastIdTransfer = await this.transferRepository.findLastId();

    const result: any = Promise.all([
      transfer,
      verifyAuthorization,
      findLastIdTransfer,
      updateWalletOrigem,
      updateWalletDestinatario,
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
          findLastIdTransfer.id,
          transferencia,
        );
      })
      .catch((erro) => {
        console.log(erro);
        throw new HttpException(
          'Ocorreram erros ao concluir transferência',
          HttpStatus.BAD_GATEWAY,
        );
      });

    return result;
  }
}
