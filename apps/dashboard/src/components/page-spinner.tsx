import { appConfig } from '@/configs/app.config';

import { Spinner } from '@workspace/ui/components/spinner';

export function PageSpinner() {
  return (
    <div className='flex items-center justify-center h-full w-full bg-background'>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center'>
          <img src={appConfig.logoUrl} className='size-44' />

          <div className='mt-5'>
            <Spinner className='text-primary size-10' />
          </div>
        </div>
      </div>
    </div>
  );
}
