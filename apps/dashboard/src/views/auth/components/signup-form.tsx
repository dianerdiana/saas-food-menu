import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { appConfig } from '@/configs/app.config';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@workspace/ui/components/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@workspace/ui/components/input-group';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, KeyRound, Mail, PhoneCall, User2, UserRoundPen } from 'lucide-react';

import type { SignUpDto } from '../dto/signup.dto';
import { signUpSchema } from '../schema/signup.schema';

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpDto) => {
    console.log(data);
  };

  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-center'>
          <img src={appConfig.logoUrl} alt='logo-brand' className='size-40' />
        </div>
        <CardTitle className='text-center text-2xl'>Create An Account</CardTitle>
        <CardDescription className='text-center'>
          Welcome to {appConfig.brandName} where flavor meets your favorit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='form-signup' onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* First Name */}
            <Controller
              control={control}
              name='firstName'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signup-${field.name}`}>
                    First Name <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signup-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='First Name'
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

            {/* Last Name */}
            <Controller
              control={control}
              name='lastName'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signup-${field.name}`}>Last Name</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signup-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='Last Name'
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

            {/* Email */}
            <Controller
              control={control}
              name='email'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signup-${field.name}`}>
                    Email <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signup-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='example@mail.com'
                      autoComplete='off'
                    />
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Username */}
            <Controller
              control={control}
              name='username'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signup-${field.name}`}>
                    Username <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signup-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='username'
                      autoComplete='off'
                    />
                    <InputGroupAddon>
                      <UserRoundPen />
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
                  <FieldLabel htmlFor={`form-signup-${field.name}`}>
                    Phone Number <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signup-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='Phone Number'
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

            {/* Password */}
            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signup-${field.name}`}>
                    Password <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signup-${field.name}`}
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

            {/* Confirm Password */}
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-signup-${field.name}`}>
                    Confirm Password <span className='text-destructive'>*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={`form-signup-${field.name}`}
                      aria-invalid={fieldState.invalid}
                      placeholder='Confirm Password'
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
          <Button type='submit' form='form-signup' className='block w-full'>
            Sign Up
          </Button>
          <p className='text-muted-foreground text-sm text-center'>
            Alread have an account?{' '}
            <Link to='/signin' className='text-primary'>
              Sign In
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
}
