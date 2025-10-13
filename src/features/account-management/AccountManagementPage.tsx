import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function AccountManagementPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/account-management/accounts`)
  }, [])

  return (
    <div>AccountManagementPage</div>
  )
}
