import { useMemo } from 'react'
import { RolesManagementState } from './state/roles-page/RolesManagementState'
import { RolesManagementStateContext } from './state/roles-page/RolesManagementStateContext'
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
