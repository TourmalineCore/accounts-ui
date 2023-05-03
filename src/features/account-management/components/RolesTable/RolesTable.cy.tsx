import RolesTable from './RolesTable';

const mockData = [{
  id: 1,
  name: 'Admin',
  permissions: ['ViewPersonalProfile', 'EditPersonalProfile', 'ViewContacts'],
}];

describe('RolesTable', () => {
  it('SHOULD always show at least one role WHEN visit roles page', () => {
    cy.intercept('GET', '*/api/roles', mockData);

    cy.mount(
      <RolesTable />,
    );

    cy.getByData('role-name-row').children().contains('Admin');
  });
});
