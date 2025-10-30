import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { AccountManagementStateContext } from './state/AccountManagementStateContext'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import { api } from '../../common/api'
import { AccountsContent } from './AccountsContent'

export const AccountsContainer = observer(() => {
  const accountManagementState = useContext(AccountManagementStateContext)

  useEffect(() => {
    getAccountsAsync()
  }, [])

  return (
    <AccountsContent
      accounts={accountManagementState.allAccounts}
      onBlockAccount={blockAccountsAsync}
      onUnblockAccount={unblockAccountsAsync}
    />
  )

  async function getAccountsAsync() {
    accountManagementState.setIsLoading(true)
    try {
      const {
        data, 
      } = await api.get<Accounts[]>(`${LINK_TO_ACCOUNT_SERVICE}accounts/all`)
      accountManagementState.getAccounts(data)
    }
    finally {
      accountManagementState.setIsLoading(false)
    }
  }

  async function blockAccountsAsync(accountId: number) {
    // remove all notifications, it is necessary to delete the previous notification
    toast.dismiss()

    toast(() => (
      <div className="account-management-page__notification">
        {accountManagementState.accountToUnblock?.middleName ? (
          <span>
            {`${accountManagementState.accountToUnblock?.lastName}
              ${accountManagementState.accountToUnblock?.firstName} 
              ${accountManagementState.accountToUnblock?.middleName}`}
          </span>
        ) : (
          <span>
            {`${accountManagementState.accountToUnblock?.firstName} ${accountManagementState.accountToUnblock?.lastName}`}
          </span>
        )}

        <button
          type="button"
          className="account-management-page__unblock-button"
          onClick={() => {
            toast.dismiss(accountManagementState.accountToUnblock!.id)
            unblockAccountsAsync(accountManagementState.accountToUnblock!.id)
          }}
        >
          Unblock
        </button>
      </div>
    ), {
      position: `top-center`,
      type: `info`,
      icon: false,
      toastId: accountId,
    })

    accountManagementState.blockAccount({
      accountId, 
    })
    await api.post<Accounts[]>(`${LINK_TO_ACCOUNT_SERVICE}accounts/${accountId}/block`)
  }

  async function unblockAccountsAsync(accountId: number) {
    accountManagementState.unblockAccont({
      accountId, 
    })
    await api.post<Accounts[]>(`${LINK_TO_ACCOUNT_SERVICE}accounts/${accountId}/unblock`)
  }
})