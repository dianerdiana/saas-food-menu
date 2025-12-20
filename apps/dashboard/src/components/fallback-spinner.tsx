import { appConfig } from '@/configs/app.config';
import { Spinner } from '@workspace/ui/components/spinner';

const FallbackSpinner = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full bg-background fixed left-0 top-0 z-50'>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center'>
          <img src={appConfig.logoBrandUrl} className='size-44' />

          <div className='mt-5'>
            <Spinner className='text-primary size-10' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackSpinner;
