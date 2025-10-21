import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RolesManagementStateContext } from './state/roles-page/RolesManagementStateContext'
import { AccessBasedOnPemissionsStateContext } from '../../../routes/state/AccessBasedOnPemissionsStateContext'
import { RolesTable } from '../RolesTable/RolesTable'

const PERMISSION_GROUPS = [
  {
    groupName: `My Profile`,
    children: [
      {
        id: `ViewPersonalProfile`,
        name: `View personal profile`, 
      },
    ],
  },
  {
    groupName: `Employees`,
    children: [
      {
        id: `ViewContacts`,
        name: `View contacts`, 
      },
      {
        id: `ViewSalaryAndDocumentsData`,
        name: `View salary and documents data`, 
      },
      {
        id: `EditFullEmployeesData`,
        name: `Edit full employees data`, 
      },
    ],
  },
  {
    groupName: `Analytics`,
    children: [
      {
        id: `AccessAnalyticalForecastsPage`,
        name: `Access to analytical forecasts page`, 
      },
    ],
  },
  {
    groupName: `Account Management`,
    children: [
      {
        id: `ViewAccounts`,
        name: `View accounts`, 
      },
      {
        id: `ManageAccounts`,
        name: `Manage accounts`, 
      },
      {
        id: `ViewRoles`,
        name: `View roles`, 
      },
      {
        id: `ManageRoles`,
        name: `Manage roles`, 
      },
      {
        id: `CanManageTenants`,
        name: `Can Manage Tenants`, 
      },
      {
        id: `IsTenantsHardDeleteAllowed`,
        name: `Is Tenants Hard Delete Allowed`, 
      },
      {
        id: `IsAccountsHardDeleteAllowed`,
        name: `Is Accounts Hard Delete Allowed`, 
      },
    ],
  },
  {
    groupName: `Compensations`,
    children: [
      {
        id: `CanRequestCompensations`,
        name: `Can Request Compensations`, 
      },
      {
        id: `CanManageCompensations`,
        name: `Can Manage Compensations`, 
      },
      {
        id: `IsCompensationsHardDeleteAllowed`,
        name: `Is Compensations Hard Delete Allowed`, 
      },
    ],
  },
  {
    groupName: `Documents`,
    children: [
      {
        id: `CanManageDocuments`,
        name: `Can Manage Documents`, 
      },
    ],
  },
  {
    groupName: `Books`,
    children: [
      {
        id: `CanViewBooks`,
        name: `Can View Books`, 
      },
      {
        id: `CanManageBooks`,
        name: `Can Manage Books`, 
      },
      {
        id: `IsBooksHardDeleteAllowed`,
        name: `Is Books Hard Delete Allowed`, 
      },
    ],
  },
]

export const RolesContent = observer(({ 
    onAddRoleClick,
    onCancelClick,
    onSaveClick
  }: {
    onAddRoleClick: () => void
    onCancelClick: () => void
    onSaveClick: () => void
  }) => {
    const rolesManagementStateContext = useContext(RolesManagementStateContext)
    const accessToChanges = useContext(AccessBasedOnPemissionsStateContext)

    return (
      <div className="roles-page">
        <div className="roles-page__intro">
          <div className="roles-page__info">
            <h1 className="roles-page__title">!!!Roles!!!</h1>
            <div className="roles-page__description">
              A role provides access to predefined menus and features,
              so that depending on the privileges available in the role,
              an account has access to what they need.
            </div>
          </div>

          {accessToChanges.accessPermissions.get('ManageRoles') && (
            <div className="roles-page__buttons">
              {
                !rolesManagementStateContext.isInEditMode 
                  ? (
                    <button
                      type="button"
                      data-cy="add-new-role-button"
                      className="account-management-page__button"
                      onClick={onAddRoleClick}
                    >
                      + Add new role
                    </button>
                  ) 
                  : (
                    <>
                      <button
                        type="button"
                        data-cy="cancel-changes-button"
                        className="account-management-page__button"
                        onClick={onCancelClick}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        data-cy="save-changes-button"
                        className="account-management-page__button"
                        disabled={!rolesManagementStateContext.updatedRole?.name}
                        onClick={onSaveClick}
                      >
                        Save Changes
                      </button>
                  </>
                )
              }
            </div>
          )}
        </div>

        <div className="roles-page__table">
          <RolesTable
            rolePermissions={rolesManagementStateContext.roles}
            permissionGroups={PERMISSION_GROUPS}
          />
        </div>
      </div>
    )
  }
)
