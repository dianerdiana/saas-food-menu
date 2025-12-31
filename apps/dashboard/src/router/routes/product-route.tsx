import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const ProductPage = lazy(() => import('@/pages/products'));
const ProductCreatePage = lazy(() => import('@/pages/products/create'));
const ProductEditPage = lazy(() => import('@/pages/products/edit'));

export const ProductRoute: AppRoute[] = [
  {
    path: '/products',
    element: <ProductPage />,
  },
  {
    path: '/products/create',
    element: <ProductCreatePage />,
  },
  {
    path: '/products/:category_id/edit',
    element: <ProductEditPage />,
  },
];
