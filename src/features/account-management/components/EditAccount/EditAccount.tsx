import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, CheckField, Button } from '@tourmalinecore/react-tc-ui-kit';
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config';
import { api } from '../../../../common/api';

import { ReactComponent as IconEmail } from '../../../../assets/icons/icon-email.svg';

function EditAccount() {
  const navigation = useNavigate();
  const { id } = useParams();

  const [account, setAccount] = useState<AccountEdit>({
    corporateEmail: '',
    firstName: '',
    middleName: '',
    lastName: '',
    roles: [],
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set<string>([]));
  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [rolesData, setRolesData] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    getEditAccountLoad();
  }, []);

  return (
    <section data-cy="edit-account" className="edit-account">
      <h1 className="heading edit-account__title">Edit Account</h1>

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
          <span>First Name*</span>
          <Input
            data-cy="first-name"
            validationMessages={['This first name is required. Please fill it up.']}
            value={account.firstName}
            isInvalid={!account.firstName && triedToSubmit}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount({ ...account, firstName: event.target.value.trim() })}
            maxLength={50}
          />
        </div>

        <div className="edit-account__box">
          <div>
            <div>Middle Name</div>
            <div className="edit-account__available">(if available)</div>
          </div>
          <Input
            data-cy="middle-name"
            value={account.middleName ?? ''}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount({ ...account, middleName: event.target.value.trim() })}
            maxLength={50}
          />
        </div>

        <div className="edit-account__box">
          <span>Last Name*</span>
          <Input
            data-cy="last-name"
            validationMessages={['This last name is required. Please fill it up.']}
            value={account.lastName}
            isInvalid={!account.lastName && triedToSubmit}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setAccount({ ...account, lastName: event.target.value.trim() })}
            maxLength={50}
          />
        </div>

        <div className="edit-account__box">
          <span>Role*</span>
          <div className="edit-account__roles">
            {Object.entries(rolesData).map(([value, label]) => (
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
            className="edit-account__button"
            data-cy="cancel-button"
            onClick={() => navigation('/account-management')}
          >
            Cancel
          </Button>

          <Button
            className="edit-account__button"
            data-cy="save-button"
            onClick={() => editAccountAsync()}
          >
            Save Changes
          </Button>
        </div>

      </div>
    </section>
  );

  async function getEditAccountLoad() {
    const { data } = await api.get<AccountEdit>(`${LINK_TO_ACCOUNT_SERVICE}accounts/findById/${id}`);
    const { data: roles } = await api.get<{
      id: number, name: string, permissions: []
    }[]>(`${LINK_TO_ACCOUNT_SERVICE}roles`);

    setAccount(data);
    setSelectedCheckboxes(new Set([...data.roles.map((role) => String(role.id))]));
    setRolesData(Object.assign({}, ...roles.map((role) => ({ [role.id]: role.name }))));
  }

  async function editAccountAsync() {
    setTriedToSubmit(true);

    if (account.firstName && account.lastName && [...selectedCheckboxes].length > 0) {
      try {
        await api.post(`${LINK_TO_ACCOUNT_SERVICE}accounts/edit`, {
          id,
          firstName: account.firstName,
          middleName: account.middleName ? account.middleName : null,
          lastName: account.lastName,
          roles: [...selectedCheckboxes].map((item) => Number(item)),
        });

        navigation('/account-management');
        setTriedToSubmit(false);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export default EditAccount;
