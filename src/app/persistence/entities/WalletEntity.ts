export class Wallet {
  id?: number;
  balance: number;
  user_id: number;
  tipo_id: number;

  constructor(balance: number, user_id: number, tipo_id: number, id?: number) {
    this.balance = balance;
    this.user_id = user_id;
    this.tipo_id = tipo_id;
    this.id = id;
  }
}
