import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList, Link, Tag } from 'lucide-react';

import { RESPONSE_STATUS } from '@/utils/constants/response-status';

import { useCreateProduct } from '../api/product.mutation';
import { createProductSchema } from '../schema/create-product.schema';
import type { CreateProductType } from '../types/create-product.type';
import { ImageUpload } from './image-product-upload';

export function FormCreateProduct() {
  const { control, handleSubmit } = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      image: '',
    },
  });
  const { mutate, isPending } = useCreateProduct();
  const navigate = useNavigate();

  const onSubmit = (data: CreateProductType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('image', data.image);

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

                {/* Description */}
                <Controller
                  control={control}
                  name='description'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-create-${field.name}`}>
                        Description <span className='text-destructive'>*</span>
                      </FieldLabel>
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
          <div className='place-items-center col-span-2 order-1 lg:order-2 lg:col-span-1'>
            <Controller
              control={control}
              name='image'
              render={({ field }) => <ImageUpload onChange={field.onChange} />}
            />
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
