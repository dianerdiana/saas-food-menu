import { useQuery } from '@tanstack/react-query';

import type { PaginationType } from '@/types/pagination';

import { getAllCategory } from './category.api';
import { categoryKeys } from './category.key';

export const useGetAllCategory = (params: PaginationType) => {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => getAllCategory(params),
    retry: 1,
  });
};
