# Desafio Back-end Paguru
Desafio Api de transferencia simplificada entre os usuários
##  Instalação
```
npm i 
````
## Execução do Projeto
```
npx prisma migrate dev
npm run start:dev
```
## Fluxo do Projeto 
###  Cadastre as permissions
Criar permissões do usuário
Exemplo:
```json
{
  "name": "Criar Transferencia",
  "descricao": "Permissão de criar transferencia"
}
```

### Cadastre as roles: 
Criar  roles do usuário
Exemplo:
```json
{
  "name": "ROLE_ADMIN",
  "descricao": "Role de Admin",
  "permissions": [
    1,2,3
  ]
}
```
### Crie 2 usuários p/ fazer a transferencia:
Criar um usuário
Exemplo:
```json
{
  "name": "Talita Araujo",
  "cpf_cnpj": "99999999900",
  "email": "test@gmail.com",
  "password": "123456",
  "roles": [
   1
  ]
}
```
### Faça a autenticação:
Authenticação do usuário
Exemplo:
```json
{
  "email": "test@gmail.com",
  "password": "123456",
}
```

### Crie os tipos de carteira: 
Criar tipos de carteira
Exemplo:
```json
{
  "name": "Carteira Lojista",
  "descricao": "Tipo de carteira lojista"
}
```

### Crie 2 carteiras p/ os usuarios cadastrados: 
Criar carteira
Exemplo:
```json
{
  "usuario_id": 1,
  "tipo_id": 1
}
```

### Crie uma transferencia:
Criar transferencia
Exemplo:
```json
{
  "value": 20,
  "carteira_origem": 1,
  "carteira_destinatario": 2,
  "usuario_origem": 1,
  "usuario_destinatario": 2
}
```
## Documentação
```
http://localhost:3333/doc
```