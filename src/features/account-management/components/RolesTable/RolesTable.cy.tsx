import RolesTable from './RolesTable';

describe('RolesTable', () => {
  it('SHOULD show role columns and no permission rows WHEN there are roles and no permissions', () => {
    mountComponent({
      permissionGroups: [],
      roles: ['Admin', 'Employee'],
      permissions: [],
    });

    cy.getByData('role-column').first().contains('Admin');
  });

  it('SHOULD show permission group rows WHEN there are permission groups and no roles or permissions', () => {
    mountComponent({
      permissionGroups: ['My Profile', 'Employees', 'Analytics', 'Account Management'],
      roles: [],
      permissions: [],
    });

    cy.getByData('permission-group').first().contains('My Profile');
  });

  it('SHOULD show role columns and permission group rows WHEN there are roles, permission groups, and no permissions', () => {
    mountComponent({
      permissionGroups: ['My Profile', 'Employees', 'Analytics', 'Account Management'],
      roles: ['Admin', 'Employee'],
      permissions: [],
    });

    cy.getByData('role-column').first().contains('Admin');
    cy.getByData('permission-group').first().contains('My Profile');
  });
});

function mountComponent({
  permissionGroups,
  roles,
  permissions,
}: {
  permissionGroups: string[];
  roles: string[];
  permissions: string[];
}) {
  cy.mount(
    <RolesTable
      permissionGroups={permissionGroups}
      roles={roles}
      permissions={permissions}
    />,
  );
}
