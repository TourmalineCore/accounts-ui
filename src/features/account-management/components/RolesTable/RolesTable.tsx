import React from 'react';

// ToDo
// When create a new role, its object should be added to the beginning of the array using unshift method
// object should contain id, which will be sent to mobX class (to __editId field)
// when save changed to a newly created role, its id will be deleted and the object will be sent only with name and permissions list
// we will get the id from backend

// When press Edit button, the id of the role should be sent to mobX class (to __editId field)
// based on this field, we will show either inputs or spans

function RolesTable(
  {
    permissionGroups,
    rolePermissions,
  }: {
    permissionGroups: PermissionGroup[];
    rolePermissions: RolePermission[];
  },
) {
  return (
    <table data-cy="roles-table" className="roles-table">
      <tr>
        <th>Permissions</th>
        {rolePermissions.map(({ name }) => (
          <th data-cy="role-column">{name}</th>
        ))}
      </tr>
      {
        permissionGroups.map(({ groupName, children }) => (
          <>
            <tr data-cy="permission-group" style={{ backgroundColor: '#e2e2e2' }}>
              {groupName}
            </tr>
            {children.map(({ id, name }) => (
              <tr data-cy="permission">
                <td>{name}</td>
                {rolePermissions.map(({ permissions }) => (
                  <td data-cy="permission-indicator">
                    {permissions.some((item) => item === id) ? 'check' : 'not'}
                  </td>
                ))}
              </tr>
            ))}
          </>
        ))
      }
    </table>
  );
}

export default RolesTable;
