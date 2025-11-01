import { makeAutoObservable } from 'mobx'

export const EMPTY_ACCOUNT_DATA: Pick<AccountCreate, 'firstName' | 'lastName' | 'middleName' | 'corporateEmail' | 'tenantId'> = {
  firstName: ``,
  lastName: ``,
  middleName: ``,
  corporateEmail: ``,
  tenantId: ``,
}

export class CreateOrEditAccountState {
  private _isTriedToSubmit = false
  private _selectedCheckboxes = new Set<string>([])
  private _accountData = {
    ...EMPTY_ACCOUNT_DATA,
  }
  private _rolesData: { [key: number]: string, } = {}
  private _tenantsData: Tenants[] = []
  private _isError = false
  private _isEditMode = false

  constructor() {
    makeAutoObservable(this)
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get selectedCheckboxes() {
    return this._selectedCheckboxes
  }

  get accountData() {
    return this._accountData
  }

  get rolesData() {
    return this._rolesData
  }

  get tenantsData() {
    return this._tenantsData
  }

  get isError() {
    return this._isError
  }

  get isEditMode() {
    return this._isEditMode
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }

  setSelectedCheckboxes(newValue: Set<string>) {
    this._selectedCheckboxes = newValue
  }

  setAccountData(newValue: Pick<AccountCreate, 'firstName' | 'lastName' | 'middleName' | 'corporateEmail' | 'tenantId'>) {
    this._accountData = {
      ...this._accountData,
      ...newValue, 
    }
  }

  setRolesData(newValue: { [key: number]: string, }) {
    this._rolesData = newValue
  }

  setTenantsData(newValue: Tenants[]) {
    this._tenantsData = newValue
  }

  setIsError() {
    this._isError = true
  }

  resetIsError() {
    this._isError = false
  }

  setIsEditMode() {
    this._isEditMode = true
  }

  resetIsEditMode() {
    this._isEditMode = false
  }

  toggleCheckbox(newValue: string) {
    if (this._selectedCheckboxes.has(newValue)) {
      this._selectedCheckboxes = new Set(
        [
          ...this._selectedCheckboxes,
        ].filter((x) => x !== newValue),
      )
    }
    else {
      this._selectedCheckboxes = new Set([
        ...this._selectedCheckboxes,
        newValue,
      ])
    }
  }
}
