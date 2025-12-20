import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export function BlankLayout() {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
}
