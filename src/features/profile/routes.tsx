import IconProfile from '../../assets/icons/icon-profile.svg?react'
import IconProfileActive from '../../assets/icons/icon-profile-active.svg?react'

export const profileSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `employees/profile`,
    label: `Profile`,
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  },
]
