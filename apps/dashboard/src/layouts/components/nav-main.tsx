import { Link, NavLink } from 'react-router-dom';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@workspace/ui/components/sidebar';

import { useAbility } from '@casl/react';
import { ChevronRight } from 'lucide-react';

import type { NavGroup } from '@/navigation/navigation';
import { AbilityContext } from '@/utils/context/ability-context';

export function NavMain({ title, items, meta }: NavGroup) {
  const ability = useAbility(AbilityContext);

  return (
    <SidebarGroup className='py-0'>
      {ability.can(meta?.action || 'read', meta?.subject || 'Auth') && title ? (
        <SidebarGroupLabel>{title}</SidebarGroupLabel>
      ) : null}
      <SidebarMenu>
        {items.map((item) =>
          ability.can(item.meta?.action || 'read', item.meta?.subject || 'Auth') ? (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
              <SidebarMenuItem>
                {item.items && item.items.length ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className='py-1' variant={'primary'}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </CollapsibleTrigger>
                ) : (
                  <NavLink to={item.url} end className={'cursor-pointer'}>
                    {({ isActive }) => (
                      <SidebarMenuButton className='py-1' variant='primary' data-active={isActive}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ) : null,
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
