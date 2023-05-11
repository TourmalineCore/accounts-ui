import React, { useMemo } from 'react';
import RolesTable from './components/RolesTable/RolesTable';
import RolesPageState from './state/roles-page/RolesPageState';
import RolesPageStateContext from './state/roles-page/RolesPageStateContext';

function RolesPage() {
  const rolesPageState = useMemo(
    () => new RolesPageState(),
    [],
  );

  return (
    <RolesPageStateContext.Provider value={rolesPageState}>
      <div>
        <button type="button" data-cy="add-new-role-button">Add new role</button>
        <RolesTable rolePermissions={[]} permissionGroups={[]} />
      </div>
    </RolesPageStateContext.Provider>

  );
}

export default RolesPage;
