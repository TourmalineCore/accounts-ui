import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RolesContent } from './RolesContent'
import { RolesPageStateContext } from './state/roles-page/RolesPageStateContext'
import { LINK_TO_ACCOUNT_SERVICE } from '../../../common/config/config'
import { api } from '../../../common/api'

export const RolesContainer = observer(() => {
  const rolesPageStateContext = useContext(RolesPageStateContext)

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <RolesContent
      onAddRoleClick={() => rolesPageStateContext.addNewRole()}
      onCancelClick={() => rolesPageStateContext.cancelRoleEditing()}
      onSaveClick={saveChangesToRole}
    />
  )

  async function getRoles() {
    const {
      data, 
    } = await api.get(`${LINK_TO_ACCOUNT_SERVICE}roles`)

    rolesPageStateContext.initialize({
      loadedRoles: data, 
    })
  }

  async function saveChangesToRole() {
    if (rolesPageStateContext.updatedRole?.id === 0) {
      const {
        name, permissions, 
      } = rolesPageStateContext.updatedRole

      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/create`, {
        name,
        permissions, 
      })
    }
    else {
      await api.post(`${LINK_TO_ACCOUNT_SERVICE}roles/edit`, rolesPageStateContext.updatedRole)
    }

    rolesPageStateContext.cancelRoleEditing()
    getRoles()
  }
})
