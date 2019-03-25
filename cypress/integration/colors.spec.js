describe('Colors', () => {
  before(() => {
    cy.visit('/colors');
  });

  it('the Add Color button should be disabled', () => {
    cy.get('.add-color-button').should('be.disabled');
  });

  it('should show 3 colors by default', () => {
    cy.get('table tbody tr').getTableRowsText()
      .should('be.deep.equal', ['Dark Grey', 'Black', 'Silver']);
  });

  it('should show an error if you type an already existent name', () => {
    cy.get('.add-color-name').clearAndSendText('Black');

    cy.get('.text-danger')
      .should('be.visible')
      .should('contain', 'The current color name is not available');

    cy.get('.add-color-button').should('be.disabled');
  });

  it('should add the color', () => {
    cy.get('.add-color-name').clearAndSendText('New Color');

    cy.get('.text-danger').should('not.be.visible');
    cy.get('.add-color-button')
      .should('not.be.disabled')
      .click()
      .should('be.disabled');
    cy.get('.add-color-name input[type="text"]').should('have.value', '');

    cy.get('.toast-message-success')
      .should('be.visible')
      .should('contain', 'Color "New Color" added correctly');
    cy.get('table tbody tr').getTableRowsText()
      .should('be.deep.equal', ['Dark Grey', 'Black', 'Silver', 'New Color']);
  });
});
