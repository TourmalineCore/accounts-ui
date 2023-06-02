import { memo, useContext, useState } from 'react';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import clsx from 'clsx';

import { useLocation } from 'react-router-dom';
import { toJS } from 'mobx';
import { ReactComponent as IconLogout } from '../assets/icons/logout.svg';
import { ReactComponent as IconLogoutActive } from '../assets/icons/logout-active.svg';

import Sidebar from './components/Sidebar/Sidebar';
import SidebarItem from './components/Sidebar/components/SidebarItem/SidebarItem';
import SidebarSettingsControl from './components/Sidebar/components/SidebarSettings/SidebarSettingsControl';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import MobileControlsPanel from './components/MobileControlsPanel/MobileControlsPanel';
import Copyright from './components/Copyright/Copyright';
import TemplatePages from './components/TemplatePages/TemplatePages';

import { useSidebarRoutes } from './hooks/useSidebarRoutes';

import { adminRoutes, checkSidebarRoutes, sidebarRoutes } from '../routes/adminRoutes';
import RoutesStateContext from '../routes/state/RoutesStateContext';
// import { SidebarRoutesProps } from '../types';

// function checkSidebarRoutes(objAccess: { [key: string]: boolean }) {
//   const arr: any[] = [];

//   // const profile = arr.findIndex((a) => a.path === '/profile');
//   // const analytics = arr.findIndex((a) => a.path === '/analytics');
//   // const accountManagerView = arr.findIndex((a) => a.path === '/');
//   // const role = arr[accountManagerView].routes?.findIndex((item) => item.path === '/account-management/roles');
//   // const account = arr[accountManagerView].routes?.findIndex((item) => item.path === '/account-management/accounts');
//   // // const rolesView = arr.findIndex((a) => a.path === '/roles');

//   // console.log(role, account);
//   // if (objAccess.isViewAccount) {
//   //   delete arr[profile];
//   //   delete arr[analytics];
//   // }

//   // console.log(arr);

//   if (objAccess.isViewAccount) {
//     arr.unshift({ name: 'accounts' });
//   }

//   if (objAccess.isEditAccount) {
//     arr.unshift({ name: 'add' }, { name: 'edit/:id' });
//   }

//   if (objAccess.isViewRoles) {
//     arr.unshift({ name: 'role' });
//   }

//   if (objAccess.isViewAnalytics) {
//     arr.unshift({ name: 'analytics' });
//   }

//   if (objAccess.isViewProfile) {
//     arr.unshift({ name: 'profile' });
//   }

//   if (objAccess.isViewEmployee) {
//     arr.unshift({ name: 'employee' });
//   }

//   return arr;
// }

function Template() {
  const location = useLocation();

  const routesStateContext = useContext(RoutesStateContext);

  console.log(toJS(routesStateContext.accessPermissions));
  // @ts-ignore
  console.log('checkSidebarRoutes({ isViewAccount: true })', checkSidebarRoutes(routesStateContext.accessPermissions));
  const parsedSidebarRoutes = useSidebarRoutes(sidebarRoutes, location);

  const breadcrumbs = useBreadcrumbs(adminRoutes as BreadcrumbsRoute<string>[], { excludePaths: ['/'] });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);

  const prevBreadcrumbPath = breadcrumbs.length > 1
    ? breadcrumbs[breadcrumbs.length - 2].key
    : null;

  return (
    <>
      <div
        className={clsx('template', {
          'template--sidebar-collapsed': isSidebarCollapsed,
        })}
      >
        <div className="template__sidebar">
          <Sidebar
            infoBoxData={{}}
            menuData={parsedSidebarRoutes}
            isCollapsed={isSidebarCollapsed}
            isMobileOpened={isMobileSidebarOpened}
            onCollapseToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onOverlayClick={() => setIsMobileSidebarOpened(false)}
            onMenuLinkClick={() => setIsMobileSidebarOpened(false)}
            renderBottomComponent={(props : { portalTarget: HTMLDivElement | null }) => (
              <>
                <SidebarSettingsControl portalTarget={props.portalTarget} />

                <SidebarItem
                  icon={<IconLogout />}
                  iconActive={<IconLogoutActive />}
                  path="/auth/logout"
                  isWindowRedirectNecessary
                  label="Sign Out"
                />
              </>
            )}
          />
        </div>

        <div className="template__main">
          <div className="template__panel template__panel--top">
            <Breadcrumbs list={breadcrumbs} />
          </div>

          <div className="template__content">
            <TemplatePages routes={adminRoutes} />
          </div>

          <div className="template__panel template__panel--bottom">
            <Copyright />
          </div>
        </div>
      </div>

      <MobileControlsPanel
        homePath="/analytics"
        homePageName="Analytics"
        prevPath={prevBreadcrumbPath}
        isToggled={isMobileSidebarOpened}
        onToggleClick={() => setIsMobileSidebarOpened(!isMobileSidebarOpened)}
      />
    </>
  );
}

export default memo(Template);
