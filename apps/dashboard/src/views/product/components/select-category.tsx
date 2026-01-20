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
import { Field, FieldLabel } from '@workspace/ui/components/field';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import { cn } from '@workspace/ui/lib/utils';

import { Check, ChevronsUpDown } from 'lucide-react';

import { useDebounce } from '@/utils/hooks/use-debounce';
import { useGetStoreCategories } from '@/views/store/api/store.query';

type SelectCategoryProps = {
  onSelect: (value: string) => void;
  storeId: string;
  value: string;
};

export function SelectCategory({ onSelect, storeId, value }: SelectCategoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  // debounce source of truth untuk query
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading } = useGetStoreCategories({ search: debouncedSearchTerm }, storeId);

  const categories =
    data?.data?.map((category) => ({
      label: category.name,
      value: category.id,
    })) ?? [];

  return (
    <Field>
      <FieldLabel>
        Product Category <span className='text-destructive'>*</span>
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline_primary'
            role='combobox'
            aria-expanded={open}
            className='justify-between text-muted-foreground inset-ring-primary/30 focus:inset-ring-primary'
          >
            {value ? categories.find((c) => c.value === value)?.label : 'Select category...'}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-50 p-0'>
          <Command>
            <CommandInput placeholder='Search category...' className='h-9' onValueChange={setSearchTerm} />

            <CommandList>
              {isLoading && <div className='p-3 text-sm text-muted-foreground'>Searching...</div>}

              {!isLoading && categories.length === 0 && (
                <CommandEmpty asChild className='overflow-hidden'>
                  <p className='text-sm text-center py-2'>No category found.</p>
                </CommandEmpty>
              )}

              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    onSelect={(currentValue) => {
                      onSelect(currentValue);
                      setOpen(false);
                    }}
                  >
                    {category.label}
                    <Check className={cn('ml-auto', value === category.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
