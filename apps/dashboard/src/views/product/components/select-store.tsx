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
import { useGetAllStore } from '@/views/store/api/store.query';

type SelectStoreProps = {
  value?: string;
  onSelect: (value: string) => void;
};

export function SelectStore({ onSelect, value }: SelectStoreProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  // debounce source of truth untuk query
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading } = useGetAllStore({
    search: debouncedSearchTerm,
  });

  const stores =
    data?.data?.map((store) => ({
      label: store.name,
      value: store.id,
    })) ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline_primary'
          role='combobox'
          aria-expanded={open}
          className='justify-between text-muted-foreground inset-ring-primary/30 focus:inset-ring-primary'
        >
          {value ? stores.find((c) => c.value === value)?.label : 'Select store...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-50 p-0'>
        <Command>
          <CommandInput placeholder='Search store...' className='h-9' onValueChange={setSearchTerm} />

          <CommandList>
            {isLoading && <div className='p-3 text-sm text-muted-foreground'>Searching...</div>}

            {!isLoading && stores.length === 0 && (
              <CommandEmpty asChild className='overflow-hidden'>
                <p className='text-sm text-center py-2'>No store found.</p>
              </CommandEmpty>
            )}

            <CommandGroup>
              {stores.map((store) => (
                <CommandItem
                  key={store.value}
                  value={store.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  {store.label}
                  <Check className={cn('ml-auto', value === store.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
