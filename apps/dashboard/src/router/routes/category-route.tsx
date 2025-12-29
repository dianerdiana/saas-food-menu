import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const CategoryPage = lazy(() => import('@/pages/categories'));

export const CategoryRoute: AppRoute[] = [
  {
    path: '/categories',
    element: <CategoryPage />,
  },
];
