import '../../../../../cypress/support/commands'
import {RolesManagementState} from './RolesManagementState'

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

describe(`RolesManagementState`, () => {
  it(`SHOULD return all roles WHEN initialized`, () => {
    const rolesPageState = new RolesManagementState()

    rolesPageState.initialize(INITIAL_STATE)

    expect(rolesPageState.roles)
      .to
      .has
      .lengthOf(2)
  })

  it(`SHOULD add new role to the beginning of the list in edit mode WHEN adding was called`, () => {
    const rolesManagementState = new RolesManagementState()

    rolesManagementState.initialize(INITIAL_STATE)

    rolesManagementState.addNewRole()

    expect(rolesManagementState.roles)
      .to
      .has
      .lengthOf(3)
    expect(rolesManagementState.roles[0].name)
      .eq(``)
    expect(rolesManagementState.isInEditMode)
      .eq(true)
    expect(rolesManagementState.updatedRole!.id)
      .eq(0)
  })

  it(`SHOULD turn on edit mode for a role WHEN editing was called for it`, () => {
    const rolesManagementState = new RolesManagementState()

    rolesManagementState.initialize(INITIAL_STATE)

    rolesManagementState.editRole(2)
    expect(rolesManagementState.updatedRole!.id)
      .eq(2)
  })

  it(`SHOULD apply changes to a role WHEN saving was called for it`, () => {
    const rolesManagementState = new RolesManagementState()

    rolesManagementState.initialize(INITIAL_STATE)

    rolesManagementState.editRole(2)

    rolesManagementState.changeRole({
      id: 2,
      name: `Manager`,
      permissions: [],
    })

    expect(rolesManagementState.updatedRole!.name)
      .eq(`Manager`)
  })

  it(`SHOULD reset changes to role name that is being edited WHEN editing was canceled`, () => {
    const rolesManagementState = new RolesManagementState()

    rolesManagementState.initialize({
      loadedRoles: [
        {
          id: 2,
          name: `Employee`,
          permissions: [],
        },
      ],
    })

    rolesManagementState.editRole(2)

    expect(rolesManagementState.isInEditMode)
      .eq(true)
    expect(rolesManagementState.updatedRole!.id)
      .eq(2)

    rolesManagementState.changeRole(
      {
        id: 2,
        name: `Manager`,
        permissions: [],
      },
    )
    expect(rolesManagementState.updatedRole!.name)
      .eq(`Manager`)

    rolesManagementState.cancelRoleEditing()

    expect(rolesManagementState.roles[0].name)
      .eq(`Employee`)
    expect(rolesManagementState.isInEditMode)
      .eq(false)
  })

  it(`SHOULD have the same object in private field WHEN editing this object`, () => {
    const rolesManagementState = new RolesManagementState()

    rolesManagementState.initialize({
      loadedRoles: [
        {
          id: 2,
          name: `Employee`,
          permissions: [],
        },
      ],
    })

    rolesManagementState.editRole(2)

    expect(rolesManagementState.isInEditMode)
      .eq(true)
    expect(rolesManagementState.updatedRole!.id)
      .eq(2)

    expect(rolesManagementState.updatedRole).to.deep.equal({
      id: 2,
      name: `Employee`,
      permissions: [],
    })
  })

  it(`SHOULD change value of private field isNameFilled to true WHEN receiving valid string`, () => {
    const rolesManagementState = new RolesManagementState()

    rolesManagementState.initialize(INITIAL_STATE)

    rolesManagementState.addNewRole()

    expect(!!rolesManagementState.updatedRole!.name)
      .eq(false)

    rolesManagementState.changeRole({
      id: 2,
      name: `Employee`,
      permissions: [],
    })

    expect(!!rolesManagementState.updatedRole!.name)
      .eq(true)
  })
})
