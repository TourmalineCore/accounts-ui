import { makeAutoObservable } from 'mobx';

class RolesPageState {
  private _roles: Role[] = [];

  private _roleBeforeEditing: Role | null = null;

  private _roleIdThatIsBeingEditedNow: number | null = null;

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

  get roleIdThatIsBeingEditedNow() {
    return this._roleIdThatIsBeingEditedNow;
  }

  get updatedRole() {
    return this._updatedRole;
  }

  changeRole({
    name,
    permissions,
  }:{
    name: string,
    permissions: string[]
  }) {
    // return {
    //   id: this._roleIdThatIsBeingEditedNow,
    //   name: newName,
    //   permissions: newPermissions,
    // };
    this._updatedRole = {
      id: this._roleIdThatIsBeingEditedNow!,
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
    this._roleIdThatIsBeingEditedNow = roleId;
    this._isInEditMode = true;
    const index = this._roles.map((element) => element.id).indexOf(roleId);
    this._updatedRole = this._roles[index];
    this._roleBeforeEditing = { ...this._roles[0] };
  }

  applyChanges({
    name,
    permissions,
  } : {
    name: string;
    permissions: string[]
  }) {
    this._roles = this._roles
      .map((role) => {
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

  changeRoleName(newRoleName: string) {
    const roleToChangeName = this._roles.find(({ id }) => id === this._roleIdThatIsBeingEditedNow);
    roleToChangeName!.name = newRoleName;
  }

  cancelRoleEditing() {
    this._roles = this._roles
      .map((role) => {
        if (role.id === this._roleIdThatIsBeingEditedNow) {
          return this._roleBeforeEditing!;
        }

        return role;
      });

    this._roleIdThatIsBeingEditedNow = null;
    this._isInEditMode = false;
    this._roleBeforeEditing = null;
  }
}

export default RolesPageState;
