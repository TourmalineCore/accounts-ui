import { useMemo } from 'react'
import { CreateTenantContainer } from './CreateTenantContainer'

export function CreateTenantPage() {
  const createTenantManagementState = useMemo(
    () => new CreateTenantManagementState(),
    [],
  )

  return (
    <CreateTenantManagementStateContext.Provider value={createTenantManagementState}>
      <CreateTenantContainer />
    </CreateTenantManagementStateContext.Provider>
  )
}
