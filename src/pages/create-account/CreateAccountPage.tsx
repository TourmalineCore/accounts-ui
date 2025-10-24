import { useMemo } from 'react'
import { CreateAccountState } from './state/CreateAccountState'
import { CreateAccountStateContext } from './state/CreateAccountStateContext'
import { CreateAccountContainer } from './CreateAccountContainer'

export function CreateAccountPage() {
  const createAccountState = useMemo(
    () => new CreateAccountState(),
    [],
  )

  return (
    <CreateAccountStateContext.Provider value={createAccountState}>
      <CreateAccountContainer />
    </CreateAccountStateContext.Provider>
  )
}
