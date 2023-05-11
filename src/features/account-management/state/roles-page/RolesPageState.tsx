import { makeAutoObservable } from 'mobx';

class RolesPageState {
  private _roles: RolePermission[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  initialize({
    loadedRoles,
  }: {
    loadedRoles: RolePermission[];
  }) {
    this._roles = loadedRoles;
  }

  get roles() {
    return this._roles;
  }
}

export default RolesPageState;
