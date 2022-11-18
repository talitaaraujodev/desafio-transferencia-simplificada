# Desafio Back-end Paguru

Desafio Api transferência simplificada entre os usuários

## Instalação

```
npm i
```

## Configuração .env

Crie arquivo .env e configure suas credenciais seguindo o exemplo do arquivo .env.example

#### Exemplo:

```
DATABASE_URL="mysql://username:secret@localhost:3306/transferencia_simplificada"
JWT_SECRET = secret
PORT = 3333
```

## Execução do Projeto :rocket:

```
npx prisma migrate dev
npm run start:dev
```

## Fluxo do Projeto :wave:

### Cadastre as permissions

Criar permissions do usuário
### Exemplo:

```json
{
  "name": "Criar Transferencia",
  "description": "Permissão de criar transferencia"
}
```

### Cadastre os dois tipos de roles:

Criar roles do usuário (ROLE_LOJISTA, ROLE_COMUM)
<br>

#### Exemplo ROLE_COMUM:

```json
{
  "name": "ROLE_COMUM",
  "description": "Role de usuário Comum",
  "permissions": [1, 2, 3]
}
```

#### Exemplo ROLE_LOJISTA:

```json
{
  "name": "ROLE_LOJISTA",
  "description": "Role de usuário Lojista",
  "permissions": [1, 2, 3]
}
```

### Crie 2 users para fazer a transferência entre ambos:

Criar User

#### Exemplo:

```json
{
  "name": "Talita Araujo",
  "cpf_cnpj": "99999999900",
  "email": "test@gmail.com",
  "password": "123456",
  "roles": [1]
}
```

### Faça a autenticação:

Authenticação do User

#### Exemplo:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

### Crie Wallet Type:

Criar Wallet Type

#### Exemplo:

```json
{
  "name": "Carteira Lojista",
  "description": "Tipo de carteira lojista"
}
```

### Crie 2 Wallet p/ os users cadastrados:

Criar Wallet

#### Exemplo:

```json
{
  "balance": 10,
  "user_id": 1,
  "tipo_id": 1
}
```

### Crie uma tranfer:

Criar Transfer

#### Exemplo:

```json
{
  "value": 20,
  "wallet_origem": 1,
  "wallet_destinatario": 2,
  "user_origem": 1,
  "user_destinatario": 2
}
```

## Documentação :heart:

<p align="center">
    <img alt="Documentação" src="./src/app/helpers/swagger/documentation.png"/>
</p>

```
http://localhost:3333/doc
```
