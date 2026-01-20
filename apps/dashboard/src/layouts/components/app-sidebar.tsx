import * as React from 'react';

import { appConfig } from '@/configs/app.config';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@workspace/ui/components/sidebar';

import { ChevronsUpDown } from 'lucide-react';

import { navigation } from '@/navigation/navigation';
import { useAuth } from '@/utils/hooks/use-auth';
import { useGetListStore } from '@/views/store/api/store.query';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { StoreSwitcher } from './store-switcher';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData, signOut, isAuthenticated } = useAuth();
  const storeResponse = useGetListStore({ limit: 10, page: 1 });
  const userActiveStore = storeResponse.data?.data?.find((store) => store.id === userData.storeId);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {userActiveStore ? (
          <StoreSwitcher
            stores={storeResponse.data?.data || []}
            userActiveStore={userActiveStore}
            userData={userData}
          />
        ) : (
          <SidebarMenuButton
            size='lg'
            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm overflow-hidden'>
              <img src={appConfig.logoUrl} className='size-8' />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>{appConfig.brandName}</span>
            </div>
            <ChevronsUpDown className='ml-auto' />
          </SidebarMenuButton>
        )}
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((nav, idx) => (
          <NavMain key={idx} title={nav.title} items={nav.items} meta={nav.meta} />
        ))}
      </SidebarContent>
      <SidebarFooter>{isAuthenticated && <NavUser userData={userData} signOut={signOut} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
