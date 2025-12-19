import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { RolesContent } from './RolesContent'
import { RolesStateContext } from './state/RolesStateContext'
import { api } from '../../common/api'

export const RolesContainer = observer(() => {
  const rolesStateContext = useContext(RolesStateContext)

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
    } = await api.get(`/roles`)

    rolesStateContext.initialize({
      loadedRoles: data, 
    })
  }

  async function saveChangesToRoleAsync() {
    if (rolesStateContext.updatedRole?.id === 0) {
      const {
        name, permissions, 
      } = rolesStateContext.updatedRole

      await api.post(`/roles/create`, {
        name,
        permissions, 
      })
    }
    else {
      await api.post(`/roles/edit`, rolesStateContext.updatedRole)
    }

    rolesStateContext.cancelRoleEditing()
    getRolesAsync()
  }
})
