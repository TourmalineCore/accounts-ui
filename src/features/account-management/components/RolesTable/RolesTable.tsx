import React, { useEffect, useState } from 'react';
import { api } from '../../../../common/api';

type RoleType = {
  id: number,
  name: string,
  permissions: string[]
};

function RolesTable() {
  const [roles, setRoles] = useState<RoleType[]>([]);

  useEffect(() => {
    loadDataAsync();
  }, []);

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

  async function loadDataAsync() {
    const { data } = await api.get('api/roles');
    setRoles(data);
  }
}

export default RolesTable;
