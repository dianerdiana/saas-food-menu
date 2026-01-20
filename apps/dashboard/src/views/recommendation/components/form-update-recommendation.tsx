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

import { useUpdateRecommendation } from '../api/recommendation.mutation';
import { updateRecommendationSchema } from '../schema/update-recommendation.schema';
import type { Recommendation } from '../types/recommendation.type';
import type { UpdateRecommendationType } from '../types/update-recommendation.type';

type OptionItem = { label: string; value: string };

export function FormUpdateRecommendation({ recommendation }: { recommendation: Recommendation }) {
  const [selectedProducts, setSelectedProducts] = useState<OptionItem[]>(
    recommendation.products.map((product) => ({ label: product.name, value: product.id })),
  );

  const { control, handleSubmit, getValues, setValue } = useForm<UpdateRecommendationType>({
    resolver: zodResolver(updateRecommendationSchema),
    mode: 'onChange',
    defaultValues: {
      name: recommendation.name,
      displayMode: recommendation.displayMode,
      productIds: recommendation.products.map((product) => product.id),
    },
  });

  const { mutate, isPending } = useUpdateRecommendation();
  const navigate = useNavigate();

  const onSubmit = (data: UpdateRecommendationType) => {
    mutate(
      { payload: data, recommendationId: recommendation.id },
      {
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
      },
    );
  };

  const onInvalidSubmit: SubmitErrorHandler<UpdateRecommendationType> = (error) => {
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
        <CardTitle className='text-2xl'>Edit Recommendation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-4'>
            <form id='form-update-recommendation' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
              <FieldGroup>
                {/* Recommendation Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`recommendation-update-${field.name}`}>
                        Recommendation Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`recommendation-update-${field.name}`}
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
                      <FieldLabel htmlFor={`recommendation-update-${field.name}`}>
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
                  render={({ field }) => {
                    return (
                      <Field>
                        <FieldLabel>Select Product</FieldLabel>
                        <MultiSelectProduct
                          values={field.value}
                          onSelect={onSelectProduct}
                          selectedProducts={selectedProducts}
                        />
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation={'horizontal'} className='justify-end'>
          <Button type='submit' form='form-update-recommendation' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
