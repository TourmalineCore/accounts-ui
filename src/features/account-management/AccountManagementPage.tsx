/* eslint-disable react/no-unstable-nested-components */
import React, {
  useContext, useEffect, useState,
} from 'react';
import {
  Button,
} from '@tourmalinecore/react-tc-ui-kit';
import { Modal } from '@tourmalinecore/react-tc-modal';

import {
  ClientTable,
} from '@tourmalinecore/react-table-responsive';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ContentCard from '../../components/ContentCard/ContentCard';
import { api } from '../../common/api';
import { AccountContext } from '../../common/context/AccountContex';

type Accounts = {
  id: number;
  corporateEmail: string;
  creationDate: Date;
  firstName: string;
  lastName: string;
  roles: {
    id: number;
    name: string;
  }[];
};

type Table<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

function AccountManagementPage() {
  const history = useNavigate();

  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const { isCreateAccount, setIsCreateAccount } = useContext(AccountContext);

  useEffect(() => {
    getAccountsAsync();
  }, []);

  useEffect(() => {
    if (isCreateAccount) {
      setTimeout(() => {
        setIsCreateAccount(false);
      }, 2000);
    }
  }, [isCreateAccount]);

  const columns = [
    {
      Header: 'Name',
      accessor: 'lastName',
      Cell: ({ row }: Table<Accounts>) => {
        const { firstName, lastName } = row.original;
        return (
          <div>
            {lastName}
            {' '}
            {firstName}
          </div>
        );
      },
    },
    {
      Header: 'Role',
      accessor: 'role',
      disableSortBy: true,
      disableFilters: true,
      Cell: ({ row }: Table<Accounts>) => {
        const { roles } = row.original;
        return (
          <div>
            {roles.map((role, index) => (
              <span key={role.id}>
                {index > 0 ? `, ${role.name}` : role.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      Header: 'Corporate Email',
      accessor: 'corporateEmail',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Creation date (UTC)',
      accessor: 'creationDate',
      disableFilters: true,
      Cell: ({ row }: Table<Accounts>) => {
        const { creationDate } = row.original;

        const formattedDate = moment(creationDate).format('DD.MM.YYYY HH:mm');

        return (<div>{formattedDate}</div>);
      },
    },
  ];

  return (
    <ContentCard>
      <div className="account-management-page">
        <h1>Account`s list</h1>
        <Button
          style={{
            marginBottom: 20,
          }}
          onClick={() => history('/account-management/add')}
        >
          Add New Account
        </Button>

        <ClientTable
          tableId="account-table"
          data={accounts}
          order={{
            id: 'lastName',
            desc: false,
          }}
          actions={[]}
          columns={columns}
        />

        {isCreateAccount && (
          <Modal
            content={(
              <div style={{ textAlign: 'center' }}>New account added successfully</div>
            )}
            showApply={false}
            onClose={() => setIsCreateAccount(false)}
          />
        )}

      </div>
    </ContentCard>
  );

  async function getAccountsAsync() {
    try {
      const { data } = await api.get<Accounts[]>('/accounts/all');

      setAccounts(data);
    } catch (e) {
      console.log(e);
    }
  }
}

export default AccountManagementPage;
