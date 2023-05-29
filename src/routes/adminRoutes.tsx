import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { profileSidebarRoutes } from '../features/profile/routes';
// import { SidebarRoutesProps } from '../types';
import { employeesSidebarRoutes } from '../features/employees/routes';
import { analyticsSidebarRoutes } from '../features/analytics/routes';
import {
  accountManagementRoutes,
  accountManagementSidebarRoutes,
} from '../features/account-management/routes';
import { SidebarRoutesProps } from '../types';
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
