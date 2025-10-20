import { useMemo } from 'react'
import { RolesPageState } from './components/Roles/state/roles-page/RolesPageState'
import { RolesPageStateContext } from './components/Roles/state/roles-page/RolesPageStateContext'
import RolesPageContent from './components/Roles/RolesPageContent'

export function RolesPage() {
  const rolesPageState = useMemo(
    () => new RolesPageState(),
    [],
  )

  return (
    <RolesPageStateContext.Provider value={rolesPageState}>
      <RolesPageContent />
    </RolesPageStateContext.Provider>
  )
}
