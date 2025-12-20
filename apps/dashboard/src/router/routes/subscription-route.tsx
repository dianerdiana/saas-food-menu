import { lazy } from 'react';
import type { AppRoute } from '@/types/route.type';

// Pages
const SubscriptionPage = lazy(() => import('@/pages/subscription'));
const SubscriptionListPage = lazy(() => import('@/pages/subscription/list'));

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
