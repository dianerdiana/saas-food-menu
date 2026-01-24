import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { ModeToggle } from '@/components/mode-toggle';

export function BlankLayout() {
  return (
    <Suspense fallback={null}>
      <div className='absolute right-0 top-0 p-4'>
        <ModeToggle />
      </div>
      <Outlet />
    </Suspense>
  );
}
