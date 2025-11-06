import { createContext } from 'react'
import { CreateTenantState } from './CreateTenantState'

export const CreateTenantStateContext = createContext<CreateTenantState>(null as unknown as CreateTenantState)
