import { CreateTenantState } from "./CreateTenantState"

describe(`CreateTenantState`, () => {
  describe(`Initialization`, initializationTests)
  describe(`Form Data`, formDataTests)
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
    expect(createTenantState.formData)
      .to
      .deep
      .eq({
        name: '',
      })
  })
}

function formDataTests() {
  let createTenantState: CreateTenantState

  beforeEach(() => {
    createTenantState = new CreateTenantState()
  })

  it(`
  GIVEN CreateTenantState
  WHEN set account name
  SHOULD update form data with name
  `, () => {
    createTenantState.setFormData({
      name: 'Test',
    })

    expect(createTenantState.formData.name)
      .to
      .eq('Test')
  })

  it(`
  GIVEN CreateTenantState with existing form data
  WHEN set new account name
  SHOULD update form data with new name
  `, () => {
    createTenantState.setFormData({
      name: 'Test',
    })

    createTenantState.setFormData({
      name: 'Test 2',
    })

    expect(createTenantState.formData.name).to.eq('Test 2')
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
