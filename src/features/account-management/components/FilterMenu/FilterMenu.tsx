import {
  MouseEvent, useContext,
} from 'react';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import AccountManagementStateContext from '../../context/AccountManagementStateContext';

const filterElements = [
  {
    id: 'all',
    name: 'View All',
  },
  {
    id: 'active',
    name: 'Active Accounts',
  },
  {
    id: 'block',
    name: 'Blocked Accounts',
  },
];

function FilterMenu() {
  const accountManagementState = useContext(AccountManagementStateContext);

  return (
    <div className="filter-menu">
      {filterElements.map((item) => (
        <Button
          type="button"
          className={clsx('filter-menu__button', {
            'filter-menu__button-active': item.id === accountManagementState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={(event: MouseEvent<HTMLButtonElement>) => accountManagementState.updateFilterTerm(event.currentTarget.id)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default observer(FilterMenu);
