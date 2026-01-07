import { useEffect } from 'react';
import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList, Link, Tag } from 'lucide-react';

import { useUpdateProduct } from '../api/recommendation.mutation';
import { updateProductSchema } from '../schema/update-recommendation.schema';
import type { Product } from '../types/recommendation.type';
import type { UpdateProductType } from '../types/update-recommendation.type';

type FormUpdateProductProps = {
  product: Product;
};

export function FormUpdateProduct({ product }: FormUpdateProductProps) {
  const { control, reset, handleSubmit } = useForm<UpdateProductType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  const { mutate, isPending } = useUpdateProduct();
  const navigate = useNavigate();

  const onSubmit = (data: UpdateProductType) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('slug', data.slug);

    if (data.description) formData.append('description', data.description);

    mutate(
      { payload: formData, productId: product.id },
      {
        onSuccess: (payload) => {
          if (payload.data) {
            toast.success(payload.message);
            navigate('/product');
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

  useEffect(() => {
    reset({
      name: product.name,
      slug: product.slug,
      description: product.description ? product.description : '',
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Product Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-edit-product' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
              <FieldGroup>
                {/* Product Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-edit-${field.name}`}>
                        Product Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-edit-${field.name}`}
                          data-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                          <Tag />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />

                {/* Product Slug */}
                <Controller
                  control={control}
                  name='slug'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-edit-${field.name}`}>
                        Product Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`product-edit-${field.name}`}
                          data-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                          <Link />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />

                {/* Description */}
                <Controller
                  control={control}
                  name='description'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`product-edit-${field.name}`}>
                        Description <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`product-edit-${field.name}`}
                          data-invalid={fieldState.invalid}
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
          <Button type='submit' form='form-edit-product' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
