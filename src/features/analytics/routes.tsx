import IconAnalytics from '../../assets/icons/icon-analytics.svg?react'
import IconAnalyticsActive from '../../assets/icons/icon-analytics-active.svg?react'

export const analyticsSidebarRoutes = [
  {
    isWindowRedirectNecessary: true,
    path: `analytics`,
    label: `Analytics`,
    icon: <IconAnalytics />,
    iconActive: <IconAnalyticsActive />,
  },
]
