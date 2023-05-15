import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import RolesTable from './components/RolesTable/RolesTable';
import RolesPageStateContext from './state/roles-page/RolesPageStateContext';

function RolesPageContent() {
  const rolesPageStateContext = useContext(RolesPageStateContext);

  return (
    <div>
      <button
        type="button"
        data-cy="add-new-role-button"
        onClick={() => { rolesPageStateContext.addNewRole(); }}
      >
        Add new role

      </button>
      <RolesTable rolePermissions={rolesPageStateContext.roles} permissionGroups={[]} />
    </div>
  );
}

export default observer(RolesPageContent);
