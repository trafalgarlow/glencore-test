describe('Routes', () => {
  before(() => {
    cy.visit('/');
  });

  it('should load the Home Route', () => {
    cy.url().should('deep.equal', 'http://localhost:3000/');

    cy.get('.is-active').should('contain', 'Home');
  });

  it('should redirect to the Home Route if the url does not exist', () => {
    cy.visit('/ejqkjldsakjdask');

    cy.url().should('deep.equal', 'http://localhost:3000/');
    cy.get('.is-active').should('contain', 'Home');
  });

  it('should open the Dictionaries Route', () => {
    cy.get('.app-menu-item').contains('Dictionaries').click();

    cy.url().should('deep.equal', 'http://localhost:3000/dictionaries');
    cy.get('.is-active').should('contain', 'Dictionaries');
  });

  it('should open the Colors Route', () => {
    cy.get('.app-menu-item').contains('Colors').click();

    cy.url().should('deep.equal', 'http://localhost:3000/colors');
    cy.get('.is-active').should('contain', 'Colors');
  });
});
