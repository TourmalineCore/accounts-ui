import { createContext } from 'react'
import {AccountsState} from './AccountsState'

export const AccountsStateContext = createContext<AccountsState>(null as unknown as AccountsState)
