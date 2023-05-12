import '../../../../../cypress/support/commands';
import RolesPageState from './RolesPageState';

const INITIAL_STATE = {
  loadedRoles: [
    {
      id: 1,
      name: 'Admin',
      permissions: [],
    },
    {
      id: 2,
      name: 'Employee',
      permissions: [],
    },
  ],
};

describe('RolesPageState', () => {
  it('SHOULD return all galleries WHEN initialized', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    expect(rolesPageState.roles).to.has.lengthOf(2);
  });

  it('SHOULD add new role to the beginning of the list in edit mode WHEN adding was called', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    rolesPageState.addNewRole();

    expect(rolesPageState.roles).to.has.lengthOf(3);
    expect(rolesPageState.roles[0].name).eq('');
    expect(rolesPageState.isInEditMode).eq(true);
    expect(rolesPageState.roleIdThatIsBeingEditedNow).eq(0);
  });

  it('SHOULD turn on edit mode for a role WHEN editing was called for it', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    rolesPageState.editRole(2);
    expect(rolesPageState.roleIdThatIsBeingEditedNow).eq(2);
  });

  it('SHOULD apply changes to a role WHEN saving was called for it', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize(INITIAL_STATE);

    rolesPageState.editRole(2);
    rolesPageState.applyChanges({
      name: 'Manager',
      permissions: [],
    });

    expect(rolesPageState.roles[1].name).eq('Manager');
  });
});
