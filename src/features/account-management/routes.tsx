import { ReactComponent as IconAnalytics } from '../../assets/icons/analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/analytics-active.svg';

import AccountManagementPage from './AccountManagementPage';
import CreateAccount from './components/CreateAccount/CreateAccount';

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
];

export const accountManagementSidebarRoutes = [
  {
    path: '/',
    label: 'Account management',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
];
