import { makeAutoObservable } from 'mobx'

export const EMPTY_FORM_DATA: any = {
  firstName: '',
  lastName: '',
  middleName: '',
  corporateEmail: '',
  tenantId: '',
}

export class CreateAccountState {
  private _triedToSubmit = false
  private _selectedCheckboxes = new Set<string>([])
  private _formData = {
    firstName: '',
    lastName: '',
    middleName: '',
    corporateEmail: '',
    tenantId: '',
  }
  private _rolesData: { [key: number]: string } = {}
  private _tenantsData: Tenants[] = []
  private _hasError = false

  constructor() {
    makeAutoObservable(this)
  }

  get triedToSubmit() {
    return this._triedToSubmit
  }

  get selectedCheckboxes() {
    return this._selectedCheckboxes
  }

  get formData() {
    return this._formData
  }

  get rolesData() {
    return this._rolesData
  }

  get tenantsData() {
    return this._tenantsData
  }

  get hasError() {
    return this._hasError
  }

  // }

  // getTenants(newTenant: Tenants[]) {
  //   this._allTenants = newTenant
  // }
}
