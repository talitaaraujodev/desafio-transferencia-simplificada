export class User {
  id?: number;
  name: string;
  cpf_cnpj: string;
  email: string;
  password: string;

  constructor(
    name: string,
    cpf_cnpj: string,
    email: string,
    password: string,
    id?: number,
  ) {
    this.name = name;
    this.cpf_cnpj = cpf_cnpj;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
