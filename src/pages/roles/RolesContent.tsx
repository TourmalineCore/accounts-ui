import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RolesStateContext } from './state/RolesStateContext'
import { AccessBasedOnPemissionsStateContext } from '../../routes/state/AccessBasedOnPemissionsStateContext'
import { RolesTable } from './components/roles-table/RolesTable'

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
  {
    groupName: `Items`,
    children: [
      {
        id: `AUTO_TESTS_ONLY_IsItemTypesHardDeleteAllowed`,
        name: `AUTO TESTS ONLY Is Item Types Hard Delete Allowed`, 
      },
      {
        id: `CanManageItemsTypes`,
        name: `Can Manage Items Types`, 
      },
      {
        id: `CanViewItemsTypes`,
        name: `Can View Items Types`, 
      },
      {
        id: `AUTO_TESTS_ONLY_IsItemsHardDeleteAllowed`,
        name: `AUTO TESTS ONLY Is Items Hard Delete Allowed`, 
      },
      {
        id: `CanManageItems`,
        name: `Can Manage Items`, 
      },
      {
        id: `CanViewItems`,
        name: `Can View Items`, 
      },
    ],
  },
  {
    groupName: `Auth`,
    children: [
      {
        id: `AUTO_TESTS_ONLY_IsSetUserPasswordBypassingEmailConfirmationAllowed`,
        name: `AUTO TESTS ONLY Is Set User Password Bypassing Email Confirmation Allowed`, 
      },
    ],
  },
]

export const RolesContent = observer(({ 
  onSaveClick,
}: {
    onSaveClick: () => unknown,
  }) => {
  const rolesStateContext = useContext(RolesStateContext)
  const accessToChanges = useContext(AccessBasedOnPemissionsStateContext)

  return (
    <div className="roles-page">
      <div className="roles-page__intro">
        <div className="roles-page__info">
          <h1 className="roles-page__title">Roles</h1>
          <div className="roles-page__description">
            A role provides access to predefined menus and features,
            so that depending on the privileges available in the role,
            an account has access to what they need.
          </div>
        </div>

        {accessToChanges.accessPermissions.get(`ManageRoles`) && (
          <div className="roles-page__buttons">
            {
              !rolesStateContext.isInEditMode
                ? (
                  <button
                    type="button"
                    data-cy="add-new-role-button"
                    className="accounts-page__button"
                    onClick={() => rolesStateContext.addNewRole()}
                  >
                    + Add new role
                  </button>
                )
                : (
                  <>
                    <button
                      type="button"
                      data-cy="cancel-changes-button"
                      className="accounts-page__button"
                      onClick={() => rolesStateContext.cancelRoleEditing()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      data-cy="save-changes-button"
                      className="accounts-page__button"
                      disabled={!rolesStateContext.updatedRole?.name}
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
          rolePermissions={rolesStateContext.roles}
          permissionGroups={PERMISSION_GROUPS}
        />
      </div>
    </div>
  )
},
)
