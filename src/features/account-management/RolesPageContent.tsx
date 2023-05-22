import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { api } from '../../common/api';
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config';
import RolesTable from './components/RolesTable/RolesTable';
import RolesPageStateContext from './state/roles-page/RolesPageStateContext';

const PERMISSION_GROUPS = [
  {
    groupName: 'My Profile',
    children: [
      { id: 'viewPersonalProfile', name: 'View personal profile' },
      { id: 'editPersonalProfile', name: 'Edit personal profile' },
    ],
  },
  {
    groupName: 'Employees',
    children: [
      { id: 'viewContacts', name: 'View contacts' },
      { id: 'viewSalaryAndDocumentsData', name: 'View salary and documents data' },
      { id: 'editFullEmployeesData', name: 'Edit full employees data' },
    ],
  },
];

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

      <RolesTable rolePermissions={rolesPageStateContext.roles} permissionGroups={PERMISSION_GROUPS} />
    </div>
  );

  async function saveChangesToRole() {
    if (rolesPageStateContext.updatedRole?.id === 0) {
      const { name, permissions } = rolesPageStateContext.updatedRole;

      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/create`, { name, permissions });
    } else {
      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/edit`, rolesPageStateContext.updatedRole);
    }

    rolesPageStateContext.cancelRoleEditing();
    getRoles();
  }

  async function getRoles() {
    const { data } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}roles`);

    rolesPageStateContext.initialize({ loadedRoles: data });
  }
}

export default observer(RolesPageContent);
