import { useMemo } from 'react'
import { TenantsState } from './state/TenantsState'
import { TenantsStateContext } from './state/TenantsStateContext'
import { TenantsContainer } from './TenantsContainer'

export function TenantsPage() {
  const tenantManagementState = useMemo(
    () => new TenantsState(),
    [],
  )

  return (
    <TenantsStateContext.Provider value={tenantManagementState}>
      <TenantsContainer />
    </TenantsStateContext.Provider>
  )
}
