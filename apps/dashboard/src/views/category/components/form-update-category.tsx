import { useState } from 'react';
import { Controller, type SubmitErrorHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardList, Link, Tag } from 'lucide-react';

import { SelectStore } from '@/components/select-store';
import { generateSlug } from '@/utils/generate-slug';

import { ImageUpload } from './image-category-upload';

import { useUpdateCategory } from '../api/category.mutation';
import { updateCategorySchema } from '../schema/update-category.schema';
import type { Category } from '../types/category.type';
import type { UpdateCategoryType } from '../types/update-category.type';

type FormUpdateCategoryProps = {
  category: Category;
};

export function FormUpdateCategory({ category }: FormUpdateCategoryProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { control, handleSubmit, setValue } = useForm<UpdateCategoryType>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      storeId: category.storeId,
    },
  });

  const { mutate, isPending } = useUpdateCategory();
  const navigate = useNavigate();

  const onSubmit = (data: UpdateCategoryType) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('storeId', data.storeId);

    if (data.description) formData.append('description', data.description);
    if (imageFile) formData.append('image', imageFile);

    mutate(
      { payload: formData, categoryId: category.id },
      {
        onSuccess: (payload) => {
          if (payload.data) {
            toast.success(payload.message);
            navigate('/categories');
          }
        },
        onError: (payload) => {
          toast.error(payload.message);
        },
      },
    );
  };

  const onInvalidSubmit: SubmitErrorHandler<UpdateCategoryType> = (error) => {
    const invalidMessage = Object.entries(error)[0][1].message;
    toast.error(String(invalidMessage));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Category Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-edit-category' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
              <FieldGroup>
                {/* Select Store Category */}
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
                      <FieldLabel htmlFor={`category-edit-${field.name}`}>
                        Category Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`category-edit-${field.name}`}
                          data-invalid={fieldState.invalid}
                          onChange={(event) => {
                            field.onChange(event);
                            setValue('slug', generateSlug(event.target.value));
                          }}
                        />
                        <InputGroupAddon>
                          <Tag />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />

                {/* Category Slug */}
                <Controller
                  control={control}
                  name='slug'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`category-edit-${field.name}`}>
                        Category Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`category-edit-${field.name}`}
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
                      <FieldLabel htmlFor={`category-edit-${field.name}`}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`category-edit-${field.name}`}
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
            <ImageUpload onChange={setImageFile} defaultValue={category.image} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Field orientation={'horizontal'} className='justify-end'>
          <Button type='submit' form='form-edit-category' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
