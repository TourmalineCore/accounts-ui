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

  const { 
    accountData,
    isEditMode, 
    isTriedToSubmit,
    isError,
    rolesData, 
    selectedCheckboxes,
  } = createOrEditAccountState
  const { 
    firstName, 
    lastName, 
    corporateEmail,
    middleName, 
    tenantId, 
  } = accountData

  const isCorporateEmailError = !corporateEmail && isTriedToSubmit

  return (
    <div className="create-or-edit-account"
      data-cy={isEditMode ? `edit-account` : `create-account`}
    >
      <h1 className="heading create-or-edit-account__title">
        {isEditMode ? `Edit Account` : `Add New Account`}
      </h1>

      <div className="create-or-edit-account__inner">
        {isEditMode && (
          <div className="create-or-edit-account__info-box">
            <div className="create-or-edit-account__icon">
              <IconEmail />
            </div>
            <div 
              data-cy="corporate-email" 
              className="create-or-edit-account__email"
            >
              {corporateEmail}
            </div>
          </div>
        )}

        <div className="create-or-edit-account__box">
          <span>First Name*</span>
          <Input
            data-cy="first-name"
            value={firstName}
            isInvalid={!firstName && isTriedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
              ...accountData,
              firstName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-or-edit-account__box">
          <span>Middle Name</span>
          <Input
            data-cy="middle-name"
            value={middleName}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
              ...accountData,
              middleName: e.target.value.trim(), 
            })}
          />
        </div>

        <div className="create-or-edit-account__box">
          <span>Last Name*</span>
          <Input
            data-cy="last-name"
            value={lastName}
            isInvalid={!lastName && isTriedToSubmit}
            validationMessages={[
              `This field is required. Please fill it up.`,
            ]}
            isMessagesAbsolute
            maxLength={50}
            onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
              ...accountData,
              lastName: e.target.value.trim(), 
            })}
          />
        </div>

        {!isEditMode && (
          <div className="create-or-edit-account__box create-or-edit-account__box--email">
            <span>Corporate Email</span>
            <div>
              <div className="create-or-edit-account__input-domain">
                <Input
                  data-cy="email-input"
                  className={clsx(`create-or-edit-account__input`, {
                    'create-or-edit-account__input--error': !isCorporateEmailError || isError,
                  })}
                  value={corporateEmail}
                  maxLength={31}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => createOrEditAccountState.setAccountData({
                    ...accountData,
                    corporateEmail: e.target.value.trim(), 
                  })}
                />
                <span>@tourmalinecore.com</span>
              </div>
              <div className={clsx(`create-or-edit-account__important-info`, {
                'create-or-edit-account__important-info--error': isCorporateEmailError || isError,
              })}
              >
                {isCorporateEmailError && (
                  <>
                    <span>This field is required. Please fill it up.</span>
                    <br />
                  </>
                )}
                {!isError ? (
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
                    createOrEditAccountState.toggleCheckbox(value)
                  }}
                />
              ))}

            <div className="create-or-edit-account__error-message">
              {[
                ...selectedCheckboxes,
              ].length === 0 && isTriedToSubmit && (
                <>
                  Select at least one role
                </>
              )}
            </div>
          </div>
        </div>

        {!isEditMode && (
          <div className="create-or-edit-account__box">
            <span>Tenant</span>
            <select
              data-cy="select-tenant"
              className="create-or-edit-account__select"
              defaultValue=""
              value={tenantId}
              onChange={(e) => createOrEditAccountState.setAccountData({
                ...accountData,
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
            className="primary-button"
            onClick={() => window.location.href =`/account-management`}
          >
            Cancel
          </button>

          <button
            type="button"
            data-cy={isEditMode ? `save-button` : `add-button`}
            className="primary-button"
            onClick={isEditMode ? editAccountAsync : createAccountAsync}
          >
            {isEditMode ? `Save Changes` : `Add`}
          </button>
        </div>
      </div>
    </div>
  )
})