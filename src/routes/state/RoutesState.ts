import { makeAutoObservable } from 'mobx';

enum Permission {
  ViewPersonalProfile = 'ViewPersonalProfile',
  EditPersonalProfile = 'EditPersonalProfile',
  ViewContacts = 'ViewContacts',
  ViewSalaryAndDocumentsData = 'ViewSalaryAndDocumentsData',
  EditFullEmployeesData = 'EditFullEmployeesData',
  AccessAnalyticalForecastsPage = 'AccessAnalyticalForecastsPage',
  ViewAccounts = 'ViewAccounts',
  ManageAccounts = 'ManageAccounts',
  ViewRoles = 'ViewRoles',
  ManageRoles = 'ManageRoles',
}

class RoutesState {
  private _permissions: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isEditAccount() {
    return this._permissions.includes('EditAccount');
  }

  get isAccount() {
    return this._permissions.includes('ViewAccounts');
  }

  initPermissions(tokenPermissions: string[]) {
    this._permissions = tokenPermissions;
  }

  checkPermissionForRole(permissionName: keyof typeof Permission) {
    return this._permissions.includes(permissionName);
  }
}
export default RoutesState;
