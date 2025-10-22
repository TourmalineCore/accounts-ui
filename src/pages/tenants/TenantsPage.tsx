import { useMemo } from 'react'
import { TenantManagementState } from './components/Tenants/state/TenantManagementState'
import { TenantManagementStateContext } from './components/Tenants/state/TenantManagementStateContext'
import { TenantsContainer } from './components/Tenants/TenantsContainer'

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
