describe('Dictionaries', () => {
  before(() => {
    cy.visit('/dictionaries');
  });

  it('should show 3 dictionaries by default', () => {
    cy.get('table tbody tr .row-dictionary-from').getTableRowsText()
      .should('be.deep.equal', ['Anthracite', 'Midnight Black', 'Mystic Silver']);

    cy.get('table tbody tr .row-dictionary-to').getTableRowsText()
      .should('be.deep.equal', ['Dark Grey', 'Black', 'Silver']);
  });

  it('the Save Dictionary button should be disabled', () => {
    cy.get('.save-dictionary-button').should('be.disabled');
  });

  it('should show an error if you type an already existent name', () => {
    cy.get('.save-dictionary-from').clearAndSendText('Anthracite');

    cy.get('.text-danger')
      .should('be.visible')
      .should('contain', 'The current from name is not available');
    cy.get('.save-dictionary-button').should('be.disabled');
  });

  it('should add the dictionary', () => {
    cy.get('.save-dictionary-from').clearAndSendText('New Dictionary');
    cy.get('.text-danger').should('not.be.visible');
    cy.get('.save-dictionary-button').should('be.disabled');

    cy.get('.color-picker-select').selectOption('Black');

    cy.get('.save-dictionary-button')
      .click()
      .should('be.disabled');

    cy.get('.toast-message-success')
      .should('be.visible')
      .should('contain', 'Dictionary "New Dictionary - Black" added correctly');


    cy.get('table tbody tr .row-dictionary-from').getTableRowsText()
      .should('be.deep.equal', ['Anthracite', 'Midnight Black', 'Mystic Silver', 'New Dictionary']);

    cy.get('table tbody tr .row-dictionary-to').getTableRowsText()
      .should('be.deep.equal', ['Dark Grey', 'Black', 'Silver', 'Black']);
  });
});
