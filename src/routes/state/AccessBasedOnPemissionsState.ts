import { makeAutoObservable } from 'mobx'

export enum Permission {
  ViewPersonalProfile = `ViewPersonalProfile`,
  ViewContacts = `ViewContacts`,
  ViewSalaryAndDocumentsData = `ViewSalaryAndDocumentsData`,
  EditFullEmployeesData = `EditFullEmployeesData`,
  ViewAccounts = `ViewAccounts`,
  ManageAccounts = `ManageAccounts`,
  ViewRoles = `ViewRoles`,
  ManageRoles = `ManageRoles`,
  CanRequestCompensations = `CanRequestCompensations`,
  CanManageCompensations = `CanManageCompensations`,
  CanManageDocuments = `CanManageDocuments`,
  CanManageTenants = `CanManageTenants`,
  IsTenantsHardDeleteAllowed = `IsTenantsHardDeleteAllowed`,
  IsCompensationsHardDeleteAllowed = `IsCompensationsHardDeleteAllowed`,
  CanViewBooks = `CanViewBooks`,
  CanManageBooks = `CanManageBooks`,
  IsBooksHardDeleteAllowed = `IsBooksHardDeleteAllowed`,
  IsAccountsHardDeleteAllowed = `IsAccountsHardDeleteAllowed`,
  AUTO_TESTS_ONLY_IsItemTypesHardDeleteAllowed = `AUTO_TESTS_ONLY_IsItemTypesHardDeleteAllowed`,
  CanManageItemsTypes = `CanManageItemsTypes`,
  CanViewItemsTypes = `CanViewItemsTypes`,
  AUTO_TESTS_ONLY_IsItemsHardDeleteAllowed = `AUTO_TESTS_ONLY_IsItemsHardDeleteAllowed`,
  CanManageItems = `CanManageItems`,
  CanViewItems = `CanViewItems`,
  AUTO_TESTS_ONLY_IsSetUserPasswordBypassingEmailConfirmationAllowed = `AUTO_TESTS_ONLY_IsSetUserPasswordBypassingEmailConfirmationAllowed`,
  CanManagePersonalTimeTracker = `CanManagePersonalTimeTracker`,
  AUTO_TESTS_ONLY_IsWorkEntriesHardDeleteAllowed = `AUTO_TESTS_ONLY_IsWorkEntriesHardDeleteAllowed`
}

export class AccessBasedOnPemissionsState {
  private _accessPermissions = new Map<keyof typeof Permission, boolean>()

  constructor() {
    makeAutoObservable(this)
  }

  get accessPermissions() {
    return this._accessPermissions
  }

  checkPermissionFromToken(permissionsFromToken: Array<keyof typeof Permission>) {
    const permissionsList = Object.keys(Permission) as Array<keyof typeof Permission>

    permissionsList.forEach((item) => {
      if (permissionsFromToken.includes(item)) {
        this._accessPermissions.set(item, true)

        return item
      }

      return item
    })
  }
}
