import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import RolesTable from './components/RolesTable/RolesTable';
import RolesPageStateContext from './state/roles-page/RolesPageStateContext';

function RolesPageContent() {
  const rolesPageStateContext = useContext(RolesPageStateContext);

  return (
    <div>
      {
        !rolesPageStateContext.isInEditMode
          ? (
            <button
              type="button"
              data-cy="add-new-role-button"
              onClick={() => { rolesPageStateContext.addNewRole(); }}
            >
              Add new role
            </button>
          )
          : (
            <div>
              <button
                type="button"
                data-cy="cancel-changes-button"
                onClick={() => { }}
              >
                Cancel
              </button>
              <button
                type="button"
                data-cy="save-changes-button"
                onClick={() => { }}
              >
                Save Changes
              </button>
            </div>
          )
      }

      <RolesTable rolePermissions={rolesPageStateContext.roles} permissionGroups={[]} />
    </div>
  );
}

export default observer(RolesPageContent);
