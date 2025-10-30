import { Input, CheckField } from '@tourmalinecore/react-tc-ui-kit'
import clsx from 'clsx'
import { ChangeEvent, useContext } from 'react'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { observer } from 'mobx-react-lite'
import IconEmail from '../../assets/icons/icon-email.svg?react'

export const CreateOrEditAccountContent = observer(({
  createAccountAsync,
  editAccountAsync,
} : {
  createAccountAsync: () => unknown,
  editAccountAsync: () => unknown,
}) => {
  const createOrEditAccountState = useContext(CreateOrEditAccountStateContext)

  const isCorporateEmailError = !createOrEditAccountState.accountData.corporateEmail && createOrEditAccountState.isTriedToSubmit

  return (
    <div className="create-or-edit-account"
      data-cy={createOrEditAccountState.isEditMode ? `edit-account` : `create-account`}
    >
      <h1 className="heading create-or-edit-account__title">
        {createOrEditAccountState.isEditMode ? `Edit Account` : `Add New Account`}
      </h1>

      <div className="create-or-edit-account__inner">
        {createOrEditAccountState.isEditMode && (
          <div className="create-or-edit-account__info-box">
            <div className="create-or-edit-account__icon">
              <IconEmail />
            </div>
            <div 
              data-cy="corporate-email" 
              className="create-or-edit-account__email"
            >
              {createOrEditAccountState.accountData.corporateEmail}
            </div>
          </div>
        )}

        <div className="create-or-edit-account__box">
          <span>First Name*</span>
          <Input
            data-cy="first-name"
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

        <div className="create-or-edit-account__box">
          <span>Middle Name</span>
          <Input
            data-cy="middle-name"
            value={createOrEditAccountState.accountData.middleName}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
              ...createOrEditAccountState.accountData,
              middleName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-or-edit-account__box">
          <span>Last Name*</span>
          <Input
            data-cy="last-name"
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

        {!createOrEditAccountState.isEditMode && (
          <div className="create-or-edit-account__box create-or-edit-account__box--email">
            <span>Corporate Email</span>
            <div>
              <div className="create-or-edit-account__input-domain">
                <Input
                  data-cy="email-input"
                  className={clsx(`create-or-edit-account__input`, {
                    'create-or-edit-account__input--error': !isCorporateEmailError || createOrEditAccountState.isError,
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
              <div className={clsx(`create-or-edit-account__important-info`, {
                'create-or-edit-account__important-info--error': isCorporateEmailError || createOrEditAccountState.isError,
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
        )}

        <div className="create-or-edit-account__box">
          <span>Role*</span>
          <div data-cy="account-role-checkbox">
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

            <div className="create-or-edit-account__error-message">
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

        {!createOrEditAccountState.isEditMode && (
          <div className="create-or-edit-account__box">
            <span>Tenant</span>
            <select
              data-cy="select-tenant"
              className="create-or-edit-account__select"
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
        )}

        <div className="create-or-edit-account__inner-button">
          <button
            type="button"
            data-cy="cancel-button"
            className="create-or-edit-account__button"
            onClick={() => window.location.href =`/account-management`}
          >
            Cancel
          </button>

          <button
            type="button"
            data-cy={createOrEditAccountState.isEditMode ? `save-button` : `add-button`}
            className="create-or-edit-account__button"
            onClick={createOrEditAccountState.isEditMode ? editAccountAsync : createAccountAsync}
          >
            {createOrEditAccountState.isEditMode ? `Save Changes` : `Add`}
          </button>
        </div>
      </div>
    </div>
  )
})