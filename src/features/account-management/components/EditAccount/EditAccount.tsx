import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentCard from '../../../../components/ContentCard/ContentCard';
import { LINK_TO_ACCOUNT_SERVICE } from '../../../../common/config/config';
import { api } from '../../../../common/api';

type EditAccountType = {
  corporateEmail: string;
  firstName: string;
  lastName: string;
  middleName: string;
  roles: {
    id: number;
    name: string;
  }[]
};

function EditAccount() {
  const { id } = useParams();

  // @ts-ignore
  const [account, setAccount] = useState<EditAccountType>({});

  useEffect(() => {
    getEditAccountLoad();
  }, []);

  return (
    <ContentCard>
      <section data-cy="edit-account" />

      <span data-cy="corporate-email">{account.corporateEmail}</span>

    </ContentCard>
  );

  async function getEditAccountLoad() {
    const { data } = await api.get<EditAccountType>(`${LINK_TO_ACCOUNT_SERVICE}accounts/${id || 1}`);

    setAccount(data);
  }
}

export default EditAccount;
