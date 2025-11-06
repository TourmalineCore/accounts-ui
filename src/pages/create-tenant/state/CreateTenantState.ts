import { makeAutoObservable } from 'mobx'

export class CreateTenantState {
  private _isTriedToSubmit = false
  private _tenantData = {
    name: ``,
  }

  constructor() {
    makeAutoObservable(this)
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get tenantData() {
    return this._tenantData
  }

  setIsTriedToSubmit() {
    this._isTriedToSubmit = true
  }

  resetIsTriedToSubmit() {
    this._isTriedToSubmit = false
  }

  setTenantData({
    value,
  }: {
    value: TenantCreate,
  }) {
    this._tenantData = { 
      ...this._tenantData, 
      ...value, 
    }
  }
}