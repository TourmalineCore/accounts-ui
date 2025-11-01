import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { TenantsContent } from './TenantsContent'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'
import { TenantManagementStateContext } from './state/TenantManagementStateContext'

export const TenantsContainer = observer(() => {
  const tenantManagementState = useContext(TenantManagementStateContext)

  useEffect(() => {
    getTenantsAsync()
  }, [])

  return (
    <TenantsContent />
  )
  async function getTenantsAsync() {
    tenantManagementState.setIsLoading()
    try {
      const {
        data, 
      } = await api.get<Tenants[]>(`${LINK_TO_ACCOUNT_SERVICE}tenants/all`)
      tenantManagementState.getTenants({
        newTenant: data,
      })
    }
    finally {
      tenantManagementState.resetIsLoading()
    }
  }
})
