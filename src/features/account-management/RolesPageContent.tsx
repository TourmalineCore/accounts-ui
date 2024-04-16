import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { api } from '../../common/api';
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config';
import RolesTable from './components/RolesTable/RolesTable';
import RolesPageStateContext from './state/roles-page/RolesPageStateContext';
import AccessBasedOnPemissionsStateContext from '../../routes/state/AccessBasedOnPemissionsStateContext';

const PERMISSION_GROUPS = [
  {
    groupName: 'My Profile',
    children: [
      { id: 'ViewPersonalProfile', name: 'View personal profile' },
    ],
  },
  {
    groupName: 'Employees',
    children: [
      { id: 'ViewContacts', name: 'View contacts' },
      { id: 'ViewSalaryAndDocumentsData', name: 'View salary and documents data' },
      { id: 'EditFullEmployeesData', name: 'Edit full employees data' },
    ],
  },
  {
    groupName: 'Analytics',
    children: [
      { id: 'AccessAnalyticalForecastsPage', name: 'Access to analytical forecasts page' },
    ],
  },
  {
    groupName: 'Account Management',
    children: [
      { id: 'ViewAccounts', name: 'View accounts' },
      { id: 'ManageAccounts', name: 'Manage accounts' },
      { id: 'ViewRoles', name: 'View roles' },
      { id: 'ManageRoles', name: 'Manage roles' },
      { id: 'CanManageTenants', name: 'Can Manage Tenants' },
      { id: 'IsTenantsHardDeleteAllowed', name: 'Is Tenants Hard Delete Allowed' },
    ],
  },
  {
    groupName: 'Compensations',
    children: [
      { id: 'CanRequestCompensations', name: 'Can Request Compensations' },
      { id: 'CanManageCompensations', name: 'Can Manage Compensations' },
    ],
  },
  {
    groupName: 'Documents',
    children: [
      { id: 'CanManageDocuments', name: 'Can Manage Documents' },
    ],
  },
];

function RolesPageContent() {
  const rolesPageStateContext = useContext(RolesPageStateContext);
  const accessToChanges = useContext(AccessBasedOnPemissionsStateContext);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="roles-page">
      <div className="roles-page__intro">
        <div className="roles-page__info">
          <h1 className="roles-page__title">Roles</h1>
          <div className="roles-page__description">
            A role provides access to predefined menus and features,
            so that depending on the privileges available in the role, an account has access to what their need.
          </div>
        </div>

        {accessToChanges.accessPermissions.get('ManageRoles') && (
          <div className="roles-page__buttons">
            {
              !rolesPageStateContext.isInEditMode
                ? (
                  <Button
                    type="button"
                    data-cy="add-new-role-button"
                    className="roles-page__button"
                    onClick={() => { rolesPageStateContext.addNewRole(); }}
                  >
                    Add new role
                  </Button>
                )
                : (
                  <>
                    <Button
                      type="button"
                      data-cy="cancel-changes-button"
                      className="roles-page__button"
                      onClick={() => { rolesPageStateContext.cancelRoleEditing(); }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      data-cy="save-changes-button"
                      className="roles-page__button"
                      disabled={!rolesPageStateContext.updatedRole?.name}
                      onClick={() => { saveChangesToRole(); }}
                    >
                      Save Changes
                    </Button>
                  </>
                )
            }
          </div>
        )}

      </div>

      <div className="roles-page__table">
        <RolesTable rolePermissions={rolesPageStateContext.roles} permissionGroups={PERMISSION_GROUPS} />
      </div>
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
