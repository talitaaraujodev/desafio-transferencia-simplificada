export class Carteira {
  id?: number;
  saldo: any;
  usuario_id: number;
  tipo_id: number;

  constructor(saldo: any, usuario_id: number, tipo_id: number, id?: number) {
    this.saldo = saldo;
    this.usuario_id = usuario_id;
    this.tipo_id = tipo_id;
    this.id = id;
  }
}
