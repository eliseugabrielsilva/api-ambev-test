import { faker } from '@faker-js/faker';

describe('Automação de teste de usuario', () => {
  beforeEach(() => {
    const login = {
      email: "fulano@qa.com",
      password: "teste"
    };

    cy.request({
      method: 'POST',
      url: '/login',
      headers: { 'Content-Type': 'application/json' },
      body: login
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.wrap(response.body.authorization).as('authToken');
    });
  });

  it('Cadastrar produto', function() { 
    const authToken = this.authToken;

    const nome = faker.company.name();
    const produtos = {
      nome: "Produto " + nome,
      preco: 470,
      descricao: "Mouse",
      quantidade: 1
    };
        
    cy.request({
      method: 'POST',
      url: '/produtos',
      headers: {
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: produtos
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.contains('Cadastro realizado com sucesso');
      cy.wrap(response.body._id).as('produtoId');
    });
  });


  it('Cadastrar carrinho', function() { 
    const authToken = this.authToken;
    const produtoId = this.produtoId;
    const carrinho = {
    "produtos": [
      {
        "idProduto": `${produtoId}`,
        "quantidade": 1
      }
    ]
  };
        
    cy.request({
      method: 'POST',
      url: '/carrinhos',
      headers: {
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json',
      },
      body: carrinho
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.contains('Cadastro realizado com sucesso');
    });
  });

  afterEach(function()  {
    const authToken = this.authToken;
    cy.request({
          method: 'DELETE',
          url: '/carrinhos/concluir-compra',
          headers: {
            'Authorization': `${authToken}`,
            'Content-Type': 'application/json',
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
  });
  it('Cadastrar usuario', () => {
    const nomee = faker.company.name;
    const email = faker.company.buzzVerb;
    const usuarios = {
          
      nome: "Eliseu Gb",
      email: "teste12@qa.com.br",
      password: "Mouse123",
      administrador: 'true'    
    
    };
    console.log(email);
    console.log(nomee);
    cy.request({
      method: 'POST',
      url: `/usuarios`,
       headers: {
       'Content-Type': 'application/json',
      },
      body: usuarios
    
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.contains('Cadastro realizado com sucesso');
          
    });
  });

});