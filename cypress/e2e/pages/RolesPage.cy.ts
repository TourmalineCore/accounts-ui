describe('RolesPageState', () => {
  it('SHOULD test happy path of role creation WHEN visit roles page', () => {
    cy.visit('/account-management/roles-page');

    cy.getByData('roles-table')
      .should('exist');

    cy.getByData('add-new-role-button')
      .click();

    cy.getByData('roles-name-input')
      .type('Manager1');

    cy.getByData('permission-checkbox')
      .first()
      .check();

    cy.getByData('save-changes-button')
      .click();

    cy.getByData('roles-table')
      .contains('Manager1');
  });

  it('SHOULD discard changes made to a role WHEN click cancel button', () => {
    cy.visit('/account-management/roles-page');

    cy.getByData('roles-table')
      .should('exist');

    cy.getByData('add-new-role-button')
      .click();

    cy.getByData('roles-name-input')
      .type('Manager2');

    cy.getByData('permission-checkbox')
      .first()
      .check();

    cy.getByData('cancel-changes-button')
      .click();

    cy.getByData('roles-table')
      .should('not.exist', 'Manager2');
  });

  it('SHOULD edit role WHEN editing is called for it', () => {
    cy.visit('/account-management/roles-page');

    cy.getByData('roles-table')
      .should('exist');

    cy.getByData('add-new-role-button')
      .click();

    cy.getByData('roles-name-input')
      .type('Manager3');

    cy.getByData('permission-checkbox')
      .first()
      .check();

    cy.getByData('save-changes-button')
      .click();

    // editing
    cy.getByData('edit-role-button-Manager3')
      .click();

    cy.getByData('roles-name-input')
      .type('Manager4');

    cy.getByData('roles-table')
      .contains('Manager4');
  });
});

export {};
