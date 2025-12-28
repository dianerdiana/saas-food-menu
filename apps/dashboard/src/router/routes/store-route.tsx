import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const StorePage = lazy(() => import('@/pages/stores'));
const StoreCreatePage = lazy(() => import('@/pages/stores/create'));

export const StoreRoute: AppRoute[] = [
  {
    path: '/stores',
    element: <StorePage />,
  },
  {
    path: '/stores/create',
    element: <StoreCreatePage />,
  },
];
