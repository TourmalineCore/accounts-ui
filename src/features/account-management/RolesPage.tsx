import React from 'react';
import RolesTable from './components/RolesTable/RolesTable';

function RolesPage() {
  return (
    <div>
      <button type="button" data-cy="add-new-role-button">Add new role</button>
      <RolesTable rolePermissions={[]} permissionGroups={[]} />
    </div>
  );
}

export default RolesPage;
