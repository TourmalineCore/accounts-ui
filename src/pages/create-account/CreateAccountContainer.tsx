import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { CreateAccountStateContext } from './state/CreateAccountStateContext'
import { CreateAccountContent } from './CreateAccountContent'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import { toast } from 'react-toastify'

export const CreateAccountContainer = observer(() => {
  const createAccountState = useContext(CreateAccountStateContext)

  useEffect(() => {
    getRolesAccountLoadAsync()
  }, [])

  useEffect(() => {
    getTenantsAccountLoadAsync()
  }, [])

  return (
    <CreateAccountContent
      createAccountAsync={createAccountAsync} 
    />
  )

  async function getRolesAccountLoadAsync() {
    const {
      data,
    } = await api.get<{
      id: number, name: string, permissions: [],
    }[]>(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    createAccountState.setRolesData(Object.assign({}, ...data.map((role) => ({
      [role.id]: role.name,
    }))))
  }

  async function getTenantsAccountLoadAsync() {
    const {
      data,
    } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}tenants/all`)

    createAccountState.setTenantsData(data)
  }

  async function createAccountAsync() {
    createAccountState.setIsTriedToSubmit(true)

    if (createAccountState.formData.firstName && createAccountState.formData.lastName && createAccountState.formData.corporateEmail && [
      ...createAccountState.selectedCheckboxes,
    ].length > 0 && createAccountState.formData.tenantId) {
      try {
        await api.post<AccountCreate>(`${LINK_TO_ACCOUNT_SERVICE}accounts/create`, {
          ...createAccountState.formData,
          corporateEmail: `${createAccountState.formData.corporateEmail}@tourmalinecore.com`,
          middleName: createAccountState.formData.middleName || undefined,
          roleIds: [
            ...createAccountState.selectedCheckboxes,
          ].map((item) => Number(item)),
        })

        createAccountState.setIsTriedToSubmit(false)
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
        createAccountState.setIsError(true)
      }
    }
  }
})