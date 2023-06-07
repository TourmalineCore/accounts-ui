import { ReactComponent as IconAnalytics } from '../../assets/icons/icon-analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/icon-analytics-active.svg';

import CreateAccount from './components/CreateAccount/CreateAccount';
import RolesPage from './RolesPage';
import EditAccount from './components/EditAccount/EditAccount';

import AccountsPage from './AccountsPage';

export const accountManagementRoutes = [
  {
    path: '/accounts/add',
    breadcrumb: 'Add an employee',
    Component: CreateAccount,
  },
  {
    path: '/accounts/edit/:id',
    breadcrumb: 'Edit an employee',
    Component: EditAccount,
  },
];

export const accountRoutes = [
  {
    path: '/accounts',
    breadcrumb: 'Accounts',
    Component: AccountsPage,
  },
  {
    path: '/',
    breadcrumb: 'Account management',
    Component: AccountManagementPage,
  },
];

export const roleRoutes = [
  {
    path: '/roles',
    breadcrumb: 'Roles',
    Component: RolesPage,
  },
];

export const sidebarAccountManagements : {
  path: string;
  label: string,
  icon: JSX.Element,
  iconActive: JSX.Element,
  routes: {
    path: string,
    label: string,
    iconMini: JSX.Element,
  }[]
} = {
  path: '/',
  label: 'Account management',
  icon: <IconAnalytics />,
  iconActive: <IconAnalyticsActive />,
  routes: [],
};

export const sidebarRoles = {
  path: '/account-management/roles',
  label: 'Roles',
  iconMini: <IconAnalyticsActive />,
};

export const sidebarAccounts = {
  path: '/account-management/accounts',
  label: 'Accounts',
  iconMini: <IconAnalyticsActive />,
};
