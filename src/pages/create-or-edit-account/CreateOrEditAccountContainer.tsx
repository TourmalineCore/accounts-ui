import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { CreateOrEditAccountStateContext } from './state/CreateOrEditAccountStateContext'
import { CreateOrEditAccountContent } from './CreateOrEditAccountContent'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export const CreateOrEditAccountContainer = observer(() => {
  const createOrEditAccountState = useContext(CreateOrEditAccountStateContext)

  const {
    id, 
  } = useParams()
  const isEditMode = !!id

  useEffect(() => {
    if (isEditMode) {
      getEditAccountLoadAsync()
    }
    else {
      getRolesAccountLoadAsync()
      getTenantsAccountLoadAsync()
      createOrEditAccountState.setIsEditMode(false)
    }
  }, [])

  return (
    <CreateOrEditAccountContent
      createAccountAsync={createAccountAsync} 
      editAccountAsync={editAccountAsync} 
    />
  )

  async function getEditAccountLoadAsync() {
    const { 
      data,
    } = await api.get<AccountEdit>(`${LINK_TO_ACCOUNT_SERVICE}accounts/findById/${id}`)
    const { 
      data: roles,
    } = await api.get<{
      id: number, name: string, permissions: [],
    }[]>(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    createOrEditAccountState.setAccountData(data)
    createOrEditAccountState.setSelectedCheckboxes(new Set([
      ...data.roles.map((role) => String(role.id)),
    ]))
    createOrEditAccountState.setRolesData(Object.assign({}, ...roles.map((role) => ({
      [role.id]: role.name, 
    }))))
    createOrEditAccountState.setIsEditMode(true)
  }

  async function editAccountAsync() {
    createOrEditAccountState.setIsTriedToSubmit(true)

    const { accountData, selectedCheckboxes } = createOrEditAccountState
    const { firstName, lastName, middleName } = accountData
    const selectedRoles = [...selectedCheckboxes]

    const isRequiredFieldsFilledIn = firstName && lastName && selectedRoles.length > 0
    
    if (isRequiredFieldsFilledIn) {
      try {
        await api.post(`${LINK_TO_ACCOUNT_SERVICE}accounts/edit`, {
          id: id,
          firstName,
          middleName: middleName ? middleName : null,
          lastName,
          roles: selectedRoles.map((item) => Number(item)),
        })

        window.location.href = `/account-management`
        
        createOrEditAccountState.setIsTriedToSubmit(false)
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }

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

    const { accountData, selectedCheckboxes } = createOrEditAccountState
    const { firstName, lastName, corporateEmail, middleName, tenantId } = accountData
    const selectedRoles = [...selectedCheckboxes]

    const isRequiredFieldsFilledIn = firstName && lastName && corporateEmail && 
      selectedRoles.length > 0 && tenantId

    if (isRequiredFieldsFilledIn) {
      try {
        await api.post<AccountCreate>(`${LINK_TO_ACCOUNT_SERVICE}accounts/create`, {
          ...accountData,
          corporateEmail: `${corporateEmail}@tourmalinecore.com`,
          middleName: middleName || undefined,
          roleIds: selectedRoles.map((item) => Number(item)),
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