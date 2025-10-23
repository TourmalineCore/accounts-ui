import '../../../../cypress/support/commands'

import { CreateAccountState, EMPTY_FORM_DATA } from "./CreateAccountState"

describe(`CreateAccountState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Form Data`, formDataTests)
})

function initializationTests() {
  const createAccountState = new CreateAccountState()
  
  it(`
  GIVEN a CreateAccountState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(createAccountState.triedToSubmit)
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
    expect(createAccountState.hasError)
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
