import { Link } from 'react-router-dom';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';

import { Store } from 'lucide-react';

export function EmptyStore() {
  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-center flex-col gap-y-5 py-6'>
          <div className='bg-primary-slate rounded-sm p-10'>
            <Store className='stroke-primary' size={40} />
          </div>
          <p className='text-accent-foreground'>You don't have any store yet</p>
          <Button asChild>
            <Link to={'/stores/create'}>Create a Store</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
