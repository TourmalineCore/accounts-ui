import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { CreateTenantStateContext } from './state/CreateTenantStateContext'
import { CreateTenantContent } from './CreateTenantContent'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import { toast } from 'react-toastify'

export const CreateTenantContainer = observer(() => {
  const createTenantState = useContext(CreateTenantStateContext)

  return (
    <CreateTenantContent 
      createTenantAsync={createTenantAsync} 
    />
  )

  async function createTenantAsync() {
    createTenantState.setIsTriedToSubmit()

    if (createTenantState.tenantData.name) {
      try {
        await api.post<TenantCreate>(`${LINK_TO_ACCOUNT_SERVICE}tenants`, {
          ...createTenantState.tenantData,
        })

        window.location.href = `/account-management/tenants`

        toast(`New tenant added successfully`, {
          type: `success`,
          position: `bottom-center`,
          autoClose: 5000,
          pauseOnHover: false,
        })
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      finally {
        createTenantState.resetIsTriedToSubmit()
      }
    }
  }
})