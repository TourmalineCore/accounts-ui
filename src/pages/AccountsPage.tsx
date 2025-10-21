import { useMemo } from 'react'
import { AccountManagementState } from './components/Accounts/state/AccountManagementState'
import { AccountManagementStateContext } from './components/Accounts/state/AccountManagementStateContext'
import { AccountsPageContent } from './components/Accounts/AccountsPageContent'

export function AccountsPage() {
  const accountManagementState = useMemo(
    () => new AccountManagementState(),
    [],
  )

  return (
    <AccountManagementStateContext.Provider value={accountManagementState}>
      <AccountsPageContent />
    </AccountManagementStateContext.Provider>
  )
}
