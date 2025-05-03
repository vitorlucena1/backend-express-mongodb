# Backend Express MongoDB

Este é um projeto backend desenvolvido com **Node.js**, **Express** e **MongoDB**, que implementa autenticação de usuários utilizando **JWT (JSON Web Token)**. O projeto segue a arquitetura de camadas para organização do código.

---

## 📂 Estrutura do Projeto

```
backend-express-mongodb/
├── api/
│   ├── controller/         # Controladores das rotas
│   ├── database/           # Configuração do banco de dados
│   ├── middleware/         # Middlewares (ex.: autenticação JWT)
│   ├── models/             # Modelos do banco de dados (ex.: User)
│   ├── routes/             # Definição das rotas
│   └── index.js            # Arquivo principal do servidor
├── example_requests/       # Exemplos de requisições locais (curl)
├── example_requests_vercel/ # Exemplos de requisições em produção (curl)
├── .env                    # Variáveis de ambiente (não incluído no repositório)
├── .env.example            # Exemplo de variáveis de ambiente
├── docker-compose.yml      # Configuração do Docker Compose
├── README.md               # Documentação do projeto
└── package.json            # Dependências e scripts do projeto
```

---

## 📹 Demonstração

Aqui está um vídeo explicativo sobre o projeto:

[Explicação do Projeto](./Explicação.mp4)

---

## 🚀 Funcionalidades

### Rotas Públicas
- **POST /users/register**: Cria um novo usuário no sistema.
- **POST /users/login**: Autentica um usuário e gera um token JWT.

### Rotas Protegidas (Requer Token JWT)
- **GET /protected**: Retorna uma mensagem de sucesso ("Acesso autorizado") se o token JWT for válido.

---

## 🛠️ Requisitos

### Model de Usuário
O modelo `User` contém os seguintes campos:
- **name**: Nome do usuário (obrigatório).
- **email**: Email do usuário (obrigatório e único).
- **password**: Senha do usuário (obrigatória, armazenada como hash).

### Validações
- **Email**: Deve ser único e ter um formato válido.
- **Senha**: Deve ter pelo menos 8 caracteres, incluindo letras e números.
- **Token JWT**: Deve ser enviado no cabealho `Authorization` para acessar rotas protegidas.

---

## 🧑‍💻 Como Executar o Projeto

### 1. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```properties
PORT=3000
MONGO_URI=mongodb://<usuario>:<senha>@<host>:<porta>/<database>
MONGO_DB_NAME=example
JWT_SECRET=sua_chave_secreta_aqui
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Executar o Servidor
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## 🐳 Usando Docker

### Subir o MongoDB com Docker Compose
Se você quiser usar o MongoDB localmente com Docker, execute:
```bash
docker-compose up -d
```

---

## 📋 Exemplos de Requisições

### Registro de Usuário (POST /users/register)
```bash
curl --request POST \
  --url http://localhost:3000/users/register \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "user1",
    "email": "user1@example.com",
    "password": "Password123"
  }'
```

### Login de Usuário (POST /users/login)
```bash
curl --request POST \
  --url http://localhost:3000/users/login \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "user1@example.com",
    "password": "Password123"
  }'
```

### Acesso Protegido (GET /protected)
```bash
curl --request GET \
  --url http://localhost:3000/protected \
  --header 'Authorization: Bearer <seu_token_jwt>'
```

---

## 🌐 Deploy em Produção

O projeto está configurado para ser implantado no **Vercel**. Certifique-se de configurar as variáveis de ambiente no painel do Vercel.

### URL de Produção
```
https://backend-express-mongodb-two.vercel.app
```

---

## 🛡️ Segurança

- **Senhas**: Armazenadas como hash utilizando `bcrypt`.
- **Tokens JWT**: Expiram após 1 hora e são validados em todas as rotas protegidas.
- **Variáveis Sensíveis**: Armazenadas em variáveis de ambiente.

---

## ✨ Autor

Desenvolvido por [Vitor Lucena](https://github.com/vitorlucena1).