import { useState } from 'react';
import { Controller, type SubmitErrorHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleDollarSign, ClipboardList, Link, Tag } from 'lucide-react';

import { SelectStore } from '@/components/select-store';
import { RESPONSE_STATUS } from '@/utils/constants/response-status';
import { generateSlug } from '@/utils/generate-slug';

import { ImageUpload } from './image-product-upload';
import { SelectCategory } from './select-category';

import { useUpdateProduct } from '../api/product.mutation';
import { updateProductSchema } from '../schema/update-product.schema';
import type { ProductWithCategory } from '../types/product.type';
import type { UpdateProductType } from '../types/update-product.type';

export function FormUpdateProduct({ product }: { product: ProductWithCategory }) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { control, handleSubmit, setError, setValue } = useForm<UpdateProductType>({
    resolver: zodResolver(updateProductSchema),
    mode: 'onChange',
    defaultValues: {
      name: product.name,
      slug: product.slug,
      description: product.description ? product.description : '',
      price: product.price,
      categoryId: product.category.id,
      storeId: product.storeId,
    },
  });
  const { mutate, isPending } = useUpdateProduct();
  const storeId = useWatch({ control, name: 'storeId' });
  const navigate = useNavigate();

  const onSubmit = (data: UpdateProductType) => {
    const priceNumber = Number(data.price);

    if (typeof priceNumber !== 'number') {
      setError('price', { message: 'Price should be a valid number' }, { shouldFocus: true });
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('price', String(data.price));
    formData.append('categoryId', data.categoryId);

    if (imageFile) formData.append('image', imageFile);
    if (data.description) formData.append('description', data.description);
    if (data.storeId) formData.append('storeId', data.storeId);

    mutate(
      { payload: formData, productId: product.id },
      {
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
      },
    );
  };

  const onInvalidSubmit: SubmitErrorHandler<UpdateProductType> = (error) => {
    const invalidMessage = Object.entries(error)[0][1].message;
    toast.error(String(invalidMessage));
  };

  const onSelectStore = (value: string) => {
    setValue('storeId', value);
    setValue('categoryId', '');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Edit Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-update-product' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
              <FieldGroup>
                {/* Select Store */}
                <Controller
                  control={control}
                  name='storeId'
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>
                        Select Store <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <SelectStore value={field.value} onSelect={onSelectStore} />
                    </Field>
                  )}
                />

                {/* Product Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-update-${field.name}`}>
                        Product Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-update-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Product Name'
                          autoComplete='off'
                          onChange={(event) => {
                            field.onChange(event);
                            setValue('slug', generateSlug(event.target.value));
                          }}
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
                      <FieldLabel htmlFor={`product-update-${field.name}`}>
                        Product Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-update-${field.name}`}
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
                      <FieldLabel htmlFor={`product-update-${field.name}`}>
                        Price <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-update-${field.name}`}
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

                {/* Product Category */}
                <Controller
                  control={control}
                  name='categoryId'
                  render={({ field }) => (
                    <SelectCategory onSelect={field.onChange} storeId={storeId || ''} value={field.value} />
                  )}
                />

                {/* Description */}
                <Controller
                  control={control}
                  name='description'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-update-${field.name}`}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`product-update-${field.name}`}
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
          <div className='place-items-center col-span-2 order-1 lg:order-2 lg:col-span-1'>
            <ImageUpload onChange={setImageFile} defaultValue={product.image} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation={'horizontal'} className='justify-end'>
          <Button type='submit' form='form-update-product' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
