import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { CreateAccountStateContext } from './state/CreateAccountStateContext'
import { CreateAccountContent } from './CreateAccountContent'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'

export const CreateAccountContainer = observer(() => {
  const createAccountState = useContext(CreateAccountStateContext)

  useEffect(() => {
    getRolesAccountLoadAsync()
  }, [])

  useEffect(() => {
    getTenantsAccountLoadAsync()
  }, [])

  return (
    <CreateAccountContent />
  )

  async function getRolesAccountLoadAsync() {
    const {
      data
    } = await api.get<{
      id: number, name: string, permissions: []
    }[]>(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    createAccountState.setRolesData(Object.assign({}, ...data.map((role) => ({
      [role.id]: role.name,
    }))))
  }

  async function getTenantsAccountLoadAsync() {
    const {
      data
    } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}tenants/all`)

    createAccountState.setTenantsData(data)
  }
})