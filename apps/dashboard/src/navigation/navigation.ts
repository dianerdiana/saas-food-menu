import { Banknote, CircleDollarSign, LayoutDashboard, ShoppingBag, Tag } from 'lucide-react';

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
        title: 'Management Transaction',
        url: '#',
        icon: CircleDollarSign,
      },
    ],
  },
  {
    title: 'Management Product',
    items: [
      {
        title: 'Product Category',
        url: '#',
        icon: Tag,
      },
      {
        title: 'Product',
        url: '#',
        icon: ShoppingBag,
      },
    ],
  },
];
