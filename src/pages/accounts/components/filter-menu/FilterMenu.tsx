
import {MouseEvent, useContext} from 'react'

import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { AccountsStateContext } from '../../state/AccountsStateContext'

const filterElements = [
  {
    id: `all`,
    name: `View All`,
  },
  {
    id: `active`,
    name: `Active Accounts`,
  },
  {
    id: `block`,
    name: `Blocked Accounts`,
  },
]

export const FilterMenu = observer(() => {
  const accountManagementState = useContext(AccountsStateContext)

  return (
    <div className="filter-menu">
      {filterElements.map((item) => (
        <button
          type="button"
          className={clsx(`filter-menu__button`, {
            'filter-menu__button--active': item.id === accountManagementState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={(event: MouseEvent<HTMLButtonElement>) => accountManagementState.updateFilterTerm(event.currentTarget.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
})