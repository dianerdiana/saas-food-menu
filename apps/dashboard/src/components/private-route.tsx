// React
import { Suspense } from 'react';

// Custom Components
import FallbackSpinner from './fallback-spinner';

// Thirdparty
import { useAbility } from '@casl/react';
import { Navigate } from 'react-router';

// Types
import type { RouteMeta } from '@/types/route.type';

// Utils
import { AbilityContext } from '@/utils/context/ability-context';
import { useAuth } from '@/utils/hooks/use-auth';
import { getHomeRouteForLoggedInUser, getUserData } from '@/utils/utility';

type PrivateRouteProps = {
  children: React.ReactNode;
  routeMeta?: RouteMeta;
};

export const PrivateRoute = ({ children, routeMeta }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const ability = useAbility(AbilityContext);

  const restricted = routeMeta?.restricted || false;
  const action = (routeMeta?.action as string) || null;
  const resource = (routeMeta?.resource as string) || null;

  const userData = getUserData();

  if (isLoading) {
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
