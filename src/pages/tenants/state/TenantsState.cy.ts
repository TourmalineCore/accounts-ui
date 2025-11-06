import '../../../../cypress/support/commands'

import { TenantsState } from './TenantsState'

const INITIAL_STATE: Tenants[] = [
  {
    id: 1,
    name: `Blue`,
  },
  {
    id: 2,
    name: `Black`,
  },
]

describe(`TenantsState`, () => {
  it(`SHOULD return all tenants WHEN initialized`, () => {
    const tenantsState = new TenantsState()

    tenantsState.getTenants({
      newTenant: INITIAL_STATE,
    })

    expect(tenantsState.allTenants)
      .to
      .has
      .lengthOf(2)
  })
})
