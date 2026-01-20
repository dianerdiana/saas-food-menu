import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@workspace/ui/components/sidebar';
import { toast } from '@workspace/ui/components/sonner';

import { ChevronsUpDown, Plus } from 'lucide-react';

import type { UserData } from '@/types/user-data.type';
import { RESPONSE_STATUS } from '@/utils/constants/response-status';
import { getHomeRouteForLoggedInUser } from '@/utils/utility';
import { useChangeStore } from '@/views/store/api/store.mutation';
import type { Store } from '@/views/store/types/store.type';

export function StoreSwitcher({
  stores,
  userActiveStore,
  userData,
}: {
  stores: Store[];
  userActiveStore: Store;
  userData: UserData;
}) {
  const { isMobile } = useSidebar();
  const [activeStore, setActiveStore] = React.useState<Store>(userActiveStore);

  const changeStoreMutation = useChangeStore();
  const navigate = useNavigate();

  const handleChangeStore = (store: Store) => {
    changeStoreMutation.mutate(store.id, {
      onSuccess: (payload) => {
        if (payload.data.status === RESPONSE_STATUS.success) {
          toast.success(`Change store to: ${store.name}`);
          navigate(getHomeRouteForLoggedInUser(userData.roles));
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  React.useEffect(() => {
    setActiveStore(userActiveStore);
  }, [stores.length]);

  if (!activeStore) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm overflow-hidden'>
                {activeStore.image ? (
                  <img src={activeStore.image} className='size-8' />
                ) : (
                  <span>{activeStore.name[0]}</span>
                )}
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{activeStore.name}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>Stores</DropdownMenuLabel>
            {stores.map((store) => (
              <DropdownMenuItem
                key={store.name}
                onClick={() => {
                  setActiveStore(store);
                  handleChangeStore(store);
                }}
                className='gap-2'
              >
                <div className='flex w-8 h-8 overflow-hidden py-0.5 items-center justify-center rounded-sm border'>
                  {store.image ? <img src={store.image} className='size-8 shrink-0' /> : <span>{store.name[0]}</span>}
                </div>
                {store.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2' asChild>
              <Link to={'/stores/create'}>
                <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                  <Plus className='size-4' />
                </div>
                <div className='text-muted-foreground font-medium'>Add Store</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
