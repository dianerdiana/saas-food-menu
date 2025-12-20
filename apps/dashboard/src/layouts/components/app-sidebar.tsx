import * as React from "react";
import {
  AudioWaveform,
  Banknote,
  CircleDollarSign,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  ShoppingBag,
  Tag,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

const dashboardMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: false,
  },
];

const managementSubscriptionNav = [
  {
    title: "Subscription",
    url: "#",
    icon: Banknote,
  },
  {
    title: "Management Transaction",
    url: "#",
    icon: CircleDollarSign,
  },
];

const managementMenuNav = [
  {
    title: "Product Category",
    url: "#",
    icon: Tag,
  },
  {
    title: "Product",
    url: "#",
    icon: ShoppingBag,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dashboardMenu} />
        <NavMain
          title="Management Subscription"
          items={managementSubscriptionNav}
        />
        <NavMain title="Management Menu" items={managementMenuNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
