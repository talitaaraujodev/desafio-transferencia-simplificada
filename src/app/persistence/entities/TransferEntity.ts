export class Transfer {
  id?: number;
  value: number;
  status?: 'Pendente' | 'Finalizado';
  carteira_origem: number;
  carteira_destinatario: number;
  usuario_origem: number;
  usuario_destinatario: number;

  constructor(
    value: number,
    carteira_origem: number,
    carteira_destinataria: number,
    usuario_origem: number,
    usuario_destinatario: number,
    id?: number,
    status?: 'Pendente' | 'Finalizado',
  ) {
    this.value = value;
    this.carteira_origem = carteira_origem;
    this.carteira_destinatario = carteira_destinataria;
    this.usuario_origem = usuario_origem;
    this.carteira_destinatario = usuario_destinatario;
    this.id = id;
    this.status = status;
  }
}
