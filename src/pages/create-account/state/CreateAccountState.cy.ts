import '../../../../cypress/support/commands'

import { CreateAccountState, EMPTY_FORM_DATA } from "./CreateAccountState"

describe(`CreateAccountState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Form Data`, formDataTests)
  describe(`Selected Checkboxes`, selectedCheckboxesTests)
  describe(`Roles Data`, rolesDataTests)
  describe(`Tenants Data`, tenantsDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTests)
  describe(`Is Error`, isErrorTests)
})

function initializationTests() {
  const createAccountState = new CreateAccountState()
  
  it(`
  GIVEN a CreateAccountState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(createAccountState.isTriedToSubmit)
      .to
      .be
      .false
    expect(createAccountState.selectedCheckboxes.size)
      .to
      .eq(0)
    expect(createAccountState.formData)
      .to
      .deep
      .eq(EMPTY_FORM_DATA)
    expect(createAccountState.rolesData)
      .to
      .deep
      .eq({})
    expect(createAccountState.tenantsData)
      .to
      .deep
      .eq([])
    expect(createAccountState.isError)
      .to
      .be
      .false
    
  })
}

function formDataTests() {
  let createAccountState: CreateAccountState

   const accountDataForInitialization = {
    firstName: 'Ceo',
    lastName: 'Ceo',
    middleName: 'Ceo',
    corporateEmail: 'ceo@tourmalinecore.com',
    tenantId: '0',
  }

  beforeEach(() => {
    createAccountState = new CreateAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN set account form data
  SHOULD display new values in the account object
  `, () => {
    createAccountState.setFormData(accountDataForInitialization)

    expect(createAccountState.formData)
    .to
    .deep
    .eq(accountDataForInitialization)
  })

  it(`
  GIVEN the CreateAccountState with existing form data
  WHEN setFormData with new values
  SHOULD update only specified fields
  `, () => {
    createAccountState.setFormData(accountDataForInitialization)
    createAccountState.setFormData({
      firstName: 'Test',
    })

    expect(createAccountState.formData.firstName)
    .to
    .eq('Test')
    expect(createAccountState.formData.lastName)
    .to
    .eq('Ceo')
    expect(createAccountState.formData.corporateEmail)
    .to
    .eq('ceo@tourmalinecore.com')
    expect(createAccountState.formData.tenantId)
    .to
    .eq('0')
  })
}

function selectedCheckboxesTests() {
  let createAccountState: CreateAccountState

  beforeEach(() => {
    createAccountState = new CreateAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN toggle empty checkbox 
  SHOULD add its value to the set of selected checkboxes
  `, () => {
    createAccountState.toggleCheckbox('1')

    expect(createAccountState.selectedCheckboxes.has('1'))
    .to
    .be
    .true
    expect(createAccountState.selectedCheckboxes.size)
    .to
    .eq(1)
  })

  it(`
  GIVEN the CreateAccountState with existing checkbox
  WHEN toggle checkbox with existing value
  SHOULD remove value from the set of selected checkboxes
  `, () => {
    createAccountState.setSelectedCheckboxes(new Set(['1', '2']))
    
    createAccountState.toggleCheckbox('1')

    expect(createAccountState.selectedCheckboxes.has('1'))
    .to
    .be
    .false
    expect(createAccountState.selectedCheckboxes.has('2'))
    .to
    .be
    .true
    expect(createAccountState.selectedCheckboxes.size)
    .to
    .eq(1)
  })
}

function rolesDataTests() {
  let createAccountState: CreateAccountState

  beforeEach(() => {
    createAccountState = new CreateAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN call setRolesData
  SHOULD update roles data
  `, () => {
    const newRolesData = {
      1: 'Employee',
      2: 'Intern',
    }

    createAccountState.setRolesData(newRolesData)

    expect(createAccountState.rolesData)
    .to
    .deep
    .eq(newRolesData)
  })
}

function tenantsDataTests() {
  let createAccountState: CreateAccountState

  beforeEach(() => {
    createAccountState = new CreateAccountState()
  })

  it(`
  GIVEN the CreateAccountState
  WHEN call setTenantsData
  SHOULD update tenants data
  `, () => {
    const newTenantsData = [
      { 
        id: 0, 
        name: 'Tenant 1' 
      },
      { 
        id: 1, 
        name: 'Tenant 2'
      },
    ]

    createAccountState.setTenantsData(newTenantsData)

    expect(createAccountState.tenantsData)
    .to
    .deep
    .eq(newTenantsData)
  })
}

function isTriedToSubmitTests() {
  let createAccountState: CreateAccountState

  beforeEach(() => {
    createAccountState = new CreateAccountState()
  })

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN call setIsTriedToSubmit(true)
  SHOULD change value to true
  WHEN call setIsTriedToSubmit(false)
  SHOULD change value to false
  `, () => {
    expect(createAccountState.isTriedToSubmit)
    .to
    .be
    .false

    createAccountState.setIsTriedToSubmit(true)
    expect(createAccountState.isTriedToSubmit)
    .to
    .be
    .true

    createAccountState.setIsTriedToSubmit(false)
    expect(createAccountState.isTriedToSubmit)
    .to
    .be
    .false
  })
}

function isErrorTests() {
  let createAccountState: CreateAccountState

  beforeEach(() => {
    createAccountState = new CreateAccountState()
  })

  it(`
  GIVEN initial isError = false
  WHEN setIsError(true)
  SHOULD change value to true
  WHEN setIsError(false)
  SHOULD change value to false
  `, () => {
    expect(createAccountState.isError)
    .to
    .be
    .false

    createAccountState.setIsError(true)
    expect(createAccountState.isError)
    .to
    .be
    .true

    createAccountState.setIsError(false)
    expect(createAccountState.isError)
    .to
    .be
    .false
  })
}
// import { CreateAccountState } from './CreateAccountState'

// const INITIAL_STATE: Tenants[] = [
//   {
//     id: 1,
//     name: `Blue`,
//   },
//   {
//     id: 2,
//     name: `Black`,
//   },
// ]

describe(`CreateAccountState`, () => {
  // it(`SHOULD return all tenants WHEN initialized`, () => {
  //   const tenantManagementState = new CreateAccountState()

  //   tenantManagementState.getTenants(INITIAL_STATE)

  //   expect(tenantManagementState.allTenants).to.has.lengthOf(2)
  // })
})
