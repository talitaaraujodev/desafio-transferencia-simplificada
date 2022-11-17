# Desafio Back-end Paguru

Desafio transferência simplificada entre os usuários

## Instalação

```
npm i
```

## Configuração .env

Crie arquivo .env e configure suas credenciais seguindo o exemplo do arquivo .env.example
Exemplo:

```
DATABASE_URL="mysql://username:secret@localhost:3306/transferencia_simplificada"
JWT_SECRET = secret
PORT = 3333
```

## Execução do Projeto

```
npx prisma migrate dev
npm run start:dev
```

## Fluxo do Projeto

### Cadastre as permissions

Criar permissões do usuário
Exemplo:

```json
{
  "name": "Criar Transferencia",
  "descricao": "Permissão de criar transferencia"
}
```

### Cadastre os dois tipos de roles:

Criar roles do usuário (ROLE_LOJISTA, ROLE_COMUM)
<br>

#### Exemplo:

```json
{
  "name": "ROLE_COMUM",
  "descricao": "Role de usuário Comum",
  "permissions": [1, 2, 3]
}
```

### Crie 2 usuários p/ fazer a transferência:

Criar um usuário

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

Authenticação do usuário

#### Exemplo:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

### Crie os tipos de carteira:

Criar tipos de carteira

#### Exemplo:

```json
{
  "name": "Carteira Lojista",
  "descricao": "Tipo de carteira lojista"
}
```

### Crie 2 carteiras p/ os usuarios cadastrados:

Criar carteira

#### Exemplo:

```json
{
  "saldo": 10,
  "user_id": 1,
  "tipo_id": 1
}
```

### Crie uma transferencia:

Criar transferencia

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

## Documentação

```
http://localhost:3333/doc
```
