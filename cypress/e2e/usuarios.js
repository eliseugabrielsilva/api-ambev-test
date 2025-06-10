describe('Automação de teste de usuario', () => {
  

  it('Realizar login', () => {
    
    const login = {
        email: "elise@qa.com",
        password: "teste123"
    };
        
    cy.request({
      method: 'POST',
      url: `/login`,
      body: login
    
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.contains('Login realizado com sucesso');
          
    });
  });
});