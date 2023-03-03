/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { ClientTable } from '@tourmalinecore/react-table-responsive';

import moment from 'moment';
import { api } from '../../common/api';

import ContentCard from '../../components/ContentCard/ContentCard';
import { Table } from '../../types';
import { Accounts } from './types';

function AccountManagementPage() {
  const history = useNavigate();

  const [accounts, setAccounts] = useState<Accounts[]>([]);

  useEffect(() => {
    getAccountsAsync();
  }, []);

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
      Header: 'Roles',
      accessor: 'roles',
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
          style={{ marginBottom: 20 }}
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
