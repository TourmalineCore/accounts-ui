import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { TenantsContent } from './TenantsContent'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import { TenantManagementStateContext } from './state/TenantManagementStateContext'

export const TenantsContainer = observer(() => {
  const [
    isLoading,
    setIsLoading,
  ] = useState(false)
  const tenantManagementState = useContext(TenantManagementStateContext)

  useEffect(() => {
    getTenantsAsync()
  }, [])

  return (
    <TenantsContent isLoading={isLoading} />
  )
  async function getTenantsAsync() {
    setIsLoading(true)
    try {
      const {
        data, 
      } = await api.get<Tenants[]>(`${LINK_TO_ACCOUNT_SERVICE}tenants/all`)
      tenantManagementState.getTenants(data)
    }
    finally {
      setIsLoading(false)
    }
  }
})
