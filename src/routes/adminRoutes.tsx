/* eslint-disable prefer-object-spread */
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { profileSidebarRoutes } from '../features/profile/routes';
import { employeesSidebarRoutes } from '../features/employees/routes';
import { analyticsSidebarRoutes } from '../features/analytics/routes';
import {
  accountManagementRoutes,
  accountRoutes,
  roleRoutes,
  sidebarAccountManagements,
  sidebarAccounts,
  sidebarRoles,
} from '../features/account-management/routes';
import { SidebarRoutesProps } from '../types';
import { Permission } from './state/RoutesState';

export function getAdminRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[] = [];

  if (accessPermissions.get('ViewAccounts')) {
    routes.push(...accountRoutes);
  }

  if (accessPermissions.get('ManageAccounts')) {
    routes.push(...accountManagementRoutes);
  }

  if (accessPermissions.get('ViewRoles')) {
    routes.push(...roleRoutes);
  }

  return routes;
}

export function getSidebarRoutes(accessPermissions: Map<keyof typeof Permission, boolean>) {
  const routes: SidebarRoutesProps[] = [];

  const copyAccountManagement = Object.assign({}, sidebarAccountManagements);

  if (accessPermissions.get('ViewPersonalProfile')) {
    routes.push(...profileSidebarRoutes);
  }

  if (accessPermissions.get('AccessAnalyticalForecastsPage')) {
    routes.push(...analyticsSidebarRoutes);
  }

  if (accessPermissions.get('ViewContacts') || accessPermissions.get('ViewSalaryAndDocumentsData')) {
    routes.push(...employeesSidebarRoutes);
  }

  if (accessPermissions.get('ViewAccounts') && accessPermissions.get('ViewRoles')) {
    copyAccountManagement.routes = [sidebarAccounts, sidebarRoles];

    routes.push(copyAccountManagement);

    return routes;
  }

  if (accessPermissions.get('ViewAccounts')) {
    copyAccountManagement.routes = [sidebarAccounts];

    routes.push(copyAccountManagement);
    return routes;
  }

  if (accessPermissions.get('ViewRoles')) {
    copyAccountManagement.routes = [sidebarRoles];

    routes.push(copyAccountManagement);

    return routes;
  }

  return routes;
}
