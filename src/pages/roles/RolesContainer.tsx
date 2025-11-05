import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RolesContent } from './RolesContent'
import { RolesStateContext } from './state/RolesStateContext'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'

export const RolesContainer = observer(() => {
  const rolesManagementStateContext = useContext(RolesStateContext)

  useEffect(() => {
    getRolesAsync()
  }, [])

  return (
    <RolesContent
      onSaveClick={saveChangesToRoleAsync}
    />
  )

  async function getRolesAsync() {
    const {
      data, 
    } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    rolesManagementStateContext.initialize({
      loadedRoles: data, 
    })
  }

  async function saveChangesToRoleAsync() {
    if (rolesManagementStateContext.updatedRole?.id === 0) {
      const {
        name, permissions, 
      } = rolesManagementStateContext.updatedRole

      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/create`, {
        name,
        permissions, 
      })
    }
    else {
      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/edit`, rolesManagementStateContext.updatedRole)
    }

    rolesManagementStateContext.cancelRoleEditing()
    getRolesAsync()
  }
})
