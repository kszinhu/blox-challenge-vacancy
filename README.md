# Blox Front-End Developer Test

[![Deploy CI](https://github.com/kszinhu/blox-challenge-vacancy/actions/workflows/deploy.yml/badge.svg)](https://github.com/kszinhu/blox-challenge-vacancy/actions/workflows/deploy.yml)

## Visão Geral

Este repositório é destinado ao desafio técnico para a vaga de **Front-End Developer na Blox**.

## Instruções

- Caso já tenha um usuário registrado, utilize a rota `/sign-in` para fazer o login e receber o token de autenticação.
- Caso não tenha um usuário registrado, utilize a rota `/sign-up` para criar um novo usuário.

### Desenvolvimento

As instruções para o desafio se encontram presentes neste [Repositório](https://github.com/sistema-blox/desafio-front-end/blob/main/README.md).

### Execução do Projeto

É necessário ter o [Node.js](https://nodejs.org/en/) instalado na máquina (16.x ou superior).

1. Clone o repositório

```bash
git clone https://github.com/kszinhu/blox-challenge-vacancy.git
```

2. Instale as dependências

```bash
npm ci
```

3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### Execução dos Testes

Caso já tenha instalado as dependências, pule para o passo 2.

1. Instale as dependências

```bash
npm ci
```

2. Execute os testes

- É possível usar os argumentos do [`JEST`](https://jestjs.io/docs/cli) para executar os testes.

```bash
npm run test
```

## Ambiente de produção

O ambiente de produção está disponível em [https://blox-challenge-vacancy.vercel.app/](https://blox-challenge-vacancy.vercel.app/).

#### Soluções

1. Criar os formulários de cadastro e login utilizando:

- Usando o [Yup](https://github.com/jquense/yup) para validar os formulários de cadastro e login.
- Usando o [React Hook Form](https://react-hook-form.com/) para gerenciar os formulários.

  1.1 Criar um formulário de cadastro de usuário com os seguintes campos:

      + Nome
      + Sobrenome
      + E-mail
      + Senha
      + Confirmar senha

  1.2 Criar um formulário de login com os seguintes campos:

      + E-mail
      + Senha

3. Criar uma página de listagem das unidades curriculares:
   3.1. Criar um componente para o Cartão da Unidade Curricular:
   3.2. Criar um componente para o Cabeçalho da página:

   - Opções de filtro
   - Opções de visualização

	3.3. Criar um componente para o rodapé da página:

   - Paginação (página anterior, próxima página)

- Obs: A listagem das unidades curriculares foi feita usando a API disponibilizada pela Blox, entretanto nenhuma espécie de SWAGGER\* foi encontrada para a mesma, então foi necessário fazer uma análise de como a API funciona para conseguir fazer a listagem das unidades curriculares (encontrando o problema de não conseguir obter unidades curriculares com estados diferentes). Entretanto devido a abstração do serviço da API qualquer modificação seria simples.

\*SWAGGER em que encontrei foi uma versão desatualizada perdida entre as commits realizada no repositório.

4. Abstração do serviços da API:

   - Criado um arquivo para abstrair os endpoints da API

   - GET - `/v1/public/institutions/22/blox_offerings`
   - POST - `/v2/authentication/login`
   - POST - `/auth`

5. Abstração de rotas:

   - Criando um arquivo para definição das rotas que consiste em um vetor de objetos com propriedades para que o componente de navegação consiga definir as rotas da aplicação.

6. Paginação:

   - Criado um contexto para armazenar o estado da paginação, em que é possível disparar ações.
   - Como API não retorna o total de páginas ou de registros, foi necessário fazer uma lógica para desabilitar o botão de próxima página quando não houver mais registros para serem exibidos.

7. Autenticação:

   - Criado um contexto para armazenar o estado da autenticação, em que é possível disparar ações, como registrar um usuário e fazer login.
   - O contexto tem como base o uso do `localStorage` para armazenar o token de autenticação.
