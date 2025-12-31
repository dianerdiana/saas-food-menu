import { useParams } from 'react-router-dom';

import { useGetCategoryById } from '@/views/category/api/category.query';
import { FormUpdateCategory } from '@/views/category/components/form-update-category';
import { EmptyStore } from '@/views/store/components/empty-store';
import { EmptyStoreSkeleton } from '@/views/store/skeletons/empty-store-skeleton';

export default function CategoryEditPage() {
  const params = useParams();

  const { data, isLoading } = useGetCategoryById(params.category_id || '');

  if (isLoading) {
    return <EmptyStoreSkeleton />;
  }

  if (data && data?.data) {
    return <FormUpdateCategory category={data?.data} />;
  }

  return <EmptyStore />;
}
