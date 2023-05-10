import React from 'react';
import RolesTable from './components/RolesTable/RolesTable';

function RolesPage() {
  return (
    <div>
      <RolesTable rolePermissions={[]} permissionGroups={[]} />
    </div>
  );
}

export default RolesPage;
