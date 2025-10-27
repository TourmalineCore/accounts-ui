import { Input, CheckField } from '@tourmalinecore/react-tc-ui-kit'
import clsx from 'clsx'
import { ChangeEvent, useContext } from 'react'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { observer } from 'mobx-react-lite'

export const CreateOrEditAccountContent = observer(({
  createAccountAsync,
} : {
  createAccountAsync: () => unknown,
}) => {
  const createOrEditAccountState = useContext(CreateOrEditAccountStateContext)

  const isCorporateEmailError = !createOrEditAccountState.accountData.corporateEmail && createOrEditAccountState.isTriedToSubmit

  return (
    <div className="create-account"
      data-cy="create-account-page"
    >
      <h1 className="heading create-account__title">!!!Add New Account!!!</h1>

      <div className="create-account__inner">
        <div className="create-account__box">
          <span>First Name</span>
          <Input
            data-cy="create-account-page-input-firstName"
            value={createOrEditAccountState.accountData.firstName}
            isInvalid={!createOrEditAccountState.accountData.firstName && createOrEditAccountState.isTriedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
              ...createOrEditAccountState.accountData,
              firstName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-account__box">
          <span>Middle Name</span>
          <Input
            data-cy="create-account-page-input-middleName"
            value={createOrEditAccountState.accountData.middleName}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
              ...createOrEditAccountState.accountData,
              middleName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-account__box">
          <span>Last Name</span>
          <Input
            data-cy="create-account-page-input-lastName"
            value={createOrEditAccountState.accountData.lastName}
            isInvalid={!createOrEditAccountState.accountData.lastName && createOrEditAccountState.isTriedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
              ...createOrEditAccountState.accountData,
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
                  'create-account__input--error': !isCorporateEmailError || createOrEditAccountState.isError,
                })}
                value={createOrEditAccountState.accountData.corporateEmail}
                maxLength={31}
                onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
                  ...createOrEditAccountState.accountData,
                  corporateEmail: e.target.value.trim(), 
                })}
              />
              <span>@tourmalinecore.com</span>
            </div>
            <div className={clsx(`create-account__important-info`, {
              'create-account__important-info--error': isCorporateEmailError || createOrEditAccountState.isError,
            })}
            >
              {isCorporateEmailError && (
                <>
                  <span>This field is required. Please fill it up.</span>
                  <br />
                </>
              )}
              {!createOrEditAccountState.isError ? (
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
            {Object.entries(createOrEditAccountState.rolesData)
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
                  checked={createOrEditAccountState.selectedCheckboxes.has(value)}
                  onChange={() => {
                    createOrEditAccountState.toggleCheckbox(value)
                  }}
                />
              ))}

            <div className="create-account__error-message">
              {[
                ...createOrEditAccountState.selectedCheckboxes,
              ].length === 0 && createOrEditAccountState.isTriedToSubmit && (
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
            value={createOrEditAccountState.accountData.tenantId}
            onChange={(e) => createOrEditAccountState.setAccountData({
              ...createOrEditAccountState.accountData,
              tenantId: e.target.value.trim(), 
            })}
          >
            <option
              value=""
              disabled
            >
              Select tenant
            </option>
            {createOrEditAccountState.tenantsData.length !== 0
              ? createOrEditAccountState.tenantsData.map(({
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
            onClick={() => window.location.href =`/account-management`}
          >
            Cancel
          </button>

          <button
            type="button"
            data-cy="create-account-page-button-add"
            className="create-account__button"
            onClick={createAccountAsync}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
  
})