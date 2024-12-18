# Projeto API Viagem
## Integrantes
Fernando Rodrigues, Eric Cordeiro, Iago Borges, Thiago Santana

## Introdução
   O intuito do projéto é construir uma API utilizando como base o tema "Viagens", pensando nisso, nós desenvolvemos um site, no qual lista as pacotes de viagens cadastradas no banco de dados, com seus respectivos hoteis. Dentro das funcionalidades da API é possivel um úsuario realizar seu cadastro e seu login, calcular o valor final relacionado a quantidade de pessoas que irão viajar e selecionar um hotel para compra.

### Estrutura do Projeto ###
## Inicialização do Projeto
   1° no terminal, dentro da pasta do projeto colocar: node main.js
   2° Abrir a index.html com o Local Server

## Banco de Dados
   No projeto foi utilizado o banco de dados MongoDB, com duas models diferentes, uma para Usuario com os partametros de nome, email e senha, e outra model para a Viagem, contendo o Local, voo, tempoVoo, companhia, dataIda, dataVolta,qtdDias, pagamento, valorViagem, imagem e uma array 'hoteis' que é composta por nomeHotel, valorHotel e imagemHotel.

## Rotas (entities)

1. **User.js**
   - **POST("/registro")**: Rota para a criação de usuarios, com validação de email e a criptografia da senha.
   
   - **POST("/login")**: Rota para o usuario fazer o login.

   - **GET("/usuarios")**: Rota para trazer todos os usuarios cadastrados no banco.

   - **GET("/usuarios/:id")**: Rota para trazer um usuario especifíco.

   - **DELETE("/usuarios/:id")**: Rota para deletar um usuario através do id.
   
2. **Viagem.js**
   - **GET("/viagem")**: Rota para listar todos os pacotes de viagem com os hotéis inclusos.

   - **GET("/viagem/:id")**: Rota para listar um pacote de viagem com os hotéis inclusos.

   - **PUT("/viagem/:id")**: Rota para atualizar os pacotes de viagem e hotéis.

   - **DELETE("/viagem/:id")**: Rota para deletar um pacotes de viagem através do seu id.

   - **POST("/viagem")**: Rota para cadastrar um pacote de viagem e seus hotéis.

   2.1 **Hotel**

   - **POST('/hoteis/:viagemId')**: Rota para cadastrar um hotel a uma viagem especifíca.

   - **GET('/hoteis/:viagemId')**: Rota para trazer os hoteis de uma viagem especifíca.

   - **PUT('/hoteis/:viagemId/:hotelId')**: Rota para editar um hotel especifíco de uma viagem especifíca.

   - **DELETE('/hoteis/:viagemId/:hotelId')**: Rota para excluir um hotel especifíco de uma viagem especifíca.

## Funcionalidades

- Cadastro de Usuario.
- Login do usuários.
- Calcular o valor total.
- Comprar a viagem.

## Extensões Utilizadas
- Express
- Bcrypt
- Body Parser
- Cors
- Jason Web Token
- Local Storage

## Observações
- Na criação do usuário, sua senha é criptografada através do bcrypt;
- Quando logado, é salvo um token (localStorage), para o usuário se manter logado;
- No cadastro do usuário há validação no email, para ver se ele já está sendo utilizado;
- No login do usuário há validação para ver se o email e na senha para ver se estão corretos;

- Na pagina de hoteis, é possível fazer o calculo para ver o valor total da viagem;
- Calculo da viagem: valorTotal = (qtdDias * valorHotel) + (valorViagem * qtdPessoas);
- Só é possível finalizar a compra caso o usuário esteja logado.