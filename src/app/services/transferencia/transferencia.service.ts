import { AuthorizationTransactionIntegration } from './../../integrations/authorizationTransaction.integration';
import { EmailClientIntegration } from './../../integrations/emailClient.integration';
import { CreateTransferenciaDto } from './../../persistence/dto/createTransferencia.dto';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@nestjs/common';
import { Transferencia } from '../../persistence/entities/transferencia.entity';
import { TransferenciaRepository } from './../../persistence/repositories/transferencia/transferencia.repository';
import { CarteiraService } from './../carteira/carteira.service';

@Injectable()
export class TransferenciaService {
  constructor(
    private readonly carteiraService: CarteiraService,
    private readonly usuarioService: UsuarioService,
    private readonly transferenciaRepository: TransferenciaRepository,
    private readonly emailClientIntegration: EmailClientIntegration,
    private readonly authorizationTransactionIntegration: AuthorizationTransactionIntegration,
  ) {}

  async create(data: CreateTransferenciaDto): Promise<Transferencia> {
    await this.carteiraService.findOne(data.carteira_origem);
    await this.carteiraService.findOne(data.carteira_destinatario);
    await this.usuarioService.findOne(data.usuario_origem);
    await this.carteiraService.findOne(data.usuario_destinatario);
    await this.carteiraService.verifySaldo(data.carteira_origem, data.value);

    const transferencia = await this.transferenciaRepository.create(data);
    const verifyAuthorization =
      await this.authorizationTransactionIntegration.authorization();
    const sendEmail = await this.emailClientIntegration.notifyEmail();

    const updateCarteiraOrigem = await this.carteiraService.decreaseSaldo(
      data.carteira_origem,
      data.value,
    );
    const updateCarteiraDestinatario = await this.carteiraService.increaseSaldo(
      data.carteira_destinatario,
      data.value,
    );
    const findLastIdTransferencia =
      await this.transferenciaRepository.findLastId();

    const result: any = Promise.all([
      transferencia,
      verifyAuthorization,
      findLastIdTransferencia,
      updateCarteiraOrigem,
      updateCarteiraDestinatario,
      sendEmail,
    ])
      .then(() => {
        const transferencia: Transferencia = {
          value: data.value,
          status: 'Finalizado',
          carteira_origem: data.carteira_origem,
          carteira_destinatario: data.carteira_destinatario,
          usuario_origem: data.usuario_origem,
          usuario_destinatario: data.usuario_destinatario,
        };

        return this.transferenciaRepository.update(
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
