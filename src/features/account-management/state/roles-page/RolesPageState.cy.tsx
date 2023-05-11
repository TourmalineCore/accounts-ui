import '../../../../../cypress/support/commands';
import RolesPageState from './RolesPageState';

describe('RolesPageState', () => {
  it('SHOULD return all galleries WHEN initialized', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize({
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
    });

    expect(rolesPageState.roles).to.has.lengthOf(2);
  });

  it('SHOULD add new role to the beginning of the list WHEN adding was called', () => {
    const rolesPageState = new RolesPageState();

    rolesPageState.initialize({
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
    });

    rolesPageState.addNewRole();

    expect(rolesPageState.roles).to.deep.equal([
      {
        id: 0,
        name: '',
        permissions: [],
      },
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
    ]);
  });
});
