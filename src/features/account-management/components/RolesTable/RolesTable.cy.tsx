import RolesTable from './RolesTable';

describe('RolesTable', () => {
  it('SHOULD show role columns and no permission rows WHEN there are roles and no permissions', () => {
    mountComponent({
      permissionGroups: [],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: [],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    cy.getByData('role-column').first().contains('Admin');
  });

  it('SHOULD show permission group rows WHEN there are permission groups and no roles or permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [],
        },
        {
          groupName: 'Employees',
          children: [],
        },
        {
          groupName: 'Analytics',
          children: [],
        },
      ],
      rolePermissions: [],
    });

    cy.getByData('permission-group').first().contains('My Profile');
  });

  it('SHOULD show role columns and permission group rows WHEN there are roles, permission groups, and no permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [],
        },
        {
          groupName: 'Employees',
          children: [],
        },
        {
          groupName: 'Analytics',
          children: [],
        },
      ],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: [],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: [],
        },
      ],
    });

    cy.getByData('role-column').first().contains('Admin');
    cy.getByData('permission-group').first().contains('My Profile');
  });

  it('SHOULD show role columns and permission group rows with nested permissions WHEN there are roles, permission groups, and permissions', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [
            { id: 'viewPersonalProfile', name: 'View personal profile' },
            { id: 'editPersonalProfile', name: 'Edit personal profile' },
          ],
        },
        {
          groupName: 'Employees',
          children: [
            { id: 'viewContacts', name: 'View contacts' },
            { id: 'viewSalaryAndDocumentsData', name: 'View salary and documents data' },
            { id: 'editFullEmployeesData', name: 'Edit full employees data' },
          ],
        },
      ],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: ['viewPersonalProfile', 'editPersonalProfile'],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: ['viewContacts', 'viewSalaryAndDocumentsData', 'editFullEmployeesData'],
        },
      ],
    });
    cy.getByData('role-column').first().contains('Admin');
    cy.getByData('permission-group').first().contains('My Profile');
    cy.getByData('permission').first().contains('View personal profile');
  });

  it('SHOULD show that the permission is checked for a role WHEN it is in the list of permissions for this role', () => {
    mountComponent({
      permissionGroups: [
        {
          groupName: 'My Profile',
          children: [
            { id: 'viewPersonalProfile', name: 'View personal profile' },
            { id: 'editPersonalProfile', name: 'Edit personal profile' },
          ],
        },
        {
          groupName: 'Employees',
          children: [
            { id: 'viewContacts', name: 'View contacts' },
            { id: 'viewSalaryAndDocumentsData', name: 'View salary and documents data' },
            { id: 'editFullEmployeesData', name: 'Edit full employees data' },
          ],
        },
      ],
      rolePermissions: [
        {
          id: 1,
          name: 'Admin',
          permissions: ['viewPersonalProfile', 'editPersonalProfile'],
        },
        {
          id: 2,
          name: 'Employee',
          permissions: ['viewContacts', 'viewSalaryAndDocumentsData', 'editFullEmployeesData'],
        },
      ],
    });

    cy.getByData('permission-indicator').first().contains('check');
  });
});

function mountComponent({
  permissionGroups,
  rolePermissions,
}: {
  permissionGroups: PermissionGroup[];
  rolePermissions: RolePermission[];
}) {
  cy.mount(
    <RolesTable
      permissionGroups={permissionGroups}
      rolePermissions={rolePermissions}
    />,
  );
}
