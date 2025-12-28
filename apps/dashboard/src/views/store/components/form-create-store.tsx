import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList, MapPin, PhoneCall, Store, Tag } from 'lucide-react';

import { useAuth } from '@/utils/hooks/use-auth';

import { useCreateStore } from '../api/store.mutation';
import { createStoreSchema } from '../schema/create-store.schema';
import type { CreateStoreType } from '../types/create-store.type';
import { ImageUpload } from './image-store-upload';

export function FormCreateStore() {
  const { control, handleSubmit } = useForm<CreateStoreType>({
    resolver: zodResolver(createStoreSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      slug: '',
      phone: '',
      address: '',
      description: '',
      image: '',
    },
  });
  const { mutate, isPending } = useCreateStore();
  const { changeStore } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: CreateStoreType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('phone', data.phone);
    formData.append('image', data.image);

    if (data.address) formData.append('address', data.address);
    if (data.description) formData.append('description', data.description);

    mutate(formData, {
      onSuccess: (payload) => {
        if (payload.data) {
          toast.success(payload.message);
          changeStore(payload.data?.id).finally(() => navigate('/stores'));
        }
      },
      onError: (payload) => {
        toast.error(payload.message);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Create Store</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-edit-store' onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Store Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-create-${field.name}`}>
                        Store Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`store-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Store Name'
                          autoComplete='off'
                        />
                        <InputGroupAddon>
                          <Store />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Store Slug */}
                <Controller
                  control={control}
                  name='slug'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-create-${field.name}`}>
                        Store Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`store-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Store URL'
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

                {/* Phone Number */}
                <Controller
                  control={control}
                  name='phone'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-create-${field.name}`}>
                        Phone Number <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`store-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='081234567890'
                          autoComplete='off'
                        />
                        <InputGroupAddon>
                          <PhoneCall />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Address */}
                <Controller
                  control={control}
                  name='address'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-create-${field.name}`}>
                        Address <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`store-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Jl. Raya Mekar Raya'
                          autoComplete='off'
                        />
                        <InputGroupAddon>
                          <MapPin />
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
                      <FieldLabel htmlFor={`store-create-${field.name}`}>
                        Description <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`store-create-${field.name}`}
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
          <Button type='submit' form='form-edit-store' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
