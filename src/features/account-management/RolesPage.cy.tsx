import '../../../cypress/support/commands';
import RolesPage from './RolesPage';

describe('RolesPage', () => {
  it('SHOULD render roles table WHEN visit roles page', () => {
    cy.mount(
      <RolesPage />,
    );

    cy.getByData('roles-table').should('exist');
  });
});

describe('AddNewRole', () => {
  it('SHOULD show "add new role" button WHEN showing the table', () => {
    cy.mount(
      <RolesPage />,
    );

    cy.getByData('add-new-role-button').should('exist');
  });

  it('SHOULD add a new role to the table WHEN adding is called', () => {
    cy.intercept('GET', '*/roles', []).as('call-1');

    cy.mount(
      <RolesPage />,
    );

    cy.getByData('add-new-role-button')
      .click();

    cy.getByData('role-column')
      .should('exist');
  });
});
