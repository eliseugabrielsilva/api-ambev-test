import { faker } from '@faker-js/faker';
describe('Automação de teste de usuario', () => {
  


  it('Cadastrar produto', () => {
    const nome = faker.company.name;
    const produtos = {
          
      nome: nome,
      preco: 470,
      descricao: "Mouse",
      quantidade: 381
    
    };
        
    cy.request({
      method: 'POST',
      url: `/produtos`,
      headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzQ5ODI5ODQ1LCJleHAiOjE3NDk4MzA0NDV9.6NrULzyYYEhAASHxSSC8HPcVTkCM1jO3OT9lgMPeqzA',
      'Content-Type': 'application/json',
    },
      body: produtos
    
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.contains('Cadastro realizado com sucesso');
          
    });
  });
});