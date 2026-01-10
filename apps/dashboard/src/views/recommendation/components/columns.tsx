import { Link } from 'react-router-dom';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';

import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';

import type { Recommendation } from '../types/recommendation.type';

type ColumnOptions = {
  showDialogDelete: boolean;
  toggleDelete: (recommendation: Recommendation) => void;
};
export const createColumns = (options: ColumnOptions): ColumnDef<Recommendation>[] => [
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
    header: 'NAME',
    accessorKey: 'name',
    size: 250,
  },
  {
    id: 'store',
    header: 'STORE',
    accessorKey: 'store.name',
    size: 200,
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
          <Link to={`/recommendations/${info.row.original.id}/edit`}>
            <Edit />
          </Link>
        </Button>
      </div>
    ),
  },
];
