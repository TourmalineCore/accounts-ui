import { makeAutoObservable } from 'mobx'

export const EMPTY_FORM_DATA: any = {
  firstName: '',
  lastName: '',
  middleName: '',
  corporateEmail: '',
  tenantId: '',
}

export class CreateAccountState {
  private _isTriedToSubmit = false
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

  get isTriedToSubmit() {
    return this._isTriedToSubmit
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

  setIsTriedToSubmit(newValue: boolean) {
    this._isTriedToSubmit = newValue
  }
  setSelectedCheckboxes(newValue: Set<string>) {
    this._selectedCheckboxes = newValue
  }

  setFormData(newValue: Partial<typeof this._formData>) {
    this._formData = { ...this._formData, ...newValue }
  }
  setRolesData(newValue: { [key: number]: string }) {
    this._rolesData = newValue
  }

  setTenantsData(newValue: Tenants[]) {
    this._tenantsData = newValue
  }
  // }
  toggleCheckbox(value: string) {
    if (this._selectedCheckboxes.has(value)) {
  toggleCheckbox(newValue: string) {
    if (this._selectedCheckboxes.has(newValue)) {
        this._selectedCheckboxes = new Set(
            [...this._selectedCheckboxes].filter((x) => x !== newValue)
        )
    } else {
        this._selectedCheckboxes = new Set([
            ...this._selectedCheckboxes,
            newValue,
        ])
    }
  }
}
