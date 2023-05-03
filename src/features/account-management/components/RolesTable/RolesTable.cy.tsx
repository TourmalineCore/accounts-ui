import RolesTable from './RolesTable';

describe('RolesTable', () => {
  it('SHOULD always show at least one role WHEN visit roles page', () => {
    cy.intercept('GET', '/api/roles', [{
      id: 1,
      name: 'Admin',
      permissions: ['ViewPersonalProfile', 'EditPersonalProfile', 'ViewContacts'],
    },
    ]);

    cy.mount(
      <RolesTable />,
    );

    cy.getByData('role-name-row').children().contains('Admin');
  });
});
