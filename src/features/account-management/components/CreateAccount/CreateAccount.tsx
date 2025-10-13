import { Input, CheckField } from '@tourmalinecore/react-tc-ui-kit'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../../../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config'
// import { Tenants } from '../Tenants/Tenants';

export function CreateAccount() {
  const history = useNavigate()

  const [
    triedToSubmit,
    setTriedToSubmit,
  ] = useState(false)
  const [
    selectedCheckboxes,
    setSelectedCheckboxes,
  ] = useState(new Set<string>([]))
  const [
    formData,
    setFormData,
  ] = useState({
    firstName: ``,
    lastName: ``,
    middleName: ``,
    corporateEmail: ``,
    tenantId: ``,
  })

  const [
    rolesData,
    setRolesData,
  ] = useState<{ [key: number]: string, }>({})

  const [
    tenantsData,
    setTenantsData,
  ] = useState < Tenants[] >([])

  const isCorporateEmailError = !formData.corporateEmail && triedToSubmit

  const [
    hasError,
    setHasError,
  ] = useState(false)

  useEffect(() => {
    getRolesAccountLoad()
  }, [])

  useEffect(() => {
    getTenantsAccountLoad()
  }, [])

  return (
    <div className="create-account"
      data-cy="create-account-page">
      <h1 className="heading create-account__title">Add New Account</h1>

      <div className="create-account__inner">
        <div className="create-account__box">
          <span>First Name</span>
          <Input
            data-cy="create-account-page-input-firstName"
            value={formData.firstName}
            isInvalid={!formData.firstName && triedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              firstName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-account__box">
          <span>Middle Name</span>
          <Input
            data-cy="create-account-page-input-middleName"
            value={formData.middleName}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              middleName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-account__box">
          <span>Last Name</span>
          <Input
            data-cy="create-account-page-input-lastName"
            value={formData.lastName}
            isInvalid={!formData.lastName && triedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
              ...formData,
              lastName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-account__box create-account__box--email">
          <span>Corporate Email</span>
          <div>
            <div className="create-account__input-domain">
              <Input
                data-cy="create-account-page-input-email"
                className={clsx(`create-account__input`, {
                  'create-account__input--error': !isCorporateEmailError || hasError,
                })}
                value={formData.corporateEmail}
                maxLength={31}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({
                  ...formData,
                  corporateEmail: e.target.value.trim(), 
                })}
              />
              <span>@tourmalinecore.com</span>
            </div>
            <div className={clsx(`create-account__important-info`, {
              'create-account__important-info--error': isCorporateEmailError || hasError,
            })}
            >
              {isCorporateEmailError && (
                <>
                  <span>This field is required. Please fill it up.</span>
                  <br />
                </>
              )}
              {!hasError ? (
                <>
                  <b>Сheck the entered data</b>
                  , it will be impossible to edit this field.
                </>
              ) : (<>Account with such Corpotare Email already exists. Check the correctness of the entered data, it must be unique.</>)}
            </div>
          </div>
        </div>

        <div className="create-account__box">
          <span>Role</span>
          <div data-cy="create-account__role-checkbox">
            {Object.entries(rolesData)
              .map(([
                value,
                label,
              ]) => (
                <CheckField
                  key={value}
                  style={{
                    marginBottom: 16,
                  }}
                  label={label}
                  checked={selectedCheckboxes.has(value)}
                  onChange={() => {
                    setSelectedCheckboxes((prevSelected) => {
                      if (prevSelected.has(value)) {
                        return new Set([
                          ...prevSelected,
                        ].filter((x) => x !== value))
                      }
                      return new Set([
                        ...prevSelected,
                        value,
                      ])
                    })
                  }}
                />
              ))}

            <div className="create-account__error-message">
              {[
                ...selectedCheckboxes,
              ].length === 0 && triedToSubmit && (
                <>
                  Select at least one role
                </>
              )}
            </div>
          </div>
        </div>

        <div className="create-account__box">
          <span>Tenant</span>
          <select
            data-cy="create-account-page-select-tenant"
            className="create-account__select"
            defaultValue=""
            value={formData.tenantId}
            onChange={(e) => setFormData({
              ...formData,
              tenantId: e.target.value.trim(), 
            })}
          >
            <option
              value=""
              disabled
            >
              Select tenant
            </option>
            {tenantsData.length !== 0
              ? tenantsData.map(({
                id, name, 
              }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))
              : (
                <option>
                  No tenants
                </option>
              )}
          </select>
        </div>

        <div className="create-account__inner-button">
          <button
            type="button"
            data-cy="create-account-page-button-cancel"
            className="create-account__button"
            onClick={() => history(`/account-management`)}
          >
            Cancel
          </button>

          <button
            type="button"
            data-cy="create-account-page-button-add"
            className="create-account__button"
            onClick={() => createAccountAsync()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )

  async function getRolesAccountLoad() {
    const {
      data, 
    } = await api.get<{
      id: number, name: string, permissions: [],
    }[]>(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    setRolesData(Object.assign({}, ...data.map((role) => ({
      [role.id]: role.name, 
    }))))
  }

  async function getTenantsAccountLoad() {
    const {
      data, 
    } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}tenants/all`)

    setTenantsData(data)
  }

  async function createAccountAsync() {
    setTriedToSubmit(true)

    if (formData.firstName && formData.lastName && formData.corporateEmail && [
      ...selectedCheckboxes,
    ].length > 0 && formData.tenantId) {
      try {
        await api.post<AccountCreate>(`${LINK_TO_ACCOUNT_SERVICE}accounts/create`, {
          ...formData,
          corporateEmail: `${formData.corporateEmail}@tourmalinecore.com`,
          middleName: formData.middleName || undefined,
          roleIds: [
            ...selectedCheckboxes,
          ].map((item) => Number(item)),
        })

        setTriedToSubmit(false)
        history(`/account-management`)

        toast(`New account added successfully`, {
          type: `success`,
          position: `bottom-center`,
          autoClose: 5000,
          pauseOnHover: false,
        })
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        setHasError(true)
      }
    }
  }
}
