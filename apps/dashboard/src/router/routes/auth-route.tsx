import { lazy } from 'react';

import type { AppRoute } from '@/types/route.type';

// Pages
const SignInPage = lazy(() => import('@/pages/auth/signin.page'));
const SignUpPage = lazy(() => import('@/pages/auth/signup.page'));

export const AuthRoute: AppRoute[] = [
  {
    path: '/signin',
    element: <SignInPage />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true,
    },
  },
];
