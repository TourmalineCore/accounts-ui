import { useMemo } from 'react'
import { AccountsStateContext } from './state/AccountsStateContext'
import { AccountsState } from './state/AccountsState'
import { AccountsContainer } from './AccountsContainer'

export function AccountsPage() {
  const accountManagementState = useMemo(
    () => new AccountsState(),
    [],
  )

  return (
    <AccountsStateContext.Provider value={accountManagementState}>
      <AccountsContainer />
    </AccountsStateContext.Provider>
  )
}
