import { useMemo } from 'react'
import { TenantManagementState } from './state/TenantManagementState'
import { TenantManagementStateContext } from './state/TenantManagementStateContext'
import { TenantsContainer } from './TenantsContainer'

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
