import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { CreateOrEditAccountContent } from './CreateOrEditAccountContent'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import { toast } from 'react-toastify'

export const CreateOrEditAccountContainer = observer(() => {
  const createOrEditAccountState = useContext(CreateOrEditAccountStateContext)

  useEffect(() => {
    getRolesAccountLoadAsync()
  }, [])

  useEffect(() => {
    getTenantsAccountLoadAsync()
  }, [])

  return (
    <CreateOrEditAccountContent
      createAccountAsync={createAccountAsync} 
    />
  )

  async function getRolesAccountLoadAsync() {
    const {
      data,
    } = await api.get<{
      id: number, name: string, permissions: [],
    }[]>(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    createOrEditAccountState.setRolesData(Object.assign({}, ...data.map((role) => ({
      [role.id]: role.name,
    }))))
  }

  async function getTenantsAccountLoadAsync() {
    const {
      data,
    } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}tenants/all`)

    createOrEditAccountState.setTenantsData(data)
  }

  async function createAccountAsync() {
    createOrEditAccountState.setIsTriedToSubmit(true)

    if (createOrEditAccountState.accountData.firstName && createOrEditAccountState.accountData.lastName && createOrEditAccountState.accountData.corporateEmail && [
      ...createOrEditAccountState.selectedCheckboxes,
    ].length > 0 && createOrEditAccountState.accountData.tenantId) {
      try {
        await api.post<AccountCreate>(`${LINK_TO_ACCOUNT_SERVICE}accounts/create`, {
          ...createOrEditAccountState.accountData,
          corporateEmail: `${createOrEditAccountState.accountData.corporateEmail}@tourmalinecore.com`,
          middleName: createOrEditAccountState.accountData.middleName || undefined,
          roleIds: [
            ...createOrEditAccountState.selectedCheckboxes,
          ].map((item) => Number(item)),
        })

        createOrEditAccountState.setIsTriedToSubmit(false)
        window.location.href = `/account-management`

        toast(`New account added successfully`, {
          type: `success`,
          position: `bottom-center`,
          autoClose: 5000,
          pauseOnHover: false,
        })
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        createOrEditAccountState.setIsError(true)
      }
    }
  }
})