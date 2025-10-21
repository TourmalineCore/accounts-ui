import { useMemo } from 'react'
import { AccountManagementState } from './components/Accounts/state/AccountManagementState'
import { AccountManagementStateContext } from './components/Accounts/state/AccountManagementStateContext'
import { AccountsContainer } from './components/Accounts/AccountsContainer'

export function AccountsPage() {
  const accountManagementState = useMemo(
    () => new AccountManagementState(),
    [],
  )

  return (
    <AccountManagementStateContext.Provider value={accountManagementState}>
      <AccountsContainer />
    </AccountManagementStateContext.Provider>
  )
}
