import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Banknote, CircleDollarSign, LayoutDashboard, type LucideProps, ShoppingBag, Store, Tag } from 'lucide-react';

export type NavItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  meta?: {
    action: string;
    subject: string;
  };
};

export type NavGroup = {
  title?: string;
  items: NavItem[];
};

export const navigation: NavGroup[] = [
  {
    title: '',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Management Subscription',
    items: [
      {
        title: 'Subscription',
        url: '/subscription',
        icon: Banknote,
      },
      {
        title: 'Transaction',
        url: '/transactions',
        icon: CircleDollarSign,
      },
    ],
  },
  {
    title: 'Management Product',
    items: [
      {
        title: 'Category',
        url: '/categories',
        icon: Tag,
      },
      {
        title: 'Product',
        url: '/products',
        icon: ShoppingBag,
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Store',
        url: '/stores',
        icon: Store,
      },
    ],
  },
];
