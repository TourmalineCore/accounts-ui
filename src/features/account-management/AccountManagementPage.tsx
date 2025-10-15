import { useEffect } from 'react'

export function AccountManagementPage() {

  useEffect(() => {
    window.location.href = `/account-management/accounts`
  }, [])

  return (
    <div>AccountManagementPage</div>
  )
}
