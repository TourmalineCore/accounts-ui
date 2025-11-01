import { useMemo } from 'react'
import { RolesManagementState } from './state/RolesManagementState'
import { RolesManagementStateContext } from './state/RolesManagementStateContext'
import { RolesContainer } from './RolesContainer'

export function RolesPage() {
  const rolesManagementState = useMemo(
    () => new RolesManagementState(),
    [],
  )

  return (
    <RolesManagementStateContext.Provider value={rolesManagementState}>
      <RolesContainer />
    </RolesManagementStateContext.Provider>
  )
}
