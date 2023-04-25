import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, CheckField, Button } from '@tourmalinecore/react-tc-ui-kit';
import ContentCard from '../../../../components/ContentCard/ContentCard';
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config';
import { api } from '../../../../common/api';

type EditAccountType = {
  corporateEmail: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  roles: {
    id: number;
    name: string;
  }[]
};

const checkFieldsData = {
  Admin: 'Admin',
  CEO: 'CEO',
  Manager: 'Manager',
  Employee: 'Employee',
};

function EditAccount() {
  const { id } = useParams();

  // @ts-ignore
  const [account, setAccount] = useState<EditAccountType>({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(new Set<string>([]));

  useEffect(() => {
    getEditAccountLoad();
  }, []);

  return (
    <ContentCard>
      <section data-cy="edit-account" />

      <span data-cy="corporate-email">{account.corporateEmail}</span>

      <Input
        data-cy="first-name"
        value={account.firstName}
      />

      <Input
        data-cy="last-name"
        value={account.lastName}
      />

      <Input
        data-cy="middle-name"
        value={account.middleName}
      />

      <div className="roles">
        {Object.entries(checkFieldsData).map(([value, label]) => (
          <CheckField
            key={value}
            style={{
              marginBottom: 16,
            }}
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
      </div>

      <Button
        data-cy="cancel-button"
      >
        Cancel
      </Button>

      <Button
        data-cy="save-button"
      >
        Save Changes
      </Button>

    </ContentCard>
  );

  async function getEditAccountLoad() {
    const { data } = await api.get<EditAccountType>(`${LINK_TO_ACCOUNT_SERVICE}accounts/${id || 1}`);

    setAccount(data);
    setSelectedCheckboxes(new Set([...data.roles.map(({ name }) => name)]));
  }
}

export default EditAccount;
