import { PageSpinner } from '@/components/page-spinner';
import { useAuth } from '@/utils/hooks/use-auth';
import { EmptyPage } from '@/views/pages/empty.page';
import { useGetStoreById } from '@/views/store/api/store.query';
import { FormUpdateStore } from '@/views/store/components/form-update-store';

export default function StorePage() {
  const { userData } = useAuth();

  const { data, isLoading } = useGetStoreById(userData.storeId);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (data && data?.data) {
    return <FormUpdateStore store={data?.data} />;
  }

  return <EmptyPage />;
}
