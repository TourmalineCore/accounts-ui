import { useMemo } from 'react'
import { AccountManagementStateContext } from './state/AccountManagementStateContext'
import { AccountManagementState } from './state/AccountManagementState'
import { AccountsContainer } from './AccountsContainer'

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
