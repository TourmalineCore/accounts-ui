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
