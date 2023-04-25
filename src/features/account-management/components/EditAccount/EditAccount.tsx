import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, CheckField, Button } from '@tourmalinecore/react-tc-ui-kit';
import ContentCard from '../../../../components/ContentCard/ContentCard';
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config';
import { api } from '../../../../common/api';

import { ReactComponent as IconEmail } from '../../../../assets/icons/icon-email.svg';
import { AccountEdit } from '../../types';

const checkFieldsData = {
  Admin: 'Admin',
  CEO: 'CEO',
  Manager: 'Manager',
  Employee: 'Employee',
};

function EditAccount() {
  const { id } = useParams();

  // @ts-ignore
  const [account, setAccount] = useState<AccountEdit>({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set<string>([]));
  const [triedToSubmit, setTriedToSubmit] = useState(false);

  useEffect(() => {
    getEditAccountLoad();
  }, []);

  return (
    <ContentCard>
      <section data-cy="edit-account" className="edit-account">
        <h1 className="edit-account__title">Edit Account</h1>

        <div className="edit-account__inner">
          <div className="edit-account__info-box">
            <div className="edit-account__icon">
              <IconEmail />
            </div>

            <div
              data-cy="corporate-email"
              className="edit-account__email"
            >
              {account.corporateEmail}
            </div>
          </div>

          <div className="edit-account__box">
            <span>First Name</span>
            <Input
              data-cy="first-name"
              validationMessages={['This first name is required. Please fill it up.']}
              value={account.firstName}
              isInvalid={!account.firstName && triedToSubmit}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount({ ...account, firstName: event.target.value.trim() })}
            />
          </div>

          <div className="edit-account__box">
            <div>
              <div>Middle Name</div>
              <div className="edit-account__available">(if available)</div>
            </div>
            <Input
              data-cy="middle-name"
              value={account.middleName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount({ ...account, middleName: event.target.value.trim() })}
            />
          </div>

          <div className="edit-account__box">
            <span>Last Name</span>
            <Input
              data-cy="last-name"
              validationMessages={['This last name is required. Please fill it up.']}
              value={account.lastName}
              isInvalid={!account.lastName && triedToSubmit}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount({ ...account, lastName: event.target.value.trim() })}
            />
          </div>

          <div className="edit-account__box">
            <span>Role</span>
            <div className="edit-account__roles">
              {Object.entries(checkFieldsData).map(([value, label]) => (
                <CheckField
                  key={value}
                  style={{
                    marginBottom: 16,
                  }}
                  data-cy="role"
                  label={label}
                  checked={selectedCheckboxes.has(value)}
                  value={value}
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

              <div className="edit-account__error-roles">
                {[...selectedCheckboxes].length === 0 && triedToSubmit && (
                  <>
                    Select at least one role
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="edit-account__inner-button">
            <Button
              data-cy="cancel-button"
            >
              Cancel
            </Button>

            <Button
              data-cy="save-button"
              onClick={() => editAccountAsync()}
            >
              Save Changes
            </Button>
          </div>

        </div>
      </section>
    </ContentCard>
  );

  async function getEditAccountLoad() {
    const { data } = await api.get<AccountEdit>(`${LINK_TO_ACCOUNT_SERVICE}accounts/${id || 1}`);

    setAccount(data);
    setSelectedCheckboxes(new Set([...data.roles.map(({ name }) => name)]));
  }

  async function editAccountAsync() {
    setTriedToSubmit(true);

    try {
      await api.post(`${LINK_TO_ACCOUNT_SERVICE}accounts/edit`, {
        id,
        firstName: account.firstName,
        middleName: account.middleName,
        lastName: account.lastName,
        roles: [...selectedCheckboxes].map((item) => item),
      });

      setTriedToSubmit(false);
    } catch (e) {
      console.log(e);
    }
  }
}

export default EditAccount;
