import { type ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@workspace/ui/components/alert-dialog';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { toast } from '@workspace/ui/components/sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';

import {
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';

import { TablePagination } from '@/components/table-pagination';
import { RESPONSE_STATUS } from '@/utils/constants/response-status';
import { useDebounce } from '@/utils/hooks/use-debounce';
import { usePagination } from '@/utils/hooks/use-pagination';

import { useDeleteProduct } from '../api/product.mutation';
import { useGetAllProduct } from '../api/product.query';
import type { Product } from '../types/product.type';
import { createColumns } from './columns';

const selectLimitOptions = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

export function DataTableProduct() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const deleteMutation = useDeleteProduct();

  const columns = createColumns({
    showDialogDelete,
    toggleDelete: (product) => {
      setSelectedProduct(product);
      setShowDialogDelete((prev) => !prev);
    },
  });

  const productResponse = useGetAllProduct({
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
  });
  const { paginationRange, hasPrevious, hasNext } = usePagination({
    currentPage: productResponse.data?.meta?.page || 1,
    totalPages: productResponse.data?.meta?.totalPages || 1,
  });

  const table = useReactTable({
    data: productResponse.data?.data || [],
    columns,
    rowCount: productResponse.data?.meta?.totalItems,
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
  const handleDeleteProduct = () => {
    if (selectedProduct) {
      deleteMutation.mutate(selectedProduct.id, {
        onSuccess: (payload) => {
          if (payload.status === RESPONSE_STATUS.success) {
            toast.success(payload.message);
            setShowDialogDelete(false);
          } else {
            toast.error(payload.message);
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(searchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Card className='shadow-xl'>
      <CardContent>
        <div className='w-full'>
          <div className='flex items-center justify-between py-4'>
            <div>
              <Select onValueChange={handleChangePageSize}>
                <SelectTrigger className='border-border'>
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
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
                <Link to={'/products/create'}>
                  <Plus />
                  Add Product
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
              <TablePagination
                currentPage={table.getState().pagination.pageIndex + 1}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                onPageChange={(page) => console.log(page)}
                paginationRange={paginationRange}
              />
            </div>
          </div>
        </div>
      </CardContent>

      <AlertDialog open={showDialogDelete} onOpenChange={setShowDialogDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>Are you sure want to delete this product?</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-destructive'
              onClick={handleDeleteProduct}
              disabled={deleteMutation.isPending}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
