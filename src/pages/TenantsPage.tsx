import { useMemo } from 'react'

import { TenantsContainer } from './components/Tenants/TenantsContainer'
import { TenantManagementState } from './components/Tenants/state/TenantManagementState'
import { TenantManagementStateContext } from './components/Tenants/state/TenantManagementStateContext'

export function TenantsPage() {
  const tenantManagementState = useMemo(
    () => new TenantManagementState(),
    [],
  )

  return (
    <TenantManagementStateContext.Provider value={tenantManagementState}>
      <TenantsContainer />
    </TenantManagementStateContext.Provider>
  )
}
