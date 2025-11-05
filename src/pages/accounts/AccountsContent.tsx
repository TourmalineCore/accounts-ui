import moment from 'moment'
import clsx from 'clsx'
import { ActionsType, ClientTable } from '@tourmalinecore/react-table-responsive'
import { observer } from 'mobx-react-lite'
import { ColumnDef } from '@tanstack/table-core'
import { FilterMenu } from './components/filter-menu/FilterMenu'
import { AccessBasedOnPemissionsStateContext } from '../../routes/state/AccessBasedOnPemissionsStateContext'
import { useContext } from 'react'
import { AccountManagementStateContext } from './state/AccountManagementStateContext'

export const AccountsContent = observer(({
  accounts,
  onBlockAccount,
  onUnblockAccount,
}: {
  accounts: Accounts[],
  onBlockAccount: (accountId: number) => void,
  onUnblockAccount: (accountId: number) => void,
}) => {
  const accessToChanges = useContext(AccessBasedOnPemissionsStateContext)
  const accountManagementState = useContext(AccountManagementStateContext)
  
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
          isBlocked,
          canChangeAccountState,
        } = row.original

        return !isBlocked && canChangeAccountState
      },
      renderText: () => `Edit`,
      onClick: (_e, row) => window.location.href = `/account-management/accounts/edit/${row.original.id}`,
    },
    {
      name: `block`,
      show: (row) => {
        const {
          isBlocked,
          canChangeAccountState,
        } = row.original

        return !isBlocked && canChangeAccountState
      },
      renderText: () => `Block`,
      onClick: (_e, row) => onBlockAccount(row.original.id),
    },
    {
      name: `unblock`,
      show: (row) => {
        const {
          isBlocked,
          canChangeAccountState,
        } = row.original

        return isBlocked && canChangeAccountState
      },
      renderText: () => `Unblock`,
      onClick: (_e, row) => {
        onUnblockAccount(row.original.id)
      },
    },
  ]

  const handleAddAccount = () => {
    window.location.assign(`/account-management/accounts/add`)
  }

  return (
    <section
      className="account-management-page"
      data-cy="accounts-page-content"
    >
      <h1 className="heading">Account's list</h1>

      <div className="account-management-page__inner">
        <FilterMenu />

        {accessToChanges.accessPermissions.get(`ManageAccounts`) && (
          <button
            type="button"
            className="account-management-page__button"
            onClick={handleAddAccount}
          >
            + Add New Account
          </button>
        )}
      </div>
     
      <ClientTable<Accounts>
        tableId="account-table"
        data={accounts}
        tcRenderMobileTitle={(row) => row.original.lastName}
        tcOrder={{
          id: `lastName`,
          desc: false,
        }}
        tcActions={accessToChanges.accessPermissions.get(`ManageAccounts`) ? actions : []}
        columns={columns}
        tcLoading={accountManagementState.isLoading}
      />
    </section>
  )
})