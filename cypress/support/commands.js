Cypress.Commands.add('clearAndSendText', { prevSubject: true }, (subject, text) => {
  cy.wrap(subject.find('input[type="text"]')).clear().type(text);
  return cy.wrap(subject);
});

Cypress.Commands.add('getTableRowsText', { prevSubject: true },
  subject => {
    const values = subject.map((ind, el) => Cypress.$(el).text()).get();
    return values;
  });

Cypress.Commands.add('selectOption', { prevSubject: true }, (subject, text) => {
  cy.wrap(subject.find('[class^="MuiSelect-select"]')).click();
  cy.get('[class^="MuiButtonBase"]').contains(text).click();
  return cy.wrap(subject);
});
