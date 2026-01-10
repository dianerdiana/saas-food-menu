import { useState } from 'react';
import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@workspace/ui/components/input-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { Tag } from 'lucide-react';

import { RESPONSE_STATUS } from '@/utils/constants/response-status';

import { MultiSelectProduct } from './multi-select-product';

import { useCreateRecommendation } from '../api/recommendation.mutation';
import { createRecommendationSchema } from '../schema/create-recommendation.schema';
import type { CreateRecommendationType } from '../types/create-recommendation.type';

type OptionItem = { label: string; value: string };

export function FormCreateRecommendation() {
  const [selectedProducts, setSelectedProducts] = useState<OptionItem[]>([]);

  const { control, handleSubmit, getValues, setValue } = useForm<CreateRecommendationType>({
    resolver: zodResolver(createRecommendationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      displayMode: 'vertical',
      productIds: [],
    },
  });

  const { mutate, isPending } = useCreateRecommendation();
  const navigate = useNavigate();

  const onSubmit = (data: CreateRecommendationType) => {
    mutate(data, {
      onSuccess: (payload) => {
        if (payload.status === RESPONSE_STATUS.success) {
          toast.success(payload.message);
          navigate('/recommendations');
        } else {
          toast.error(payload.message);
        }
      },
      onError: (payload) => {
        toast.error(payload.message);
      },
    });
  };

  const onInvalidSubmit: SubmitErrorHandler<CreateRecommendationType> = (error) => {
    const invalidMessage = Object.entries(error)[0][1].message;
    toast.error(String(invalidMessage));
  };

  const onSelectProduct = (option: OptionItem) => {
    const optionValue = option.value;
    const selectedProducts = getValues('productIds');

    setSelectedProducts((prev) =>
      prev.find((v) => v.value === optionValue) ? prev.filter((v) => v.value !== optionValue) : [...prev, option],
    );

    setValue(
      'productIds',
      selectedProducts.includes(optionValue)
        ? selectedProducts.filter((v) => v !== optionValue)
        : [...selectedProducts, optionValue],
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Add Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-4'>
            <form id='form-create-recommendation' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
              <FieldGroup>
                {/* Recommendation Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`recommendation-create-${field.name}`}>
                        Recommendation Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`recommendation-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Recommendation Name'
                          autoComplete='off'
                        />
                        <InputGroupAddon>
                          <Tag />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='displayMode'
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor={`recommendation-create-${field.name}`}>
                        Select Display Mode <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className='w-45'>
                          <SelectValue placeholder='Select display mode...' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Display Mode</SelectLabel>
                            <SelectItem value='vertical'>Vertical</SelectItem>
                            <SelectItem value='horizontal'>Horizontal</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
                <Controller
                  name='productIds'
                  control={control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Select Product</FieldLabel>
                      <MultiSelectProduct
                        values={field.value}
                        onSelect={onSelectProduct}
                        selectedProducts={selectedProducts}
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation={'horizontal'} className='justify-end'>
          <Button type='submit' form='form-create-recommendation' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
