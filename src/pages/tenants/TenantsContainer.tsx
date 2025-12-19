import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { TenantsContent } from './TenantsContent'
import { api } from '../../common/api'
import { TenantsStateContext } from './state/TenantsStateContext'

export const TenantsContainer = observer(() => {
  const tenantsState = useContext(TenantsStateContext)

  useEffect(() => {
    getTenantsAsync()
  }, [])

  return (
    <TenantsContent />
  )
  async function getTenantsAsync() {
    tenantsState.setIsLoading()
    try {
      const {
        data, 
      } = await api.get<Tenants[]>(`/tenants/all`)
      tenantsState.getTenants({
        newTenant: data,
      })
    }
    finally {
      tenantsState.resetIsLoading()
    }
  }
})
