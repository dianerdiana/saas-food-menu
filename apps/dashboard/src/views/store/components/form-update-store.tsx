import { useEffect, useState } from 'react';
import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList, MapPin, PhoneCall, Store, Tag } from 'lucide-react';

import { useUpdateStore } from '../api/store.mutation';
import type { StoreModel } from '../models/store.model';
import { updateStoreSchema } from '../schema/update-store.schema';
import type { UpdateStoreType } from '../types/update-store.type';
import { ImageUpload } from './image-store-upload';

type FormUpdateStoreProps = {
  store: StoreModel;
};

export function FormUpdateStore({ store }: FormUpdateStoreProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);

  const { control, reset, handleSubmit } = useForm<UpdateStoreType>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: {
      name: '',
      slug: '',
      phone: '',
      address: '',
      description: '',
    },
  });

  const { mutate, isPending } = useUpdateStore();

  const onSubmit = (data: UpdateStoreType) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('phone', data.phone);

    if (data.address) formData.append('address', data.address);
    if (data.description) formData.append('description', data.description);
    if (imageFile) formData.append('image', imageFile);

    mutate(
      { payload: formData, storeId: store.id },
      {
        onSuccess: (payload) => {
          if (payload.data) {
            toast.success(payload.message);
          }
        },
        onError: (payload) => {
          toast.error(payload.message);
        },
      },
    );
  };

  const onInvalid: SubmitErrorHandler<UpdateStoreType> = (error) => {
    const invalidMessage = Object.entries(error)[0][1].message;
    toast.error(String(invalidMessage));
  };

  useEffect(() => {
    reset({
      name: store.name,
      slug: store.slug,
      phone: store.phone,
      address: store.address ? store.address : '',
      description: store.description ? store.description : '',
    });

    setDefaultImage(store.image ? store.image : null);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Store Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-edit-store' onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
            <ImageUpload onChange={setImageFile} defaultValue={defaultImage} />
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
