import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { AccountsStateContext } from './state/AccountsStateContext'
import { api } from '../../common/api'
import { AccountsContent } from './AccountsContent'

export const AccountsContainer = observer(() => {
  const accountsState = useContext(AccountsStateContext)

  useEffect(() => {
    getAccountsAsync()
  }, [])

  return (
    <AccountsContent
      accounts={accountsState.allAccounts}
      onBlockAccount={blockAccountsAsync}
      onUnblockAccount={unblockAccountsAsync}
    />
  )

  async function getAccountsAsync() {
    accountsState.setIsLoading()
    try {
      const {
        data, 
      } = await api.get<Accounts[]>(`/accounts/all`)
      accountsState.getAccounts(data)
    }
    finally {
      accountsState.resetIsLoading()
    }
  }

  async function blockAccountsAsync(accountId: number) {
    // remove all notifications, it is necessary to delete the previous notification
    toast.dismiss()

    toast(() => (
      <div className="accounts-page__notification">
        {accountsState.accountToUnblock?.middleName ? (
          <span>
            {`${accountsState.accountToUnblock?.lastName}
              ${accountsState.accountToUnblock?.firstName} 
              ${accountsState.accountToUnblock?.middleName}`}
          </span>
        ) : (
          <span>
            {`${accountsState.accountToUnblock?.firstName} ${accountsState.accountToUnblock?.lastName}`}
          </span>
        )}

        <button
          type="button"
          className="accounts-page__unblock-button"
          onClick={() => {
            toast.dismiss(accountsState.accountToUnblock!.id)
            unblockAccountsAsync(accountsState.accountToUnblock!.id)
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

    accountsState.blockAccount({
      accountId, 
    })
    await api.post<Accounts[]>(`/accounts/${accountId}/block`)
  }

  async function unblockAccountsAsync(accountId: number) {
    accountsState.unblockAccont({
      accountId, 
    })
    await api.post<Accounts[]>(`/accounts/${accountId}/unblock`)
  }
})