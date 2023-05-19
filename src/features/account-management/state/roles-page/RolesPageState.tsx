import { makeAutoObservable } from 'mobx';

class RolesPageState {
  private _roles: Role[] = [];

  private _roleBeforeEditing: Role | null = null;

  private _isInEditMode: boolean = false;

  private _newRoleName: string = '';

  private _updatedRole: Role = {
    id: 0,
    name: '',
    permissions: [],
  };

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

  get updatedRole() {
    return this._updatedRole;
  }

  changeRole({
    id,
    name,
    permissions,
  }:{
    id: number;
    name: string,
    permissions: string[]
  }) {
    this._updatedRole = {
      id,
      name,
      permissions,
    };
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
    const index = this._roles.map((element) => element.id).indexOf(roleId);

    this._isInEditMode = true;
    this._updatedRole = this._roles[index];
    this._roleBeforeEditing = { ...this._roles[0] };
  }

  // check if needed
  applyChanges({
    name,
    permissions,
  } : {
    name: string;
    permissions: string[]
  }) {
    this._roles = this._roles
      .map((role) => {
        if (role.id === this._updatedRole.id) {
          return {
            id: this._updatedRole.id,
            name,
            permissions,
          };
        }

        return role;
      });
  }

  changeRoleName(newRoleName: string) {
    const roleToChangeName = this._roles.find(({ id }) => id === this._updatedRole.id);
    roleToChangeName!.name = newRoleName;
  }

  cancelRoleEditing() {
    this._roles = this._roles
      .map((role) => {
        if (role.id === this._updatedRole.id) {
          return this._roleBeforeEditing!;
        }

        return role;
      });

    this._isInEditMode = false;
    this._roleBeforeEditing = null;
  }
}

export default RolesPageState;
