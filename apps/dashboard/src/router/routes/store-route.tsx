import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const StorePage = lazy(() => import('@/pages/stores'));

export const StoreRoute: AppRoute[] = [
  {
    path: '/stores',
    element: <StorePage />,
  },
];
