import RolesTable from './RolesTable';

const mockData = [{
  id: 1,
  name: 'Admin',
  permissions: ['ViewPersonalProfile', 'EditPersonalProfile'],
},
{
  id: 2,
  name: 'Employee',
  permissions: ['ViewPersonalProfile'],
}];

describe('RolesTable', () => {
  it('SHOULD always show at least one role WHEN visit roles page', () => {
    cy.intercept('GET', '*/api/roles', mockData);

    cy.mount(
      <RolesTable />,
    );

    cy.getByData('role-name-row')
      .children()
      .contains('Admin');
  });

  it('SHOULD show non-empty profile section WHEN visit roles page', () => {
    cy.intercept('GET', '*/api/roles', mockData);

    cy.mount(
      <RolesTable />,
    );

    cy.getByData('profile-section-content')
      .children()
      .its('length')
      .should('be.at.least', 1);
  });

  it('SHOULD show checked state for a permission WHEN this permission is in the list for this role', () => {
    cy.intercept('GET', '*/api/roles', mockData);

    cy.mount(
      <RolesTable />,
    );

    cy.getByData('ViewPersonalProfile')
      .contains('yes');
  });
});
