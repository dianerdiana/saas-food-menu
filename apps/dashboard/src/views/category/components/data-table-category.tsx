import { type ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';

import {
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

import { useDebounce } from '@/utils/hooks/use-debounce';

import type { Category } from '../types/category.type';
import { columns } from './columns';

const dataCategory: Category[] = [
  {
    id: '1',
    name: 'Category',
    image: '',
    slug: 'category',
    status: 'Active',
    storeId: '',
    description: '',
  },
];

const selectLimitOptions = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

export function DataTableCategory() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const table = useReactTable({
    data: dataCategory,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
  });

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);
  const handleChangePageSize = (value: string) => table.setPageSize(Number(value));

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(searchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Card className='rounded-sm'>
      <CardContent>
        <div className='w-full'>
          <div className='flex items-center justify-between py-4'>
            <div>
              <Select onValueChange={handleChangePageSize}>
                <SelectTrigger className='border-border'>
                  <SelectValue placeholder='10' />
                </SelectTrigger>
                <SelectContent>
                  {selectLimitOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      defaultChecked={table.getState().pagination.pageSize === Number(option.value)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex gap-2'>
              <Input
                placeholder='Search...'
                value={searchTerm}
                onChange={handleChangeSearchTerm}
                className='max-w-sm'
              />
              <Button asChild>
                <Link to={'/categories/create'}>
                  <Plus />
                  Add Category
                </Link>
              </Button>
            </div>
          </div>
          <div className='overflow-hidden rounded-sm border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} style={{ width: header.getSize() }}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <div className='text-muted-foreground flex-1 text-sm'>
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </div>
            <div className='space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft />
              </Button>
              <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
