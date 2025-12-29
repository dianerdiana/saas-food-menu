import { Banknote, CircleDollarSign, LayoutDashboard, ShoppingBag, Store, Tag } from 'lucide-react';

export const navigation = [
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
        url: '#',
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
