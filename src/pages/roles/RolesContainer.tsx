import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RolesContent } from './RolesContent'
import { RolesManagementStateContext } from './state/roles-page/RolesManagementStateContext'
import { api } from '../../common/api'
import { LINK_TO_ACCOUNT_SERVICE } from '../../common/config/config'

export const RolesContainer = observer(() => {
  const rolesManagementStateContext = useContext(RolesManagementStateContext)

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <RolesContent
      onAddRoleClick={() => rolesManagementStateContext.addNewRole()}
      onCancelClick={() => rolesManagementStateContext.cancelRoleEditing()}
      onSaveClick={saveChangesToRole}
    />
  )

  async function getRoles() {
    const {
      data, 
    } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    rolesManagementStateContext.initialize({
      loadedRoles: data, 
    })
  }

  async function saveChangesToRole() {
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
    getRoles()
  }
})
