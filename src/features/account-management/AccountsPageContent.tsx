 
/* eslint-disable no-console */
/* eslint-disable react-refresh/only-export-components */

import {useContext, useEffect, useState} from 'react'

import moment from 'moment'
import clsx from 'clsx'

import { ActionsType, ClientTable } from '@tourmalinecore/react-table-responsive'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'

import FilterMenu from './components/FilterMenu/FilterMenu'
import {AccountManagementStateContext} from './context/AccountManagementStateContext'
import {AccessBasedOnPemissionsStateContext} from '../../routes/state/AccessBasedOnPemissionsStateContext'
import { ColumnDef } from '@tanstack/table-core'

function AccountsPageContent() {
  const accountManagementState = useContext(AccountManagementStateContext)
  const accessToChanges = useContext(AccessBasedOnPemissionsStateContext)
  const [
    isLoading,
    setIsLoading,
  ] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getAccountsAsync()
  }, [])

  const columns: ColumnDef<Accounts>[] = [
    {
      header: `Name`,
      id: `lastName`,
      accessorFn: (row) => row.lastName,
      enableSorting: true,
      enableColumnFilter: true,
      minSize: 300,
      cell: ({
        row, 
      }) => {
        const {
          firstName, lastName, middleName, isBlocked,
        } = row.original
        return (
          <div className={clsx(`account-management-page__account`, {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {lastName}
            {` `}
            {firstName}
            {` `}
            {middleName || ``}
          </div>
        )
      },
    },
    {
      header: `Roles`,
      id: `roles`,
      accessorFn: (row) => row.roles,
      cell: ({
        row, 
      }) => {
        const {
          roles, isBlocked, 
        } = row.original
        return (
          <span className={clsx(`account-management-page__account`, {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {roles.map((role, index) => (
              <span key={role.id}>
                {index > 0 ? `, ${role.name}` : role.name}
              </span>
            ))}
          </span>
        )
      },
    },
    {
      header: `Corporate Email`,
      id: `corporateEmail`,
      accessorFn: (row) => row.corporateEmail,
      minSize: 300,
      cell: ({
        row, 
      }) => {
        const {
          corporateEmail, isBlocked, 
        } = row.original
        return (
          <span className={clsx(`account-management-page__account`, {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {corporateEmail}
          </span>
        )
      },
    },
    {
      header: `Tenant`,
      id: `tenantName`,
      accessorFn: (row) => row.tenantName,
      enableSorting: true,
      minSize: 300,
      cell: ({
        row, 
      }) => {
        const {
          tenantName, isBlocked, 
        } = row.original
        return (
          <span
            className={clsx(`account-management-page__account`, {
              'account-management-page__account--isBlocked': isBlocked,
            })}
            data-cy="accounts-page-tenant-column"
          >
            {tenantName}
          </span>
        )
      },
    },
    {
      header: `Creation date (UTC)`,
      id:`creationDate`,
      accessorFn: (row) => row.creationDate,
      enableSorting: true,
      minSize: 250,
      cell: ({
        row, 
      }) => {
        const {
          creationDate, isBlocked, 
        } = row.original
        const formattedDate = moment(creationDate)
          .format(`DD.MM.YYYY HH:mm`)

        return (
          <span className={clsx(`account-management-page__account`, {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {formattedDate}
          </span>
        )
      },
    },
    {
      header: `Status`,
      id: `isBlocked`,
      accessorFn: (row) => row.isBlocked, 
      cell: ({
        row, 
      }) => {
        const {
          isBlocked, 
        } = row.original

        return (
          <div
            className="account-management-page__status"
            data-cy="accounts-page-status-column"
          >
            {!isBlocked ? `Active` : `Blocked`}
          </div>
        )
      },
    },
  ]

  const actions: ActionsType<Accounts> = [
    {
      name: `edit`,
      show: (row) => {
        const {
          isBlocked, canChangeAccountState, 
        } = row.original

        return !isBlocked && canChangeAccountState
      },
      renderText: () => `Edit`,
      onClick: (_e, row) => navigate(`/account-management/accounts/edit/${row.original.id}`),
    },
    {
      name: `block`,
      show: (row) => {
        const {
          isBlocked, canChangeAccountState, 
        } = row.original

        return !isBlocked && canChangeAccountState
      },
      renderText: () => `Block`,
      onClick: (_e, row) => blockAccountsAsync(row.original.id),
    },
    {
      name: `unblock`,
      show: (row) => {
        const {
          isBlocked, canChangeAccountState, 
        } = row.original

        console.log(`isBlocked && canChangeAccountState`, isBlocked && canChangeAccountState)
        console.log(`canChangeAccountState`, canChangeAccountState)

        return isBlocked && canChangeAccountState
      },
      renderText: () => `Unblock`,
      onClick: (_e, row) => {
        unblockAccountsAsync(row.original.id)
        toast.dismiss(row.original.id)
      },
    },
  ]

  return (
    <section className="account-management-page"
      data-cy="accounts-page-content">
      <h1 className="heading">Account`s list</h1>

      <div className="account-management-page__inner">
        <FilterMenu />

        {accessToChanges.accessPermissions.get(`ManageAccounts`) && (
          <button
            type="button"
            className="account-management-page__button"
            onClick={() => navigate(`/account-management/accounts/add`)}
          >
            + Add New Account
          </button>
        )}
      </div>
     
      <ClientTable<Accounts>
        tableId="account-table"
        data={accountManagementState.allAccounts}
        tcRenderMobileTitle={(row) => row.original.lastName}
        tcOrder={{
          id: `lastName`,
          desc: false,
        }}
        tcActions={accessToChanges.accessPermissions.get(`ManageAccounts`) ? actions : []}
        columns={columns}
        tcLoading={isLoading}
      />

    </section>
  )

  async function getAccountsAsync() {
    setIsLoading(true)
    try {
      const {
        data, 
      } = await api.get<Accounts[]>(`${LINK_TO_ACCOUNT_SERVICE}accounts/all`)
      accountManagementState.getAccounts(data)
    }
    finally {
      setIsLoading(false)
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
}

// eslint-disable-next-line import/no-default-export
export default observer(AccountsPageContent)
