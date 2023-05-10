import RolesTable from './RolesTable';

describe('RolesTable', () => {
  it('SHOULD show role columns and no permission rows WHEN there are roles and no permissions', () => {
    mountComponent({
      permissionGroups: [],
      roles: ['Admin', 'Employee'],
    });

    cy.getByData('role-column').first().contains('Admin');
  });

  it('SHOULD show permission group rows WHEN there are permission groups and no roles or permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          permissions: [],
        },
        {
          groupName: 'Employees',
          permissions: [],
        },
        {
          groupName: 'Analytics',
          permissions: [],
        },
      ],
      roles: [],
    });

    cy.getByData('permission-group').first().contains('My Profile');
  });

  it('SHOULD show role columns and permission group rows WHEN there are roles, permission groups, and no permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          permissions: [],
        },
        {
          groupName: 'Employees',
          permissions: [],
        },
        {
          groupName: 'Analytics',
          permissions: [],
        },
      ],
      roles: ['Admin', 'Employee'],
    });

    cy.getByData('role-column').first().contains('Admin');
    cy.getByData('permission-group').first().contains('My Profile');
  });
});

type Permission = {
  id: number;
  name: string;
};

  type PermissionGroup = {
    groupName: string;
    permissions: Permission[];
  };

function mountComponent({
  permissionGroups,
  roles,
}: {
  permissionGroups: PermissionGroup[];
  roles: string[];
}) {
  cy.mount(
    <RolesTable
      permissionGroups={permissionGroups}
      roles={roles}
    />,
  );
}
