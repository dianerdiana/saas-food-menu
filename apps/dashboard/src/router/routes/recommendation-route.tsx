import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const RecommendationPage = lazy(() => import('@/pages/recommendations'));
const RecommendationCreatePage = lazy(() => import('@/pages/recommendations/create'));
const RecommendationEditPage = lazy(() => import('@/pages/recommendations/edit'));

export const RecommendationRoute: AppRoute[] = [
  {
    path: '/recommendations',
    element: <RecommendationPage />,
  },
  {
    path: '/recommendations/create',
    element: <RecommendationCreatePage />,
  },
  {
    path: '/recommendations/:product_id/edit',
    element: <RecommendationEditPage />,
  },
];
