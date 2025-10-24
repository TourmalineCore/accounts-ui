import { makeAutoObservable } from 'mobx'

export class CreateTenantState {
  private _isTriedToSubmit = false
  private _formData = {
    name: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  get isTriedToSubmit() {
    return this._isTriedToSubmit
  }

  get formData() {
    return this._formData
  }
}