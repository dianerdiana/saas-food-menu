import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import { useAbility } from '@casl/react';

import type { RouteMeta } from '@/types/route.type';
import { AbilityContext } from '@/utils/context/ability-context';
import { useAuth } from '@/utils/hooks/use-auth';
import { getHomeRouteForLoggedInUser } from '@/utils/utility';

import FallbackSpinner from './fallback-spinner';

type PrivateRouteProps = {
  children: React.ReactNode;
  routeMeta?: RouteMeta;
};

export const PrivateRoute = ({ children, routeMeta }: PrivateRouteProps) => {
  const { isAuthenticated, isInitialLoading, userData } = useAuth();
  const ability = useAbility(AbilityContext);

  const restricted = routeMeta?.restricted || false;
  const action = (routeMeta?.action as string) || null;
  const resource = (routeMeta?.resource as string) || null;

  if (isInitialLoading) {
    return <FallbackSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' />;
  }

  if (isAuthenticated && restricted) {
    return <Navigate to={getHomeRouteForLoggedInUser(userData.role)} />;
  }

  if (isAuthenticated && !ability.can(action || 'read', resource || 'Auth')) {
    return <Navigate to='/pages/error' />;
  }

  return <Suspense fallback={<FallbackSpinner />}>{children}</Suspense>;
};
