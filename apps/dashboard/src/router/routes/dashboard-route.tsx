import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const DashboardPage = lazy(() => import('@/pages/dashboard'));

export const DashboardRoute: AppRoute[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
];
