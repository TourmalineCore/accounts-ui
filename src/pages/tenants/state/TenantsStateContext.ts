import { createContext } from 'react'
import { TenantsState } from './TenantsState'

export const TenantsStateContext = createContext<TenantsState>(null as unknown as TenantsState)
