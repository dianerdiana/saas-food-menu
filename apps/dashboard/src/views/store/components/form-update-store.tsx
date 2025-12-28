import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, ClipboardList, MapPin, PhoneCall, Store, Tag } from 'lucide-react';

import type { StoreModel } from '../models/store.model';
import { createStoreSchema } from '../schema/create-store.schema';
import type { CreateStoreType } from '../types/create-store.type';

const store: StoreModel = {
  name: 'Toko Dian Erdiana',
  slug: 'dianerdiana',
  phone: '08123456789',
  description: 'Welcome to my store',
  address: '',
  image: null,
};

export function FormUpdateStore() {
  const { control, reset } = useForm<CreateStoreType>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: '',
      slug: '',
      phone: '',
      address: '',
      description: '',
    },
  });

  useEffect(() => {
    reset({
      name: store.name,
      slug: store.slug,
      phone: store.phone,
      address: store.address ? store.address : '',
      description: store.description ? store.description : '',
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Store Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-edit-store'>
              <FieldGroup>
                {/* Store Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-edit-${field.name}`}>
                        Store Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput {...field} id={`store-edit-${field.name}`} data-invalid={fieldState.invalid} />
                        <InputGroupAddon>
                          <Store />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />

                {/* Store Slug */}
                <Controller
                  control={control}
                  name='slug'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-edit-${field.name}`}>
                        Store Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput {...field} id={`store-edit-${field.name}`} data-invalid={fieldState.invalid} />
                        <InputGroupAddon>
                          <Tag />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />

                {/* Phone Number */}
                <Controller
                  control={control}
                  name='phone'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-edit-${field.name}`}>
                        Phone Number <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput {...field} id={`store-edit-${field.name}`} data-invalid={fieldState.invalid} />
                        <InputGroupAddon>
                          <PhoneCall />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />

                {/* Address */}
                <Controller
                  control={control}
                  name='address'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`store-edit-${field.name}`}>
                        Address <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`store-edit-${field.name}`}
                          data-invalid={fieldState.invalid}
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
                      <FieldLabel htmlFor={`store-edit-${field.name}`}>
                        Description <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`store-edit-${field.name}`}
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
          <div className='place-items-center col-span-2 order-1 lg:order-2 lg:col-span-1'>
            {store.image ? (
              <div className='relative'>
                <div className='size-40 overflow-hidden bg-primary-slate rounded-full flex items-center justify-center'>
                  <img
                    src={store.image}
                    alt={`Logo ${store.name}`}
                    className='w-full h-auto object-center object-cover'
                  />
                </div>
                <Button className='absolute -bottom-2 right-4' size={'sm'} variant={'primary'}>
                  <Camera />
                </Button>
              </div>
            ) : (
              <div className='relative'>
                <div className=' size-40 overflow-hidden bg-primary-slate rounded-full flex items-center justify-center'>
                  <img
                    src='https://ik.imagekit.io/dianerdiana/saas-food-menu/stores/default-store.png?tr:ar-4-4,w-160'
                    alt='default-store-image'
                    className='w-full h-auto object-center object-cover'
                  />
                </div>
                <Button className='absolute -bottom-2 right-4' size={'sm'} variant={'primary'}>
                  <Camera />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation={'horizontal'} className='justify-end'>
          <Button type='submit' form='form-edit-store' className='px-10'>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
