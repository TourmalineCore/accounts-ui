/* eslint-disable no-else-return */
/* eslint-disable prefer-object-spread */
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { profileSidebarRoutes } from '../features/profile/routes';
// import { SidebarRoutesProps } from '../types';
import { employeesSidebarRoutes } from '../features/employees/routes';
import { analyticsSidebarRoutes } from '../features/analytics/routes';
import {
  accountManagementRoutes,
  // accountManagementRoutess,
  accountManagementSidebarRoutes,
  sidebarAccountManagements,
  sidebarAccounts,
  sidebarRoles,
  // accountRoutes,
  // roleRoutes,
} from '../features/account-management/routes';
import { SidebarRoutesProps } from '../types';
import { Permission } from './state/RoutesState';
// import { notFoundRoutes } from '../features/not-found/routes';

export const adminRoutes: {
  path: string;
  breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
  Component: () => JSX.Element;
}[] = [
  ...accountManagementRoutes,
];

export const sidebarRoutes: SidebarRoutesProps[] = [
  ...profileSidebarRoutes,
  ...analyticsSidebarRoutes,
  ...employeesSidebarRoutes,
  ...accountManagementSidebarRoutes,
];

// export function checkSidebarRoutes(objAccess: { [key in keyof typeof Permission]: boolean }) {

export function checkSidebarRoutes(objAccess: Map<keyof typeof Permission, boolean>) {
  const arr: any[] = [];

  // const copyAccountManagement = { ...sidebarAccountManagements };

  // const copyAccountManagement = Object.assign({}, sidebarAccountManagements);

  const copyAccountManagement = JSON.parse(JSON.stringify(sidebarAccountManagements));

  console.log('copyAccountManagement sidebarAccountManagements', { ...sidebarAccountManagements });
  console.log('copyAccountManagement', copyAccountManagement);

  // if (objAccess.get('ViewAccounts')) {
  //   arr.unshift(...accountRoutes);
  // }

  // if (objAccess.get('ManageAccounts')) {
  //   arr.unshift(...accountManagementRoutess);
  // }

  // if (objAccess.get('ViewRoles')) {
  //   arr.unshift(...roleRoutes);
  // }

  if (objAccess.get('AccessAnalyticalForecastsPage')) {
    arr.unshift(...analyticsSidebarRoutes);
  }

  if (objAccess.get('ViewPersonalProfile')) {
    arr.unshift(...profileSidebarRoutes);
  }

  if (objAccess.get('ViewContacts') || objAccess.get('ViewSalaryAndDocumentsData')) {
    arr.unshift(...employeesSidebarRoutes);
  }

  if (objAccess.get('ViewAccounts') && objAccess.get('ViewRoles')) {
    // copyAccountManagement.routes.push(sidebarAccounts);
    arr.unshift(copyAccountManagement.routes.push(sidebarAccounts, sidebarRoles));

    return arr;
  } else if (objAccess.get('ViewAccounts')) {
    // arr.unshift(copyAccountManagement.routes.push(sidebarAccounts));

    return arr;
  } else if (objAccess.get('ViewRoles')) {
    // copyAccountManagement.routes.push(sidebarRoles);

    // arr.unshift(sidebarAccountManagements.routes.push(sidebarAccounts, sidebarRoles));

    // arr.unshift(copyAccountManagement.routes.push(sidebarRoles));

    return arr;
  }

  console.log('copyAccountManagement.routes.push(sidebarAccounts, sidebarRoles)', copyAccountManagement);
  return arr;
}
