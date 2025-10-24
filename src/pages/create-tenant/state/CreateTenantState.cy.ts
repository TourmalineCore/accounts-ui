import { CreateTenantState } from "./CreateTenantState"

describe(`CreateTenantState`, () => {
  describe(`Initialization`, initializationTests)
})

function initializationTests() {
  const createTenantState = new CreateTenantState()
  
  it(`
  GIVEN a CreateTenantState
  WHEN initialize
  SHOULD have default values
  `, () => {
    expect(createTenantState.triedToSubmit)
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
