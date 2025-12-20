import { lazy } from 'react';
import type { AppRoute } from '@/types/route.type';

// Pages
const SignInPage = lazy(() => import('@/pages/signin'));

export const AuthRoute: AppRoute[] = [
  {
    path: '/signin',
    element: <SignInPage />,
    meta: {
      layout: 'blank',
      publicRoute: false,
    },
  },
];
