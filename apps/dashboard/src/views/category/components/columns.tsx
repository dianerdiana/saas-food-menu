import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';

import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';

import type { Category } from '../types/category.type';

type ColumnOptions = {
  showDialogDelete: boolean;
  toggleDelete: (category: Category) => void;
};
export const createColumns = (options: ColumnOptions): ColumnDef<Category>[] => [
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
    size: 25,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'NAME',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={row.original.image} />
          <AvatarFallback>{row.original.name.split('')[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className='text-sm'>{row.original.name}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'slug',
    header: 'SLUG',
    accessorKey: 'slug',
  },
  {
    id: 'description',
    header: 'DESCRIPTION',
    accessorKey: 'description',
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
        <Button variant={'outline_primary'} className='py-0.5' size={'sm'}>
          <Edit />
        </Button>
      </div>
    ),
  },
];
