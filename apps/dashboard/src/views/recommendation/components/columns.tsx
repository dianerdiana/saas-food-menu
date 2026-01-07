import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';

import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';

import { formatCurrency } from '@/utils/utility';

import type { Product } from '../types/recommendation.type';

type ColumnOptions = {
  showDialogDelete: boolean;
  toggleDelete: (product: Product) => void;
};
export const createColumns = (options: ColumnOptions): ColumnDef<Product>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
    maxSize: 25,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'NAME',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar className='rounded-sm'>
          <AvatarImage src={row.original.image} />
          <AvatarFallback className='rounded-sm'>{row.original.name.split('')[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className='text-sm'>{row.original.name}</p>
        </div>
      </div>
    ),
    size: 250,
  },
  {
    id: 'store',
    header: 'STORE',
    accessorKey: 'store.name',
    size: 200,
  },
  {
    id: 'price',
    header: 'PRICE',
    accessorKey: 'price',
    cell: ({ row }) => <p>{formatCurrency(row.original.price)}</p>,
    size: 150,
  },
  {
    id: 'status',
    header: () => <p className='text-center w-full'>STATUS</p>,
    accessorKey: 'status',
    cell: ({ row }) => (
      <div className='text-center'>
        <Badge variant={row.original.status === 'ACTIVE' ? 'primary' : 'destructive'}>{row.original.status}</Badge>
      </div>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <p className='text-center'>ACTIONS</p>,
    size: 120,
    cell: (info) => (
      <div className='flex items-center justify-center gap-2'>
        <Button
          variant={'outline_destructive'}
          className='py-0.5'
          onClick={() => options.toggleDelete(info.row.original)}
          size={'sm'}
        >
          <Trash2 />
        </Button>
        <Button variant={'outline_primary'} className='py-0.5' size={'sm'} asChild>
          <Link to={`/products/${info.row.original.id}/edit`}>
            <Edit />
          </Link>
        </Button>
      </div>
    ),
  },
];
