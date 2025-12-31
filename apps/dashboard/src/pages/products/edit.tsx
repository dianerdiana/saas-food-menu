import { useParams } from 'react-router-dom';

import { useGetProductById } from '@/views/product/api/product.query';
import { FormUpdateProduct } from '@/views/product/components/form-update-category';
import { EmptyStore } from '@/views/store/components/empty-store';
import { EmptyStoreSkeleton } from '@/views/store/skeletons/empty-store-skeleton';

export default function ProductEditPage() {
  const params = useParams();

  const { data, isLoading } = useGetProductById(params.product_id || '');

  if (isLoading) {
    return <EmptyStoreSkeleton />;
  }

  if (data && data?.data) {
    return <FormUpdateProduct product={data?.data} />;
  }

  return <EmptyStore />;
}
