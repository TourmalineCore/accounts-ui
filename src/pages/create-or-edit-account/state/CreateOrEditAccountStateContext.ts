import { createContext } from 'react'
import { CreateOrEditAccountState } from './CreateOrEditAccountState'

export const CreateOrEditAccountStateContext = createContext<CreateOrEditAccountState>(null as unknown as CreateOrEditAccountState)
