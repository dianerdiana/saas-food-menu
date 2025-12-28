import { useAuth } from '@/utils/hooks/use-auth';
import { useGetStoreById } from '@/views/store/api/store.query';
import { EmptyStore } from '@/views/store/components/empty-store';
import { FormUpdateStore } from '@/views/store/components/form-update-store';
import { EmptyStoreSkeleton } from '@/views/store/skeletons/empty-store-skeleton';

export default function StorePage() {
  const { userData } = useAuth();

  const { data, isLoading } = useGetStoreById(userData.storeId);

  if (isLoading) {
    return <EmptyStoreSkeleton />;
  }

  if (data && data?.data) {
    return <FormUpdateStore store={data?.data} />;
  }

  return <EmptyStore />;
}
