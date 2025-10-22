import { createContext } from 'react'
import {AccountManagementState} from './AccountManagementState'

export const AccountManagementStateContext = createContext<AccountManagementState>(null as unknown as AccountManagementState)
