import '../../../../cypress/support/commands'
import {RolesState} from './RolesState'

const INITIAL_STATE = {
  loadedRoles: [
    {
      id: 1,
      name: `Admin`,
      permissions: [],
    },
    {
      id: 2,
      name: `Employee`,
      permissions: [],
    },
  ],
}

describe(`RolesState`, () => {
  it(`SHOULD return all roles WHEN initialized`, () => {
    const rolesPageState = new RolesState()

    rolesPageState.initialize(INITIAL_STATE)

    expect(rolesPageState.roles)
      .to
      .has
      .lengthOf(2)
  })

  it(`SHOULD add new role to the beginning of the list in edit mode WHEN adding was called`, () => {
    const rolesState = new RolesState()

    rolesState.initialize(INITIAL_STATE)

    rolesState.addNewRole()

    expect(rolesState.roles)
      .to
      .has
      .lengthOf(3)
    expect(rolesState.roles[0].name)
      .eq(``)
    expect(rolesState.isInEditMode)
      .eq(true)
    expect(rolesState.updatedRole!.id)
      .eq(0)
  })

  it(`SHOULD turn on edit mode for a role WHEN editing was called for it`, () => {
    const rolesState = new RolesState()

    rolesState.initialize(INITIAL_STATE)

    rolesState.editRole({
      roleId: 2,
    })
    expect(rolesState.updatedRole!.id)
      .eq(2)
  })

  it(`SHOULD apply changes to a role WHEN saving was called for it`, () => {
    const rolesState = new RolesState()

    rolesState.initialize(INITIAL_STATE)

    rolesState.editRole({
      roleId: 2,
    })

    rolesState.changeRole({
      id: 2,
      name: `Manager`,
      permissions: [],
    })

    expect(rolesState.updatedRole!.name)
      .eq(`Manager`)
  })

  it(`SHOULD reset changes to role name that is being edited WHEN editing was canceled`, () => {
    const rolesState = new RolesState()

    rolesState.initialize({
      loadedRoles: [
        {
          id: 2,
          name: `Employee`,
          permissions: [],
        },
      ],
    })

    rolesState.editRole({
      roleId: 2,
    })

    expect(rolesState.isInEditMode)
      .eq(true)
    expect(rolesState.updatedRole!.id)
      .eq(2)

    rolesState.changeRole(
      {
        id: 2,
        name: `Manager`,
        permissions: [],
      },
    )
    expect(rolesState.updatedRole!.name)
      .eq(`Manager`)

    rolesState.cancelRoleEditing()

    expect(rolesState.roles[0].name)
      .eq(`Employee`)
    expect(rolesState.isInEditMode)
      .eq(false)
  })

  it(`SHOULD have the same object in private field WHEN editing this object`, () => {
    const rolesState = new RolesState()

    rolesState.initialize({
      loadedRoles: [
        {
          id: 2,
          name: `Employee`,
          permissions: [],
        },
      ],
    })

    rolesState.editRole({
      roleId: 2,
    })

    expect(rolesState.isInEditMode)
      .eq(true)
    expect(rolesState.updatedRole!.id)
      .eq(2)

    expect(rolesState.updatedRole).to.deep.equal({
      id: 2,
      name: `Employee`,
      permissions: [],
    })
  })

  it(`SHOULD change value of private field isNameFilled to true WHEN receiving valid string`, () => {
    const rolesState = new RolesState()

    rolesState.initialize(INITIAL_STATE)

    rolesState.addNewRole()

    expect(!!rolesState.updatedRole!.name)
      .eq(false)

    rolesState.changeRole({
      id: 2,
      name: `Employee`,
      permissions: [],
    })

    expect(!!rolesState.updatedRole!.name)
      .eq(true)
  })
})
