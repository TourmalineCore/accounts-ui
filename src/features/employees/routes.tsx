import IconEmployees from '../../assets/icons/icon-employees.svg?react'
import IconEmployeesActive from '../../assets/icons/icon-employees-active.svg?react'

export const employeesSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `employees`,
    label: `Employees`,
    icon: <IconEmployees />,
    iconActive: <IconEmployeesActive />,
  },
]
