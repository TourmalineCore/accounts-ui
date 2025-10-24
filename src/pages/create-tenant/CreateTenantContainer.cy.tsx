import '../../../cypress/support/commands'
import { CreateTenantContainer } from './CreateTenantContainer'
import { CreateTenantState } from './state/CreateTenantState'
import { CreateTenantStateContext } from './state/CreateTenantStateContext'

describe(`CreateTenantContainer`, () => {
  it(`
  GIVEN create tenant page 
  WHEN visit tenants page
  SHOULD render tenants page content `, () => {
    mountComponent()

    cy.getByData(`create-tenant-page`)
      .should(`exist`)

    cy.getByData(`create-tenant-page-input`)
      .should(`exist`)

    cy.getByData(`create-tenant-page-button-cancel`)
      .should(`exist`)
      .should(`have.text`, `Cancel`)

    cy.getByData(`create-tenant-page-button-add`)
      .should(`exist`)
      .should(`have.text`, `Add`)
  })
})

function mountComponent() {
  const createTenantState = new CreateTenantState()

  cy.mount(
    <CreateTenantStateContext.Provider value={createTenantState}>
      <CreateTenantContainer />
    </CreateTenantStateContext.Provider>,
  )
}
