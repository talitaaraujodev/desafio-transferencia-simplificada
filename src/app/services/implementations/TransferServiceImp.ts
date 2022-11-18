import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { TransferService } from './../TranferService';
import { EmailClient } from '../../integrations/EmailClient';
import { AuthorizationTransactionClient } from '../../integrations/AuthorizationTransactionClient';
import { CreateTransferDto } from '../../dto/CreateTranferDto';
import { UserService } from '../UserService';
import { Transfer } from '../../persistence/entities/TransferEntity';
import { TransferRepository } from '../../persistence/repositories/TranferRepository';
import { WalletService } from '../WalletService';

@Injectable()
export class TransferServiceImp implements TransferService {
  constructor(
    @Inject('WalletService')
    private readonly walletService: WalletService,
    @Inject('UserService')
    private readonly userService: UserService,
    @Inject('EmailClient')
    private readonly emailClient: EmailClient,
    @Inject('AuthorizationTransactionClient')
    private readonly authorizationTransactionClient: AuthorizationTransactionClient,
    @Inject('TransferRepository')
    private readonly transferRepository: TransferRepository,
  ) {}

  async create(data: CreateTransferDto): Promise<Transfer> {
    await this.walletService.findOne(data.wallet_origem);
    await this.walletService.findOne(data.wallet_destinatario);
    await this.userService.findOne(data.user_origem);
    await this.walletService.findOne(data.user_destinatario);
    await this.walletService.verifyBalance(data.wallet_origem, data.value);

    const transfer = await this.transferRepository.create(data);
    const verifyAuthorization =
      await this.authorizationTransactionClient.authorization();
    const sendEmail = await this.emailClient.notifyEmail();

    const updateWalletOrigem = await this.walletService.decreaseBalance(
      data.wallet_origem,
      data.value,
    );
    const updateWalletDestinatario = await this.walletService.increaseBalance(
      data.wallet_destinatario,
      data.value,
    );
    const findLastIdTransfer = await this.transferRepository.findLastId();

    const result = Promise.all([
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
          wallet_origem: data.wallet_origem,
          wallet_destinatario: data.wallet_destinatario,
          user_origem: data.user_origem,
          user_destinatario: data.user_destinatario,
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
  async findAll(): Promise<Transfer[]> {
    return await this.transferRepository.findAll();
  }
  async findOne(id: number): Promise<Transfer> {
    try {
      const transfer = await this.transferRepository.findOne(id);
      return transfer;
    } catch (error) {
      throw new HttpException(
        'Transferência não foi encontrada',
        HttpStatus.CONFLICT,
      );
    }
  }
}
