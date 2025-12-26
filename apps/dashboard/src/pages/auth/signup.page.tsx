import { SignUpForm } from '@/views/auth/components/signup-form';

export default function SignUpPage() {
  return (
    <div className='max-w-2xl mx-auto px-4 py-6 min-h-screen flex items-center justify-center'>
      <div className='basis-full'>
        <SignUpForm />
      </div>
    </div>
  );
}
