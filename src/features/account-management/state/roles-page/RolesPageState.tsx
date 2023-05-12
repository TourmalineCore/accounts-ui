import { makeAutoObservable } from 'mobx';

class RolesPageState {
  private _roles: Role[] = [];

  private _roleIdThatIsBeingEditedNow: number | null = null;

  private _isInEditMode: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initialize({
    loadedRoles,
  }: {
    loadedRoles: Role[];
  }) {
    this._roles = loadedRoles;
  }

  get roles() {
    return this._roles;
  }

  get isInEditMode() {
    return this._isInEditMode;
  }

  get roleIdThatIsBeingEditedNow() {
    return this._roleIdThatIsBeingEditedNow;
  }

  addNewRole() {
    this._roles.unshift({
      id: 0,
      name: '',
      permissions: [],
    });

    this.editRole(0);
  }

  editRole(roleId: number) {
    this._roleIdThatIsBeingEditedNow = roleId;
    this._isInEditMode = true;
  }

  applyChanges({ name, permissions } : { name: string; permissions: string[] }) {
    this._roles = this._roles.map((role) => {
      if (role.id === this._roleIdThatIsBeingEditedNow) {
        return {
          id: this._roleIdThatIsBeingEditedNow,
          name,
          permissions,
        };
      }

      return role;
    });
  }
}

export default RolesPageState;
