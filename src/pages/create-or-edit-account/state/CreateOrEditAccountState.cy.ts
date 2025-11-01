import '../../../../cypress/support/commands'

import { CreateOrEditAccountState, EMPTY_ACCOUNT_DATA } from "./CreateOrEditAccountState"

describe(`CreateOrEditAccountState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Account Data`, accountDataTests)
  describe(`Selected Checkboxes`, selectedCheckboxesTests)
  describe(`Roles Data`, rolesDataTests)
  describe(`Tenants Data`, tenantsDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTests)
  describe(`Is Error`, isErrorTests)
  describe(`Edit Mode`, editModeTests)
})

function editModeTests() {
  let createOrEditAccountState: CreateOrEditAccountState

  beforeEach(() => {
    createOrEditAccountState = new CreateOrEditAccountState()
  })

  it(`
  GIVEN initial isEditMode = false
  WHEN call setIsEditMode
  SHOULD change value to true
  WHEN call resetIsEditMode
  SHOULD change value to false
  `, () => {
    expect(createOrEditAccountState.isEditMode)
      .to
      .be
      .false

    createOrEditAccountState.setIsEditMode()
    expect(createOrEditAccountState.isEditMode)
      .to
      .be
      .true

    createOrEditAccountState.resetIsEditMode()
    expect(createOrEditAccountState.isEditMode)
      .to
      .be
      .false
  })
}

function initializationTests() {
  const createOrEditAccountState = new CreateOrEditAccountState()
  
  it(`
  GIVEN a CreateAccountState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(createOrEditAccountState.isTriedToSubmit)
      .to
      .be
      .false
    expect(createOrEditAccountState.selectedCheckboxes.size)
      .to
      .eq(0)
    expect(createOrEditAccountState.accountData)
      .to
      .deep
      .eq(EMPTY_ACCOUNT_DATA)
    expect(createOrEditAccountState.rolesData)
      .to
      .deep
      .eq({})
    expect(createOrEditAccountState.tenantsData)
      .to
      .deep
      .eq([])
    expect(createOrEditAccountState.isError)
      .to
      .be
      .false
  })
}

function accountDataTests() {
  let createOrEditAccountState: CreateOrEditAccountState

  const accountDataForInitialization = {
    firstName: `Ceo`,
    lastName: `Ceo`,
    middleName: `Ceo`,
    corporateEmail: `ceo@tourmalinecore.com`,
    tenantId: `0`,
  }

  beforeEach(() => {
    createOrEditAccountState = new CreateOrEditAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN set account form data
  SHOULD display new values in the account object
  `, () => {
    createOrEditAccountState.setAccountData({
      newValue: accountDataForInitialization,
    })

    expect(createOrEditAccountState.accountData)
      .to
      .deep
      .eq(accountDataForInitialization)
  })

  it(`
  GIVEN the CreateAccountState with existing account form data
  WHEN setAccountData with new values
  SHOULD update only specified fields
  `, () => {
    createOrEditAccountState.setAccountData({
      newValue: accountDataForInitialization,
    })
    createOrEditAccountState.setAccountData({
      newValue: {
        ...accountDataForInitialization,
        firstName: `Test`,
      },
    })

    expect(createOrEditAccountState.accountData.firstName)
      .to
      .eq(`Test`)
    expect(createOrEditAccountState.accountData.lastName)
      .to
      .eq(`Ceo`)
    expect(createOrEditAccountState.accountData.corporateEmail)
      .to
      .eq(`ceo@tourmalinecore.com`)
    expect(createOrEditAccountState.accountData.tenantId)
      .to
      .eq(`0`)
  })
}

function selectedCheckboxesTests() {
  let createOrEditAccountState: CreateOrEditAccountState

  beforeEach(() => {
    createOrEditAccountState = new CreateOrEditAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN toggle empty checkbox 
  SHOULD add its value to the set of selected checkboxes
  `, () => {
    createOrEditAccountState.toggleCheckbox({
      newValue: `1`,
    })

    expect(createOrEditAccountState.selectedCheckboxes.has(`1`))
      .to
      .be
      .true
    expect(createOrEditAccountState.selectedCheckboxes.size)
      .to
      .eq(1)
  })

  it(`
  GIVEN the CreateAccountState with existing checkbox
  WHEN toggle checkbox with existing value
  SHOULD remove value from the set of selected checkboxes
  `, () => {
    createOrEditAccountState.setSelectedCheckboxes({
      newValue: new Set([
        `1`,
        `2`,
      ]),
    })
    
    createOrEditAccountState.toggleCheckbox({
      newValue: `1`,
    })

    expect(createOrEditAccountState.selectedCheckboxes.has(`1`))
      .to
      .be
      .false
    expect(createOrEditAccountState.selectedCheckboxes.has(`2`))
      .to
      .be
      .true
    expect(createOrEditAccountState.selectedCheckboxes.size)
      .to
      .eq(1)
  })
}

function rolesDataTests() {
  let createOrEditAccountState: CreateOrEditAccountState

  beforeEach(() => {
    createOrEditAccountState = new CreateOrEditAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN call setRolesData
  SHOULD update roles data
  `, () => {
    const newRolesData = {
      1: `Employee`,
      2: `Intern`,
    }

    createOrEditAccountState.setRolesData({
      newValue: newRolesData,
    })

    expect(createOrEditAccountState.rolesData)
      .to
      .deep
      .eq(newRolesData)
  })
}

function tenantsDataTests() {
  let createOrEditAccountState: CreateOrEditAccountState

  beforeEach(() => {
    createOrEditAccountState = new CreateOrEditAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN call setTenantsData
  SHOULD update tenants data
  `, () => {
    const newTenantsData = [
      { 
        id: 0, 
        name: `Tenant 1`, 
      },
      { 
        id: 1, 
        name: `Tenant 2`,
      },
    ]

    createOrEditAccountState.setTenantsData({
      newValue: newTenantsData,
    })

    expect(createOrEditAccountState.tenantsData)
      .to
      .deep
      .eq(newTenantsData)
  })
}

function isTriedToSubmitTests() {
  let createOrEditAccountState: CreateOrEditAccountState

  beforeEach(() => {
    createOrEditAccountState = new CreateOrEditAccountState()
  })

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN call setIsTriedToSubmit
  SHOULD change value to true
  WHEN call resetIsTriedToSubmit
  SHOULD change value to false
  `, () => {
    expect(createOrEditAccountState.isTriedToSubmit)
      .to
      .be
      .false

    createOrEditAccountState.setIsTriedToSubmit()
    expect(createOrEditAccountState.isTriedToSubmit)
      .to
      .be
      .true

    createOrEditAccountState.resetIsTriedToSubmit()
    expect(createOrEditAccountState.isTriedToSubmit)
      .to
      .be
      .false
  })
}

function isErrorTests() {
  let createOrEditAccountState: CreateOrEditAccountState

  beforeEach(() => {
    createOrEditAccountState = new CreateOrEditAccountState()
  })

  it(`
  GIVEN initial isError = false
  WHEN setIsError
  SHOULD change value to true
  WHEN resetIsError
  SHOULD change value to false
  `, () => {
    expect(createOrEditAccountState.isError)
      .to
      .be
      .false

    createOrEditAccountState.setIsError()
    expect(createOrEditAccountState.isError)
      .to
      .be
      .true

    createOrEditAccountState.resetIsError()
    expect(createOrEditAccountState.isError)
      .to
      .be
      .false
  })
}
