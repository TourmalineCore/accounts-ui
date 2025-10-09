import IconEmployees from '../../assets/icons/icon-employees.svg?react';
import IconEmployeesActive from '../../assets/icons/icon-employees-active.svg?react';
import { LINK_TO_DASHBOARD } from '../../common/config/config';

export const employeesSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}employees`,
    label: 'Employees',
    icon: <IconEmployees />,
    iconActive: <IconEmployeesActive />,
  },
];
