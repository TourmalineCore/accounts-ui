import {
  Input, Button, CheckField,
} from '@tourmalinecore/react-tc-ui-kit';
import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../common/api';

import ContentCard from '../../../../components/ContentCard/ContentCard';
import { AccountContext } from '../../../../common/context/AccountContex';

const checkFieldsData = {
  1: 'Admin',
  2: 'CEO',
  3: 'Manager',
  4: 'Employee',
};

function CreateAccount() {
  const history = useNavigate();

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set(['4']));
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    corporateEmail: '',
  });

  const { setIsCreateAccount } = useContext(AccountContext);

  return (
    <ContentCard>
      <div className="create-account">
        <h1 className="create-account__title">Add New Account</h1>

        <div className="create-account__box">
          <span className="create-account__label">First Name</span>
          <Input
            type="text"
            value={form.firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className="create-account__box">
          <span className="create-account__label">Last Name</span>
          <Input
            type="text"
            value={form.lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div className="create-account__box">
          <span className="create-account__label">Corporate Email</span>
          <div className="create-account__input-domain">
            <Input
              type="text"
              value={form.corporateEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, corporateEmail: e.target.value })}
            />
            <span>@tourmalinecore.com</span>
          </div>
        </div>

        <div className="create-account__box">
          <span className="create-account__label">Role</span>
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
            onClick={() => {
              createAccountAsync();
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </ContentCard>
  );

  async function createAccountAsync() {
    try {
      await api.post('/accounts/create', {
        ...form,
        corporateEmail: `${form.corporateEmail}@tourmalinecore.com`,
        roleIds: [...selectedCheckboxes].map((item) => Number(item)),
      });

      history('/account-management');
      setIsCreateAccount(true);
    } catch (e) {
      console.log(e);
    }
  }
}

export default CreateAccount;
