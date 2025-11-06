import { makeAutoObservable } from 'mobx'

export class TenantsState {
  private _allTenants: Tenants[] = []

  private _isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  get allTenants() {
    return this._allTenants
      .slice()
  }

  get isLoading() {
    return this._isLoading
  }

  getTenants({
    newTenant,
  }: {
    newTenant: Tenants[],
  }) {
    this._allTenants = newTenant
  }

  setIsLoading() {
    this._isLoading = true
  }

  resetIsLoading() {
    this._isLoading = false
  }
}
