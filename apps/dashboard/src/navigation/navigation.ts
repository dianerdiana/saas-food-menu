import { Banknote, CircleDollarSign, LayoutDashboard, type LucideIcon, ShoppingBag, Store, Tag } from 'lucide-react';

export type NavMeta = {
  action: string;
  subject: string;
};

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  meta?: NavMeta;
  items?: NavItem[];
  isActive?: boolean;
};

export type NavGroup = {
  title?: string;
  items: NavItem[];
  meta?: NavMeta;
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
        meta: {
          action: 'read',
          subject: 'Subscription',
        },
      },
      {
        title: 'Transaction',
        url: '/transactions',
        icon: CircleDollarSign,
        meta: {
          action: 'read',
          subject: 'Transaction',
        },
      },
    ],
    meta: {
      action: 'read',
      subject: 'Subscription',
    },
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
