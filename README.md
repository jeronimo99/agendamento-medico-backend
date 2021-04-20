# Agendamento Médico - Backend

Este projeto é a aplicação backend do projeto de conclusão de curso de Jerônimo Costa Ramalho no curso de Engenharia de Software pela UNICESUMAR.

Esta é uma RESTful API feita em `Node.js`, sendo consumida por uma aplicação SPA.

O banco de dados é o MongoDB (não-relacional), hospedado remotamente no `MongoDB Atlas`.

Esta aplicação deve ser inicializada juntamente com a sua contraparte [frontend](https://github.com/jeronimo99/agendamento-medico-frontend).

## Demonstração

Uma demonstração da aplicação completa (frontend + backend) pode ser encontrada em [Agendamento Médico](https://agendamento-medico-jeronimo.vercel.app)

login: admin@admin.com
senha: 12345678

## Instalação

Tenha instalado o `node` e o gerenciador de pacotes `npm` em sua máquina. Clone este repositório e instale as dependências.

`npm install`

É preciso adicionar um arquivo `.env` no diretório root com suas variáveis de ambiente para configuração do banco de dados remoto e da chave de autenticação JWT. Você pode utilizar as seguintes variáveis de ambientes para fins de teste em seu arquivo `.env`:

DB_USER=jeronimo\
DB_PASSWORD=y4tzvbn0dDZ5aM17\
DB_NAME=agendamento-medico-test\
TOKEN_SECRET=O6l$-e@k2-a!8bn

## Modo de Desenvolvedor

`npm run dev`

Roda a aplicação em modo de desenvolvedor.\
Abra [http://localhost:5000](http://localhost:5000) para visualizar no navegador.

## Testando

`npm test`

Inicializa os testes unitários e de integração.

## Produção

`npm start`

Roda a aplicação prontamente para produção!
