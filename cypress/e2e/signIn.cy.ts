describe('login page', () => {
  it('shoult fail when all fields are blank', () => {
    cy.visit('http://localhost:4200')
    cy.get('[data-cy="submit-button"]').click
  })

  it('', () => {
    cy.get('[data-cy="email-input"]').type('teste@teste.com')
    cy.get('[data-cy="passwork-input"]').type('12345678')
    cy.get('[data-cy="submit-button"]').click
    cy.url().should('match', /\/training$/)

  })
})