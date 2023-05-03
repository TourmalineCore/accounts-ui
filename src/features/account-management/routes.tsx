import { ReactComponent as IconAnalytics } from '../../assets/icons/analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/analytics-active.svg';

import AccountManagementPage from './AccountManagementPage';
import CreateAccount from './components/CreateAccount/CreateAccount';
import RolesPage from './RolesPage';

export const accountManagementRoutes = [
  {
    path: '/',
    breadcrumb: 'Account management',
    Component: AccountManagementPage,
  },
  {
    path: '/add',
    breadcrumb: 'Add an employee',
    Component: CreateAccount,
  },
  {
    path: '/roles',
    breadcrumb: 'Roles',
    Component: RolesPage,
  },
];

export const accountManagementSidebarRoutes = [
  {
    path: '/',
    label: 'Account management',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
    routes: [
      {
        path: '/account-management/roles',
        label: 'Roles',
        iconMini: <IconAnalyticsActive />,
      },
    ],
  },

];
