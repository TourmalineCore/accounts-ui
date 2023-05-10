import React from 'react';

// ToDo
// When create a new role, its object should be added to the beginning of the array using unshift method
// object should contain id, which will be sent to mobX class (to __editId field)
// when save changed to a newly created role, its id will be deleted and the object will be sent only with name and permissions list
// we will get the id from backend

// When press Edit button, the id of the role should be sent to mobX class (to __editId field)
// based on this field, we will show either inputs or spans

type Permission = {
  id: number;
  name: string;
};

type PermissionGroup = {
  groupName: string;
  permissions: Permission[];
};

function RolesTable(
  {
    permissionGroups,
    roles,
  }: {
    permissionGroups: PermissionGroup[];
    roles: string[];
  },
) {
  return (
    <table data-cy="roles-table" className="roles-table">
      <tr>
        <th>Permissions</th>
        {roles.map((role) => (
          <th data-cy="role-column">{role}</th>
        ))}
      </tr>
      {
        permissionGroups.map(({ groupName, permissions }) => (
          <tr data-cy="permission-group">
            {groupName}
          </tr>
        ))
      }
    </table>
  );
}

export default RolesTable;
