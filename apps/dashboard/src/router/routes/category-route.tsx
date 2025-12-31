import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const CategoryPage = lazy(() => import('@/pages/categories'));
const CategoryCreatePage = lazy(() => import('@/pages/categories/create'));
const CategoryEditPage = lazy(() => import('@/pages/categories/edit'));

export const CategoryRoute: AppRoute[] = [
  {
    path: '/categories',
    element: <CategoryPage />,
  },
  {
    path: '/categories/create',
    element: <CategoryCreatePage />,
  },
  {
    path: '/categories/:category_id/edit',
    element: <CategoryEditPage />,
  },
];
