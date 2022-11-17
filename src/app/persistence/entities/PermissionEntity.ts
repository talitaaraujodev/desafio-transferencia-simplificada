export class Permission {
  id?: number;
  name: string;
  descricao: string;

  constructor(name: string, descricao: string, id?: number) {
    this.name = name;
    this.descricao = descricao;
    this.id = id;
  }
}
