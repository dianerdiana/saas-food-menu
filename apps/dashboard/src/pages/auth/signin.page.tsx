import { SignInForm } from '@/views/auth/components/signin-form';

export default function SignInPage() {
  return (
    <div className='max-w-2xl mx-auto px-4 py-6 min-h-screen flex items-center justify-center'>
      <div className='basis-full'>
        <SignInForm />
      </div>
    </div>
  );
}
