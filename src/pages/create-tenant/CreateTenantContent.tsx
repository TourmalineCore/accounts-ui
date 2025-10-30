import { Input } from '@tourmalinecore/react-tc-ui-kit'
import { ChangeEvent, useContext } from 'react'
import { CreateTenantStateContext } from './state/CreateTenantStateContext'
import { observer } from 'mobx-react-lite'

export const CreateTenantContent = observer(({ 
  createTenantAsync,
}: {
  createTenantAsync: () => unknown,
}) => {
  const createTenantState = useContext(CreateTenantStateContext)

  return (
    <div className="create-tenant"
      data-cy="create-tenant-page"
    >
      <h1 className="heading create-tenant__title">Add New Tenant</h1>

      <div className="create-tenant__inner">
        <div className="create-tenant__box">
          <span>Name</span>
          <Input
            data-cy="create-tenant-page-input"
            value={createTenantState.tenantData.name}
            isInvalid={!createTenantState.tenantData.name && createTenantState.isTriedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createTenantState.setTenantData({
              ...createTenantState.tenantData,
              name: e.target.value.trim(), 
            })}
          />
        </div>
        <div className="create-tenant__inner-button">
          <button
            type="button"
            data-cy="create-tenant-page-button-cancel"
            className="primary-button"
            onClick={() => window.location.href =`/account-management/tenants`}
          >
            Cancel
          </button>

          <button
            type="button"
            data-cy="create-tenant-page-button-add"
            className="primary-button"
            onClick={createTenantAsync}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
})