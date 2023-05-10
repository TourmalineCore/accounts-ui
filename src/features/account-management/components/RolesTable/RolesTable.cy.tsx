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

  it('SHOULD show role columns and permission group rows with nested permissions WHEN there are roles, permission groups, and permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          permissions: [
            { id: 1, name: 'View personal profile' },
            { id: 2, name: 'Edit personal profile' },
          ],
        },
        {
          groupName: 'Employees',
          permissions: [
            { id: 3, name: 'View contacts' },
            { id: 4, name: 'View salary and documents data' },
            { id: 5, name: 'Edit full employees data' },
          ],
        },
      ],
      roles: ['Admin', 'Employee'],
    });
    cy.getByData('role-column').first().contains('Admin');
    cy.getByData('permission-group').first().contains('My Profile');
    cy.getByData('permission').first().contains('View personal profile');
  });
});

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
