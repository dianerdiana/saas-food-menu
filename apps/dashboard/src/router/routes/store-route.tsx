import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const StoreListPage = lazy(() => import('@/pages/stores'));
const StoreEditPage = lazy(() => import('@/pages/stores/edit'));
const StoreCreatePage = lazy(() => import('@/pages/stores/create'));

export const StoreRoute: AppRoute[] = [
  {
    path: '/stores',
    element: <StoreListPage />,
  },
  {
    path: '/stores/create',
    element: <StoreCreatePage />,
  },
  {
    path: '/stores/:store_id/edit',
    element: <StoreEditPage />,
  },
];
