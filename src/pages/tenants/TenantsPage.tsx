import { useMemo } from 'react'
import { TenantsState } from './state/TenantsState'
import { TenantsStateContext } from './state/TenantsStateContext'
import { TenantsContainer } from './TenantsContainer'

export function TenantsPage() {
  const tenantsState = useMemo(
    () => new TenantsState(),
    [],
  )

  return (
    <TenantsStateContext.Provider value={tenantsState}>
      <TenantsContainer />
    </TenantsStateContext.Provider>
  )
}
