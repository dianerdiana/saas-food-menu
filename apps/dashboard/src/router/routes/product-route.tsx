import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const SubscriptionPage = lazy(() => import('@/pages/subscriptions'));
const SubscriptionListPage = lazy(() => import('@/pages/subscriptions/list'));

export const SubscriptionRoute: AppRoute[] = [
  {
    path: '/subscription',
    element: <SubscriptionPage />,
  },
  {
    path: '/subscription/list',
    element: <SubscriptionListPage />,
  },
];
