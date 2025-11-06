import { useMemo } from 'react'
import { AccountsStateContext } from './state/AccountsStateContext'
import { AccountsState } from './state/AccountsState'
import { AccountsContainer } from './AccountsContainer'

export function AccountsPage() {
  const accountsState = useMemo(
    () => new AccountsState(),
    [],
  )

  return (
    <AccountsStateContext.Provider value={accountsState}>
      <AccountsContainer />
    </AccountsStateContext.Provider>
  )
}
