import { ActionsType, ClientTable } from '@tourmalinecore/react-table-responsive'
import { observer } from 'mobx-react-lite'
import { FilterMenu } from '../FilterMenu/FilterMenu'
import { useContext } from 'react'
import { AccessBasedOnPemissionsStateContext } from '../../../routes/state/AccessBasedOnPemissionsStateContext'
import { AccountManagementStateContext } from './state/AccountManagementStateContext'
import { ColumnDef } from '@tanstack/table-core'

export const AccountsContent = observer(({ 
  actions,
  columns,
  isLoading
  }: {
    actions: ActionsType<Accounts>
    columns: ColumnDef<Accounts>[]
    isLoading: boolean
  }
) => {
    const accountManagementStateContext = useContext(AccountManagementStateContext)
    const accessToChanges = useContext(AccessBasedOnPemissionsStateContext)

    return (
      <section
          className="account-management-page"
          data-cy="accounts-page-content"
        >
          <h1 className="heading">Account`s list</h1>
    
          <div className="account-management-page__inner">
            <FilterMenu />
    
            {accessToChanges.accessPermissions.get(`ManageAccounts`) && (
              <button
                type="button"
                className="account-management-page__button"
                onClick={() => window.location.href = `/account-management/accounts/add`}
              >
                + Add New Account
              </button>
            )}
          </div>
        
          <ClientTable<Accounts>
            tableId="account-table"
            data={accountManagementStateContext.allAccounts}
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
  }
)
    