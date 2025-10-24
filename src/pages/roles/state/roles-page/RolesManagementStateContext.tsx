import { createContext } from 'react'
import {RolesManagementState} from './RolesManagementState'

export const RolesManagementStateContext = createContext<RolesManagementState>(null as unknown as RolesManagementState)
