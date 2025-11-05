import {useContext} from 'react'

import { ClientTable } from '@tourmalinecore/react-table-responsive'
import { observer } from 'mobx-react-lite'
import { TenantsStateContext } from './state/TenantsStateContext'
import { ColumnDef } from '@tanstack/table-core'

export const TenantsContent = observer(() => {
  const tenantManagementState = useContext(TenantsStateContext)

  const columns: ColumnDef<Tenants>[] = [
    {
      header: `Name`,
      id: `name`,
      accessorFn: (row) => row.name,
      minSize: 300,
      cell: ({
        row, 
      }) => {
        const {
          name, 
        } = row.original
        return (
          <span data-cy="tenant-table-row">
            {name}
          </span>
        )
      },
    },
  ]

  return (
    <section className="accounts-page"
      data-cy="tenants-page-content">
      <h1 className="heading">Tenant`s list</h1>

      <div className="accounts-page__inner">
        <div />
        <button
          type="button"
          className="accounts-page__button"
          data-cy="tenants-page-content-button"
          onClick={() => (window.location.href = `/account-management/tenants/add`)}
        >
          + Add New Tenant
        </button>

      </div>

      <ClientTable<Tenants>
        tableId="tenant-table"
        data={tenantManagementState.allTenants}
        tcRenderMobileTitle={(row) => row.original.name}
        tcOrder={{
          id: `name`,
          desc: false,
        }}
        columns={columns}
        tcLoading={tenantManagementState.isLoading}
      />

    </section>
  )
})
