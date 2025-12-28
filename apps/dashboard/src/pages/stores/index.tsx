import { Card, CardContent } from '@workspace/ui/components/card';

import { useAuth } from '@/utils/hooks/use-auth';
import type { StoreModel } from '@/views/store/types/store.model';

const store: StoreModel = {
  name: 'Toko Dian Erdiana',
  slug: 'dianerdiana',
  phone: '08123456789',
  description: 'Welcome to my store',
  image: null,
};

export default function StorePage() {
  const { userData } = useAuth();

  return (
    <Card>
      <CardContent>
        <div className='grid place-content-center gap-4 grid-cols-2'>
          <div>
            <h2>{store.name}</h2>
            <p>{store.phone}</p>
            <p>{store.description}</p>
          </div>
          <div>
            {store.image ? (
              <img src='' alt={`Logo ${store.name}`} />
            ) : (
              <img
                src='https://ik.imagekit.io/dianerdiana/saas-food-menu/stores/default-store.png'
                alt='default-store-image'
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
