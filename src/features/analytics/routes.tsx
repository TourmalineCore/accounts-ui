import { ReactComponent as IconAnalytics } from '../../assets/icons/analytics.svg';
import { ReactComponent as IconAnalyticsActive } from '../../assets/icons/analytics-active.svg';

export const analyticsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: '/analytics',
    label: 'Analytics',
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
];
