export class Transfer {
  id?: number;
  value: number;
  status?: 'Pendente' | 'Finalizado';
  wallet_origem: number;
  wallet_destinatario: number;
  user_origem: number;
  user_destinatario: number;

  constructor(
    value: number,
    wallet_origem: number,
    wallet_destinatario: number,
    user_origem: number,
    user_destinatario: number,
    id?: number,
    status?: 'Pendente' | 'Finalizado',
  ) {
    this.value = value;
    this.wallet_origem = wallet_origem;
    this.wallet_destinatario = wallet_destinatario;
    this.user_origem = user_origem;
    this.user_destinatario = user_destinatario;
    this.id = id;
    this.status = status;
  }
}
