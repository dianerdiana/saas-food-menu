import * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@workspace/ui/components/sidebar';

import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';

import { navigation } from '@/navigation/navigation';
import { useAuth } from '@/utils/hooks/use-auth';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData, signOut, isAuthenticated } = useAuth();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((nav, idx) => (
          <NavMain key={idx} title={nav.title} items={nav.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>{isAuthenticated && <NavUser userData={userData} signOut={signOut} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
