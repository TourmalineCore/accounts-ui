import { useMemo } from 'react'
import { CreateTenantContainer } from './CreateTenantContainer'
import { CreateTenantState } from './state/CreateTenantState'
import { CreateTenantStateContext } from './state/CreateTenantStateContext'

export function CreateTenantPage() {
  const createTenantState = useMemo(
    () => new CreateTenantState(),
    [],
  )

  return (
    <CreateTenantStateContext.Provider value={createTenantState}>
      <CreateTenantContainer />
    </CreateTenantStateContext.Provider>
  )
}
