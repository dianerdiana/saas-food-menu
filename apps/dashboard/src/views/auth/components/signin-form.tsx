import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { appConfig } from '@/configs/app.config';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@workspace/ui/components/input-group';
import { toast } from '@workspace/ui/components/sonner';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, KeyRound, User2 } from 'lucide-react';

import { RESPONSE_STATUS } from '@/utils/constants/response-status';

import { useSignIn } from '../api/auth.mutation';
import { signInSchema } from '../schema/signin.schema';
import type { SignInType } from '../types/signin.type';

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, setError } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, isPending } = useSignIn();

  const onSubmit = async (data: SignInType) => {
    mutate(data, {
      onSuccess: (payload) => {
        if (payload.data.data && payload.data.status === RESPONSE_STATUS.success) {
          const { userData } = payload.data.data;
          toast.success(`Welcome to Tooang! ${userData.fullName}`);
          navigate('/dashboard');
        } else {
          toast.error(payload?.data?.message || 'Invalid Credentials');
          setError('root', { message: 'Invalid Credentials' });
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-center'>
          <img src={appConfig.logoUrl} alt='logo-brand' className='size-40' />
        </div>
        <CardTitle className='text-center text-2xl'>Sign In to Continue</CardTitle>
        <CardDescription className='text-center'>
          Welcome to {appConfig.brandName} where flavor meets your favorit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='form-signin' onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Username */}
            <Controller
              control={control}
              name='username'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signin-${field.name}`}>
                    Username / Email <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signin-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='username'
                      autoComplete='off'
                    />
                    <InputGroupAddon>
                      <User2 />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signin-${field.name}`}>
                    Password <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signin-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='Password'
                      autoComplete='off'
                      type={showPassword ? 'text' : 'password'}
                    />
                    <InputGroupAddon>
                      <KeyRound />
                    </InputGroupAddon>
                    <InputGroupAddon align='inline-end'>
                      <InputGroupButton onClick={toggleShowPassword}>
                        {showPassword ? <Eye /> : <EyeClosed />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type='submit' form='form-signin' className='block w-full' disabled={isPending}>
            Sign In
          </Button>
          <p className='text-muted-foreground text-sm text-center'>
            Don't have an account?{' '}
            <Link to='/signup' className='text-primary'>
              Sign Up
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
}
