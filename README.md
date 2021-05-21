## Controle de operações de câmbio

App desenvolvido para controle de operações de câmbio e relatório das operações cadastradas:

Aplicação no ar: ""

- Ao acessar a página principal o usuário visualiza a listagem de todas as operações cadastradas no período:
  - Na área de busca é possível filtrar os dados do relatório por intervalo de datas de operação e clientes
  - Ao final da tabela constam os valores totais relacionados às operações listadas no relatório
  - Ao clicar no botão "cadastrar operação" o usuário poderá inserir um novo registro e todos os campos são de preenchimento obrigatório
  - Ao clicar no ícone da coluna "editar" o usuário poderá editar ou excluir os dados da operação
- As opções de taxas para conversão e moedas disponíveis são as que estão cadastradas no banco de dados:
  - Quando o usuário seleciona a moeda de origem, o sistema retorna as moedas de destino cadastradas para conversão
  - O usuário poderá cadastrar novas taxas e opções de moedas ao clicar em "Cadastrar valor para conversão"
  - No formulário para cadastro de taxas, as moedas que aparecem nas opções são obtidas [através de uma API](https://economia.awesomeapi.com.br/json/available/uniq), para padronização das nomenclaturas


### Tecnologias utilizadas

- aplicação desenvolvida em [Node.js](https://nodejs.org/en/) com servidor [Express](https://expressjs.com/pt-br/);
- [axios](https://www.npmjs.com/package/axios) para buscar de uma [API](https://economia.awesomeapi.com.br/json/available/uniq) o nome das moedas;
- banco de dados [PostgreSQL](https://www.postgresql.org/);
- ORM [Sequelize](https://sequelize.org/master/);
- estruturação das views com o [EJS](https://ejs.co/); 
- [Bootstrap](https://getbootstrap.com/) para estilização das views;
- [Jest](https://jestjs.io/pt-BR/) para implementação de testes unitários;


### Requisitos

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Como executar a aplicação

1. No terminal, clonar o projeto: `git clone https://github.com/malufell/controle-operacoes-cambio.git`
2. Entrar na pasta do projeto: `cd controle-operacoes-cambio`
3. Instalar as dependências: `npm install`
4. Configurar o banco de dados PostgreSQL: no arquivo `src/config/database.js` é necessário atualizar as informações abaixo conforme o PostgreSQL local (o banco de dados já deve estar criado através do próprio postgres)
```
{
  "development": {
    "username": "postgres",
    "password": "admin",
    "database": "operacoes-cambio",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
5. Rodar as migrações do Sequelize para criar as tabelas no banco de dados: `npx sequelize-cli db:migrate`
6. Rodar os seeds para popular as opções iniciais de moedas para conversão: `npx sequelize-cli db:seed:all`
7. Rodar a aplicação: `npm start`
8. Acessar `http://localhost:3000/` no navegador
