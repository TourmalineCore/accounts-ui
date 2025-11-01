import '../../../cypress/support/commands'
import { TenantManagementState } from './state/TenantManagementState'
import { TenantManagementStateContext } from './state/TenantManagementStateContext'
import { TenantsContent } from './TenantsContent'

const initialData: Tenants[] = [
  {
    id: 1,
    name: `Blue`,
  },
  {
    id: 2,
    name: `Black`,
  },
]

describe(`TenantsContent`, () => {
  it(`
  GIVEN tenants page 
  WHEN visit tenants page
  SHOULD render tenants page content
  `, () => {
    mountComponent({
      tenants: initialData,
    })

    cy
      .getByData(`tenants-page-content`)
      .should(`exist`)
  })

  it(`
  GIVEN tenants page 
  WHEN visit tenants page
  SHOULD render button
  `, () => {
    mountComponent({
      tenants: initialData,
    })

    cy
      .getByData(`tenants-page-content-button`)
      .should(`exist`)
      .should(`have.text`, `+ Add New Tenant`)
  })

  it(`
  GIVEN tenants page 
  WHEN visit tenants page
  SHOULD render table with data
  `, () => {
    context(`desctop resolution`, () => {
      cy
        .viewport(2400, 780)
      mountComponent({
        tenants: initialData,
      })

      cy
        .getByData(`tenant-table-row`)
        .should(`exist`)
        .first()
        .should(`have.text`, `Blue`)

      cy
        .getByData(`tenant-table-row`)
        .should(`exist`)
        .last()
        .should(`have.text`, `Black`)
    })
  })
})

function mountComponent({
  tenants,
}: {
  tenants: Tenants[],
}) {
  const tenantManagementState = new TenantManagementState()

  tenantManagementState.getTenants({
    newTenant: tenants,
  })
  cy.mount(
    <TenantManagementStateContext.Provider value={tenantManagementState}>
      <TenantsContent />
    </TenantManagementStateContext.Provider>,

  )
}
