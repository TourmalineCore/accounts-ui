import { ReactComponent as IconAnalytics } from '../../assets/icons/analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/analytics-active.svg';

import CreateAccount from './components/CreateAccount/CreateAccount';
import RolesPage from './RolesPage';
import EditAccount from './components/EditAccount/EditAccount';

import {
  getAccessRights,
  parseJwt,
} from '../../common/utils/utilsForPermissions';
import AccountsPage from './AccountsPage';
import NotFoundPage from '../not-found/NotFoundPage';
import { authService } from '../../common/authService';

function routerPermissions() {
  const token = authService.getAuthToken();

  let arr: any[] = [];
  console.log('routerPermissions', getAccessRights(parseJwt(token).permissions));
  switch (getAccessRights(parseJwt(token).permissions)) {
    case 'full access':
      arr = [
        {
          path: '/roles',
          breadcrumb: 'Roles',
          Component: RolesPage,
        },
        {
          path: '/accounts',
          breadcrumb: 'Accounts',
          Component: AccountsPage,
        },
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
      break;
    case 'full access to accounts':
      arr = [
        {
          path: '/accounts',
          breadcrumb: 'Accounts',
          Component: AccountsPage,
        },
        {
          path: '/add',
          breadcrumb: 'Add an employee',
          Component: CreateAccount,
        },
        {
          path: '/edit/:id',
          breadcrumb: 'Edit an employee',
          Component: EditAccount,
        },
      ];
      break;
    case 'limited access to accounts':
      arr = [
        {
          path: '/accounts',
          breadcrumb: 'Accounts',
          Component: AccountsPage,
        },
      ];
      break;
    case 'limited access to accounts and roles':
      arr = [
        {
          path: '/roles',
          breadcrumb: 'Roles',
          Component: RolesPage,
        },
        {
          path: '/accounts',
          breadcrumb: 'Accounts',
          Component: AccountsPage,
        },
      ];
      break;
    case 'limited access to roles':
      arr = [
        {
          path: '/roles',
          breadcrumb: 'Roles',
          Component: RolesPage,
        },
      ];
      break;
    case 'no access':
      arr = [];
      break;
    default:
      arr = [];
  }

  return arr;
}

export const accountManagementRoutes = [
  {
    path: '/',
    breadcrumb: 'Account management',
    Component: NotFoundPage,
  },
  ...routerPermissions(),
];

function routerSidebarPermissions() {
  const token = authService.getAuthToken();

  let arr: any[] = [];
  console.log('routerSidebarPermissions', getAccessRights(parseJwt(token).permissions));
  switch (getAccessRights(parseJwt(token).permissions)) {
    case 'full access':
    case 'limited access to accounts and roles':
      arr = [
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
            {
              path: '/account-management/accounts',
              label: 'Accounts',
              iconMini: <IconAnalyticsActive />,
            },
          ],
        },
      ];
      break;
    case 'full access to accounts':
    case 'limited access to accounts':
      arr = [
        {
          path: '/',
          label: 'Account management',
          icon: <IconAnalytics />,
          iconActive: <IconAnalyticsActive />,
          routes: [
            {
              path: '/account-management/accounts',
              label: 'Accounts',
              iconMini: <IconAnalyticsActive />,
            },
          ],
        },
      ];
      break;
    case 'limited access to roles':
      arr = [
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
      break;
    case 'no access':
      arr = [];
      break;
    default:
      arr = [];
  }

  return arr;
}

export const accountManagementSidebarRoutes = routerSidebarPermissions();
