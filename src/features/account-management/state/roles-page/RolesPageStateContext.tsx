import { createContext } from 'react'
import {RolesPageState} from './RolesPageState'

export const RolesPageStateContext = createContext<RolesPageState>(null as unknown as RolesPageState)
