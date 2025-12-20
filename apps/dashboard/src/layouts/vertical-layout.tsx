import { AppSidebar } from './components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { TopNav } from './components/top-nav';

export function VerticalLayout() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <SidebarProvider>
      <AppSidebar variant='floating' collapsible='offcanvas' />
      <SidebarInset>
        <TopNav pathnames={pathnames} />
        <div className='p-4'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
