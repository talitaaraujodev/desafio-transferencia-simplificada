export class Wallet {
  id?: number;
  saldo: any;
  user_id: number;
  tipo_id: number;

  constructor(saldo: any, user_id: number, tipo_id: number, id?: number) {
    this.saldo = saldo;
    this.user_id = user_id;
    this.tipo_id = tipo_id;
    this.id = id;
  }
}
