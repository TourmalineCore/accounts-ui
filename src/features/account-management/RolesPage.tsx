import { useMemo } from 'react'
import RolesPageContent from './RolesPageContent'
import {RolesPageState} from './state/roles-page/RolesPageState'
import {RolesPageStateContext} from './state/roles-page/RolesPageStateContext'

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
