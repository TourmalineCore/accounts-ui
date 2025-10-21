import { useMemo } from 'react'
import { RolesManagementState } from './components/Roles/state/roles-page/RolesManagementState'
import { RolesManagementStateContext } from './components/Roles/state/roles-page/RolesManagementStateContext'
import {RolesContainer} from './components/Roles/RolesContainer'

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
