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

import { useUpdateRecommendation } from '../api/recommendation.mutation';
import { updateRecommendationSchema } from '../schema/update-recommendation.schema';
import type { Recommendation } from '../types/recommendation.type';
import type { UpdateRecommendationType } from '../types/update-recommendation.type';

type FormUpdateRecommendationProps = {
  recommendation: Recommendation;
};

export function FormUpdateRecommendation({ recommendation }: FormUpdateRecommendationProps) {
  const { control, reset, handleSubmit } = useForm<UpdateRecommendationType>({
    resolver: zodResolver(updateRecommendationSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  const { mutate, isPending } = useUpdateRecommendation();
  const navigate = useNavigate();

  const onSubmit = (data: UpdateRecommendationType) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('slug', data.slug);

    if (data.description) formData.append('description', data.description);

    mutate(
      { payload: formData, recommendationId: recommendation.id },
      {
        onSuccess: (payload) => {
          if (payload.data) {
            toast.success(payload.message);
            navigate('/recommendations');
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

  useEffect(() => {
    reset({
      name: recommendation.name,
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Recommendation Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div className='col-span-2 order-2 lg:order-1 lg:col-span-1'>
            <form id='form-edit-recommendation' onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
              <FieldGroup>
                {/* Recommendation Name */}
                <Controller
                  control={control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`recommendation-edit-${field.name}`}>
                        Recommendation Name <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`recommendation-edit-${field.name}`}
                          data-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon>
                          <Tag />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />

                {/* Recommendation Slug */}
                <Controller
                  control={control}
                  name='slug'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`recommendation-edit-${field.name}`}>
                        Recommendation Slug (URL) <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={`recommendation-edit-${field.name}`}
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
                      <FieldLabel htmlFor={`recommendation-edit-${field.name}`}>
                        Description <span className='text-destructive'>*</span>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id={`recommendation-edit-${field.name}`}
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
          <Button type='submit' form='form-edit-recommendation' className='px-10' disabled={isPending}>
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
