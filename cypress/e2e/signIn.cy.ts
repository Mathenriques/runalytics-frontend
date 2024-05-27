describe('login page', () => {
  it('should fail when all fields are blank', () => {
    cy.visit('http://localhost:4200');
    cy.get('#submit-button').click(); // Clica no botão de envio
    cy.contains('Error ao fazer login, tente mais tarde').should('be.visible');

  });

  it('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:4200');
    cy.get('#email-input').type('teste@teste.com'); // Digita o e-mail
    cy.get('#password').type('12345678'); // Digita a senha
    cy.get('#submit-button').click(); // Clica no botão de envio
    cy.url().should('include', '/pagina-de-destino'); // Verifica a URL de redirecionamento
  });
});
