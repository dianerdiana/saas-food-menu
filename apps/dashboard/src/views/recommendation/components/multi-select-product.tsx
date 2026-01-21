import { useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@workspace/ui/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import { cn } from '@workspace/ui/lib/utils';

import { Check, ChevronsUpDown } from 'lucide-react';

import { useDebounce } from '@/utils/hooks/use-debounce';
import { useGetStoreProducts } from '@/views/store/api/store.query';

type OptionItem = { label: string; value: string };

type MultiSelectProductProps = {
  values: string[];
  onSelect: (option: OptionItem) => void;
  selectedProducts: OptionItem[];
  storeId: string;
};

export function MultiSelectProduct({ onSelect, values, storeId }: MultiSelectProductProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  // debounce source of truth untuk query
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading } = useGetStoreProducts({ search: debouncedSearchTerm }, storeId);
  const products = data?.data ? data.data : [];

  const productOptions: OptionItem[] =
    products.map((product) => ({
      label: product.name,
      value: product.id,
    })) ?? [];

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline_primary'
            role='combobox'
            aria-expanded={open}
            className='justify-between text-muted-foreground inset-ring-primary/30 focus:inset-ring-primary'
          >
            {values.length > 0 ? `${values.length} product selected` : 'Select product...'}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-50 p-0'>
          <Command shouldFilter={false}>
            <CommandInput placeholder='Search product...' className='h-9' onValueChange={setSearchTerm} />

            <CommandList>
              {isLoading && <div className='p-3 text-sm text-muted-foreground'>Searching...</div>}

              {!isLoading && productOptions.length === 0 && (
                <CommandEmpty asChild className='overflow-hidden'>
                  <p className='text-sm text-center py-2'>No product found.</p>
                </CommandEmpty>
              )}

              <CommandGroup>
                {productOptions.map((product) => (
                  <CommandItem
                    key={product.value}
                    value={product.value}
                    onSelect={() => {
                      onSelect(product);
                    }}
                  >
                    {product.label}
                    <Check className={cn('ml-auto', values.includes(product.value) ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
