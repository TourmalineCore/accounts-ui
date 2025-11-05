import { useMemo } from 'react'
import { RolesState } from './state/RolesState'
import { RolesStateContext } from './state/RolesStateContext'
import { RolesContainer } from './RolesContainer'

export function RolesPage() {
  const rolesManagementState = useMemo(
    () => new RolesState(),
    [],
  )

  return (
    <RolesStateContext.Provider value={rolesManagementState}>
      <RolesContainer />
    </RolesStateContext.Provider>
  )
}
