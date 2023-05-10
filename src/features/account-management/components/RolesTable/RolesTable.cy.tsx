import RolesTable from './RolesTable';

describe('RolesTable', () => {
  it('SHOULD show role columns and no permission rows WHEN there are roles and no permissions', () => {
    mountComponent({
      roles: ['Admin', 'Employee'],
      permissions: [],
    });

    cy.getByData('role-column').first().contains('Admin');
  });
});

function mountComponent({
  roles,
  permissions,
}: {
  roles: string[];
  permissions: string[];
}) {
  cy.mount(
    <RolesTable
      roles={roles}
      permissions={permissions}
    />,
  );
}
