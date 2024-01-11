import { ReactComponent as IconAccountManagement } from '../../assets/icons/icon-account-management.svg';

import CreateAccount from './components/CreateAccount/CreateAccount';
import RolesPage from './RolesPage';
import EditAccount from './components/EditAccount/EditAccount';

import AccountsPage from './AccountsPage';
import AccountManagementPage from './AccountManagementPage';

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
    breadcrumb: 'Management',
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
  label: 'Management',
  icon: <IconAccountManagement />,
  iconActive: <IconAccountManagement />,
  routes: [],
};

export const sidebarRoles = {
  path: '/account-management/roles',
  label: 'Roles',
  iconMini: <IconAccountManagement />,
};

export const sidebarAccounts = {
  path: '/account-management/accounts',
  label: 'Accounts',
  iconMini: <IconAccountManagement />,
};
