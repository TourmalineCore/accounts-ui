import { Input } from '@tourmalinecore/react-tc-ui-kit'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config'

export function CreateTenant() {

  const [
    triedToSubmit,
    setTriedToSubmit,
  ] = useState(false)
  const [
    formData,
    setFormData,
  ] = useState({
    name: ``,
  })

  return (
    <div className="create-tenant"
      data-cy="create-tenant-page">
      <h1 className="heading create-tenant__title">Add New Tenant</h1>

      <div className="create-tenant__inner">
        <div className="create-tenant__box">
          <span>Name</span>
          <Input
            data-cy="create-tenant-page-input"
            value={formData.name}
            isInvalid={!formData.name && triedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              name: e.target.value.trim(), 
            })}
          />
        </div>
        <div className="create-tenant__inner-button">
          <button
            type="button"
            data-cy="create-tenant-page-button-cancel"
            className="create-account__button"
            onClick={() => window.location.href =`/account-management/tenants`}
          >
            Cancel
          </button>

          <button
            type="button"
            data-cy="create-tenant-page-button-add"
            className="create-account__button"
            onClick={() => createTenantAsync()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )

  async function createTenantAsync() {
    setTriedToSubmit(true)

    if (formData.name) {
      try {
        await api.post<TenantCreate>(`${LINK_TO_ACCOUNT_SERVICE}tenants`, {
          ...formData,
        })

        setTriedToSubmit(false)
        window.location.href = `/account-management/tenants`

        toast(`New tenant added successfully`, {
          type: `success`,
          position: `bottom-center`,
          autoClose: 5000,
          pauseOnHover: false,
        })
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }
}
