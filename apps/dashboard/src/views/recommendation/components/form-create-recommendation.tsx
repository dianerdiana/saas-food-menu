import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleDollarSign, ClipboardList, Link, Tag } from 'lucide-react';

import { RESPONSE_STATUS } from '@/utils/constants/response-status';

import { useCreateProduct } from '../api/recommendation.mutation';
import { createProductSchema } from '../schema/create-recommendation.schema';
import type { CreateProductType } from '../types/create-recommendation.type';

export function FormCreateProduct() {
  const { control, handleSubmit, setError } = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: '',
      categoryId: '',
    },
  });
  const { mutate, isPending } = useCreateProduct();
  const navigate = useNavigate();

  const onSubmit = (data: CreateProductType) => {
    const priceNumber = Number(data.price);

    if (typeof priceNumber !== 'number') {
      setError('price', { message: 'Price should be a valid number' }, { shouldFocus: true });
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('price', data.price);
    formData.append('categoryId', data.categoryId);

    if (data.description) formData.append('description', data.description);

    mutate(formData, {
      onSuccess: (payload) => {
        if (payload.status === RESPONSE_STATUS.success) {
          toast.success(payload.message);
          navigate('/products');
        } else {
          toast.error(payload.message);
        }
      },
      onError: (payload) => {
        toast.error(payload.message);
      },
    });
  };

  const onInvalidSubmit: SubmitErrorHandler<CreateProductType> = (error) => {
    const invalidMessage = Object.entries(error)[0][1].message;
    toast.error(String(invalidMessage));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-create-product' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
              <FieldGroup>
                {/* Product Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-create-${field.name}`}>
                        Product Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Product Name'
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

                {/* Product Slug */}
                <Controller
                  control={control}
                  name='slug'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-create-${field.name}`}>
                        Product Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Product URL'
                          autoComplete='off'
                        />
                        <InputGroupAddon>
                          <Link />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Product Price */}
                <Controller
                  control={control}
                  name='price'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-create-${field.name}`}>
                        Price <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='10000'
                          autoComplete='off'
                        />
                        <InputGroupAddon>
                          <CircleDollarSign />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Description */}
                <Controller
                  control={control}
                  name='description'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-create-${field.name}`}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`product-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Description...'
                          autoComplete='off'
                        />
                        <InputGroupAddon>
                          <ClipboardList />
                        </InputGroupAddon>
                      </InputGroup>
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
          <Button type='submit' form='form-create-product' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
