import { useMemo } from 'react'
import { CreateOrEditAccountState } from './state/CreateOrEditAccountState'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { CreateOrEditAccountContainer } from './CreateOrEditAccountContainer'

export function CreateOrEditAccountPage() {
  const createOrEditAccountState = useMemo(
    () => new CreateOrEditAccountState(),
    [],
  )

  return (
    <CreateOrEditAccountStateContext.Provider value={createOrEditAccountState}>
      <CreateOrEditAccountContainer />
    </CreateOrEditAccountStateContext.Provider>
  )
}
