import { ReactComponent as IconAnalytics } from '../../assets/icons/analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/analytics-active.svg';
import AccountManagementPage from './AccountManagementPage';

export const accountManagementRoutes = [
  {
    path: '/account-management',
    breadcrumb: 'Account management',
    Component: AccountManagementPage,
  },
];

export const accountManagementSidebarRoutes = [
  {
    path: '/account-management',
    label: 'Account management',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
];
