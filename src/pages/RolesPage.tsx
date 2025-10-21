import { useMemo } from 'react'
import { RolesPageState } from './components/Roles/state/roles-page/RolesPageState'
import { RolesPageStateContext } from './components/Roles/state/roles-page/RolesPageStateContext'
import {RolesContainer} from './components/Roles/RolesContainer'

export function RolesPage() {
  const rolesPageState = useMemo(
    () => new RolesPageState(),
    [],
  )

  return (
    <RolesPageStateContext.Provider value={rolesPageState}>
      <RolesContainer />
    </RolesPageStateContext.Provider>
  )
}
