import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { api } from '../../common/api';
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config';
import RolesTable from './components/RolesTable/RolesTable';
import RolesPageStateContext from './state/roles-page/RolesPageStateContext';

function RolesPageContent() {
  const rolesPageStateContext = useContext(RolesPageStateContext);

  useEffect(() => {
    getRoles();
  }, []);

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
                onClick={() => { rolesPageStateContext.cancelRoleEditing(); }}
              >
                Cancel
              </button>
              <button
                type="button"
                data-cy="save-changes-button"
                onClick={() => { saveChangesToRole(); }}
              >
                Save Changes
              </button>
            </div>
          )
      }

      <RolesTable rolePermissions={rolesPageStateContext.roles} permissionGroups={[]} />
    </div>
  );

  async function saveChangesToRole() {
    await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/create`, rolesPageStateContext.updatedRole);

    getRoles();
  }

  async function getRoles() {
    const { data } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}roles`);

    rolesPageStateContext.initialize({ loadedRoles: data });
  }
}

export default observer(RolesPageContent);
