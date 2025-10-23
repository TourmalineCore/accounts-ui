import { createContext } from 'react'
import { CreateAccountState } from './CreateAccountState'

export const CreateAccountStateContext = createContext<CreateAccountState>(null as unknown as CreateAccountState)
