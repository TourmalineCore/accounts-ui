import {
  MouseEvent, useContext,
} from 'react';
// import { useSearchParams } from 'react-router-dom';

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

  // const [params, setParams] = useSearchParams();

  // useEffect(() => {
  //   if (accountManagementState.filterTerm === 'blank' && !accountManagementState.isBlankEmployees) {
  //     params.delete('filter');
  //     setParams(params, {
  //       replace: true,
  //     });
  //   }
  // }, [accountManagementState.isBlankEmployees, accountManagementState.filterTerm]);

  // useEffect(() => {
  //   accountManagementState.updateFilterTerm(params.get('filter') || 'current');
  // }, [accountManagementState.filterTerm]);

  return (
    <div className="filter-menu">
      {filterElements.map((item) => (
        <Button
          type="button"
          className={clsx({
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
