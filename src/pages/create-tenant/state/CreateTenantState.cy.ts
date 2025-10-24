import { CreateTenantState } from "./CreateTenantState"

describe(`CreateTenantState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Tenant Data`, tenantDataTests)
  describe(`Is Tried To Submit`, isTriedToSubmitTests)
})

function initializationTests() {
  const createTenantState = new CreateTenantState()
  
  it(`
  GIVEN a CreateTenantState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(createTenantState.isTriedToSubmit)
      .to
      .be
      .false
    expect(createTenantState.tenantData)
      .to
      .deep
      .eq({
        name: ``,
      })
  })
}

function tenantDataTests() {
  let createTenantState: CreateTenantState

  beforeEach(() => {
    createTenantState = new CreateTenantState()
  })

  it(`
  GIVEN CreateTenantState
  WHEN set tenant name
  SHOULD update tenant form data with name
  `, () => {
    createTenantState.setTenantData({
      name: `Test`,
    })

    expect(createTenantState.tenantData.name)
      .to
      .eq(`Test`)
  })

  it(`
  GIVEN CreateTenantState with existing tenant form data
  WHEN set new tenant name
  SHOULD update tenant form data with new name
  `, () => {
    createTenantState.setTenantData({
      name: `Test`,
    })

    createTenantState.setTenantData({
      name: `Test 2`,
    })

    expect(createTenantState.tenantData.name).to.eq(`Test 2`)
  })
}

function isTriedToSubmitTests() {
  let createTenantState: CreateTenantState

  beforeEach(() => {
    createTenantState = new CreateTenantState()
  })

  it(`
  GIVEN initial isTriedToSubmit = false
  WHEN setIsTriedToSubmit(true)
  SHOULD change value to true
  WHEN setIsTriedToSubmit(false)
  SHOULD change value to false
  `, () => {
    expect(createTenantState.isTriedToSubmit)
      .to
      .be
      .false

    createTenantState.setIsTriedToSubmit(true)
    expect(createTenantState.isTriedToSubmit)
      .to
      .be
      .true

    createTenantState.setIsTriedToSubmit(false)
    expect(createTenantState.isTriedToSubmit)
      .to
      .be
      .false
  })
}
