import { Card, CardContent } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';

export function EmptyStoreSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-center flex-col gap-y-5 py-6'>
          {/* Skeleton untuk Icon Container */}
          <Skeleton className='h-30 w-30 rounded-sm' />

          {/* Skeleton untuk Teks Deskripsi */}
          <Skeleton className='h-4 w-50' />

          {/* Skeleton untuk Button */}
          <Skeleton className='h-10 w-35' />
        </div>
      </CardContent>
    </Card>
  );
}
