/* eslint-disable react/no-unstable-nested-components */
import {
  MouseEventHandler, useEffect, useMemo, useState,
} from 'react';

import moment from 'moment';
import clsx from 'clsx';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { api } from '../../common/api';
import { Table } from '../../types';
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config';

import ContentCard from '../../components/ContentCard/ContentCard';
import FilterMenu from './components/FilterMenu/FilterMenu';
import AccountManagementState from './context/AccountManagementState';
import AccountManagementStateContext from './context/AccountManagementStateContext';

export type Row<TypeProps> = {
  original: TypeProps;
  values: TypeProps;
};

function AccountManagementPage() {
  const accountManagementState = useMemo(() => new AccountManagementState(), []);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAccountsAsync();
  }, []);

  const columns = [
    {
      Header: 'Name',
      accessor: 'lastName',
      Cell: ({ row }: Table<Accounts>) => {
        const {
          firstName, lastName, middleName, isBlocked,
        } = row.original;
        return (
          <div className={clsx('account-management-page__account', {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {lastName}
            {' '}
            {middleName || ''}
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
        const { roles, isBlocked } = row.original;
        return (
          <span className={clsx('account-management-page__account', {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {roles.map((role, index) => (
              <span key={role.id}>
                {index > 0 ? `, ${role.name}` : role.name}
              </span>
            ))}
          </span>
        );
      },
    },
    {
      Header: 'Corporate Email',
      accessor: 'corporateEmail',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }: Table<Accounts>) => {
        const { corporateEmail, isBlocked } = row.original;
        return (
          <span className={clsx('account-management-page__account', {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {corporateEmail}
          </span>
        );
      },
    },
    {
      Header: 'Creation date (UTC)',
      accessor: 'creationDate',
      disableFilters: true,
      Cell: ({ row }: Table<Accounts>) => {
        const { creationDate, isBlocked } = row.original;
        const formattedDate = moment(creationDate).format('DD.MM.YYYY HH:mm');

        return (
          <span className={clsx('account-management-page__account', {
            'account-management-page__account--isBlocked': isBlocked,
          })}
          >
            {formattedDate}
          </span>
        );
      },
    },
    {
      Header: 'Status',
      accessor: 'isBlocked',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }: Table<Accounts>) => {
        const { isBlocked } = row.original;

        return (<div className="account-management-page__status">{!isBlocked ? 'Active' : 'Blocked'}</div>);
      },
    },
  ];

  const actions = [
    {
      name: 'edit',
      show: (row: Row<Accounts>) => {
        const { isBlocked } = row.original;
        return !isBlocked;
      },
      renderText: () => 'Edit',
      onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<Accounts>) => navigate(`/account-management/edit/${row.original.id}`),
    },
    {
      name: 'block',
      show: (row: Row<Accounts>) => {
        const { isBlocked } = row.original;
        return !isBlocked;
      },
      renderText: () => 'Block',
      onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<Accounts>) => blockAccountsAsync(row.original.id),
    },
    {
      name: 'unblock',
      show: (row: Row<Accounts>) => {
        const { isBlocked } = row.original;
        return isBlocked;
      },
      renderText: () => 'Unblock',
      onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<Accounts>) => {
        unblockAccountsAsync(row.original.id);
        toast.dismiss(row.original.id);
      },
    },
  ];

  return (
    <AccountManagementStateContext.Provider value={accountManagementState}>
      <ContentCard className="account-management-page">
        <h1>Account`s list</h1>

        <div className="account-management-page__inner">
          <FilterMenu />

          <Button
            style={{ marginBottom: 20 }}
            onClick={() => navigate('/account-management/add')}
          >
            Add New Account
          </Button>
        </div>

        <ClientTable
          tableId="account-table"
          data={accountManagementState.allAccounts}
          renderMobileTitle={(row: Row<{ lastName: string }>) => row.original.lastName}
          order={{
            id: 'lastName',
            desc: false,
          }}
          actions={actions}
          columns={columns}
          isLoading={isLoading}
        />

      </ContentCard>
    </AccountManagementStateContext.Provider>
  );

  async function getAccountsAsync() {
    setIsLoading(true);
    try {
      const { data } = await api.get<Accounts[]>(`${LINK_TO_ACCOUNT_SERVICE}accounts/all`);
      accountManagementState.getAccounts(data);
    } finally {
      setIsLoading(true);
    }
  }

  async function blockAccountsAsync(accountId: number) {
    // remove all notifications, it is necessary to delete the previous notification
    toast.dismiss();

    toast(() => (
      <div className="account-management-page__notification">
        {accountManagementState.accountToUnblock?.middleName ? (
          <span>
            {`${accountManagementState.accountToUnblock?.lastName}
              ${accountManagementState.accountToUnblock?.firstName} 
              ${accountManagementState.accountToUnblock?.middleName}`}
          </span>
        ) : (
          <span>
            {`${accountManagementState.accountToUnblock?.firstName} ${accountManagementState.accountToUnblock?.lastName}`}
          </span>
        )}

        <button
          type="button"
          className="account-management-page__unblock-button"
          onClick={() => {
            toast.dismiss(accountManagementState.accountToUnblock!.id);
            unblockAccountsAsync(accountManagementState.accountToUnblock!.id);
          }}
        >
          Unblock
        </button>
      </div>
    ), {
      position: 'top-center',
      type: 'info',
      icon: false,
      toastId: accountId,
    });

    accountManagementState.blockAccount({ accountId });
    await api.post<Accounts[]>(`${LINK_TO_ACCOUNT_SERVICE}accounts/${accountId}/block`);
  }

  async function unblockAccountsAsync(accountId: number) {
    accountManagementState.unblockAccont({ accountId });
    await api.post<Accounts[]>(`${LINK_TO_ACCOUNT_SERVICE}accounts/${accountId}/unblock`);
  }
}

export default observer(AccountManagementPage);
