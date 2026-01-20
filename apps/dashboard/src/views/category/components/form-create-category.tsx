import { useEffect, useState } from 'react';
import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList, Link, Tag } from 'lucide-react';

import { SelectStore } from '@/components/select-store';
import { RESPONSE_STATUS } from '@/utils/constants/response-status';
import { generateSlug } from '@/utils/generate-slug';
import { useAuth } from '@/utils/hooks/use-auth';

import { ImageUpload } from './image-category-upload';

import { useCreateCategory } from '../api/category.mutation';
import { createCategorySchema } from '../schema/create-category.schema';
import type { CreateCategoryType } from '../types/create-category.type';

export function FormCreateCategory() {
  const { userData } = useAuth();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { control, handleSubmit, setValue, reset } = useForm<CreateCategoryType>({
    resolver: zodResolver(createCategorySchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      storeId: '',
    },
  });
  const { mutate, isPending } = useCreateCategory();
  const navigate = useNavigate();

  const onSubmit = (data: CreateCategoryType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);

    if (imageFile) formData.append('image', imageFile);
    if (data.description) formData.append('description', data.description);

    mutate(formData, {
      onSuccess: (payload) => {
        if (payload.status === RESPONSE_STATUS.success) {
          toast.success(payload.message);
          navigate('/categories');
        } else {
          toast.error(payload.message);
        }
      },
      onError: (payload) => {
        toast.error(payload.message);
      },
    });
  };

  const onInvalidSubmit: SubmitErrorHandler<CreateCategoryType> = (error) => {
    const invalidMessage = Object.entries(error)[0][1].message;
    toast.error(String(invalidMessage));
  };

  useEffect(() => {
    if (userData) {
      reset({ storeId: userData.storeId });
    }
  }, [userData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Add Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-create-category' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
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
                      <SelectStore onSelect={field.onChange} value={field.value} />
                    </Field>
                  )}
                />

                {/* Category Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`category-create-${field.name}`}>
                        Category Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`category-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Category Name'
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

                {/* Category Slug */}
                <Controller
                  control={control}
                  name='slug'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`category-create-${field.name}`}>
                        Category Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`category-create-${field.name}`}
                          aria-invalid={fieldState.invalid}
                          placeholder='Category URL'
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
                      <FieldLabel htmlFor={`category-create-${field.name}`}>
                        Description <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`category-create-${field.name}`}
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
            <ImageUpload onChange={setImageFile} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation={'horizontal'} className='justify-end'>
          <Button type='submit' form='form-create-category' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
