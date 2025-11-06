import { createContext } from 'react'
import {RolesState} from './RolesState'

export const RolesStateContext = createContext<RolesState>(null as unknown as RolesState)
