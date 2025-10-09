import IconCompensations from '../../assets/icons/icon-compensations.svg?react';
import IconCompensationsActive from '../../assets/icons/icon-compensations-active.svg?react';
import { LINK_TO_DASHBOARD } from '../../common/config/config';

export const compensationsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}compensations`,
    label: 'Compensations',
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
  },
];

export function getRouteForCompensations(permission: string) {
  if (permission === 'CanRequestCompensations') {
    return [{
      isWindowRedirectNecessary: true,
      path: `${LINK_TO_DASHBOARD}compensations/my`,
      label: 'Compensations',
      icon: <IconCompensations />,
      iconActive: <IconCompensationsActive />,
    }];
  }

  return [{
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}compensations/all`,
    label: 'Compensations',
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
  }];
}

export const compensationsAllAccessSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `${LINK_TO_DASHBOARD}compensations`,
    label: 'Compensations',
    icon: <IconCompensations />,
    iconActive: <IconCompensationsActive />,
    routes: [
      {
        isWindowRedirectNecessary: true,
        path: `${LINK_TO_DASHBOARD}compensations/my`,
        label: 'My',
        iconMini: <IconCompensations />,
      },
      {
        isWindowRedirectNecessary: true,
        path: `${LINK_TO_DASHBOARD}compensations/all`,
        label: 'All',
        iconMini: <IconCompensations />,
      }],
  },
];
