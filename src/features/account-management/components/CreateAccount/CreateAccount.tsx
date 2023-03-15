import { Input, Button, CheckField } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../../../common/api';
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config';

import ContentCard from '../../../../components/ContentCard/ContentCard';
import { AccountCreate } from '../../types';

const checkFieldsData = {
  1: 'Admin',
  2: 'CEO',
  3: 'Manager',
  4: 'Employee',
};

function CreateAccount() {
  const history = useNavigate();

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set(['4']));
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    corporateEmail: '',
  });

  const isCorporateEmailError = !formData.corporateEmail && triedToSubmit;

  return (
    <ContentCard>
      <div className="create-account">
        <h1 className="create-account__title">Add New Account</h1>

        <div className="create-account__inner">
          <div className="create-account__box">
            <span>First Name</span>
            <Input
              value={formData.firstName}
              isInvalid={!formData.firstName && triedToSubmit}
              validationMessages={['This field is required. Please fill it up.']}
              isMessagesAbsolute
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value.trim() })}
            />
          </div>

          <div className="create-account__box">
            <span>Middle Name</span>
            <Input
              value={formData.middleName}
              isMessagesAbsolute
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, middleName: e.target.value.trim() })}
            />
          </div>

          <div className="create-account__box">
            <span>Last Name</span>
            <Input
              value={formData.lastName}
              isInvalid={!formData.lastName && triedToSubmit}
              validationMessages={['This field is required. Please fill it up.']}
              isMessagesAbsolute
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value.trim() })}
            />
          </div>

          <div className="create-account__box">
            <span>Corporate Email</span>
            <div>
              <div className="create-account__input-domain">
                <Input
                  className={clsx('create-account__input', {
                    'create-account__input--error': !isCorporateEmailError,
                  })}
                  value={formData.corporateEmail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, corporateEmail: e.target.value.trim() })}
                />
                <span>@tourmalinecore.com</span>
              </div>
              <div className={clsx('create-account__important-info', {
                'create-account__important-info--error': isCorporateEmailError,
              })}
              >
                {!isCorporateEmailError ? (
                  <>
                    <b>Сheck the entered data</b>
                    , it will be impossible to edit this field.
                  </>
                ) : (<>Account with such Corpotare Email is already exists. Check the correctness of the entered data, it must be unique.</>)}
              </div>
            </div>
          </div>

          <div className="create-account__box">
            <span>Role</span>
            <div>
              {Object.entries(checkFieldsData).map(([value, label]) => (
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
                        return new Set([...prevSelected].filter((x) => x !== value));
                      }

                      return new Set([...prevSelected, value]);
                    });
                  }}
                />
              ))}
            </div>
          </div>

          <div className="create-account__inner-button">
            <Button
              onClick={() => history('/account-management')}
            >
              Cancel
            </Button>

            <Button
              onClick={() => createAccountAsync()}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </ContentCard>
  );

  async function createAccountAsync() {
    setTriedToSubmit(true);

    try {
      await api.post<AccountCreate>(`${LINK_TO_ACCOUNT_SERVICE}accounts/create`, {
        ...formData,
        corporateEmail: `${formData.corporateEmail}@tourmalinecore.com`,
        middleName: formData.middleName || undefined,
        roleIds: [...selectedCheckboxes].map((item) => Number(item)),
      });

      setTriedToSubmit(false);
      history('/account-management');

      toast('New account added successfully', {
        type: 'success',
        position: 'bottom-center',
        autoClose: 5000,
        pauseOnHover: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default CreateAccount;
