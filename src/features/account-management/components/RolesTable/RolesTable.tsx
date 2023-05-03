import React, { useState } from 'react';

function RolesTable() {
  const [roles, setRoles] = useState([{
    id: 1,
    name: 'Admin',
    permissions: ['ViewPersonalProfile', 'EditPersonalProfile', 'ViewContacts'],
  }]);

  return (
    <table data-cy="roles-table">
      <tr data-cy="role-name-row">
        <th>Permissions</th>
        {roles.map((role) => (
          <th>{role.name}</th>
        ))}
      </tr>
    </table>
  );
}

export default RolesTable;
