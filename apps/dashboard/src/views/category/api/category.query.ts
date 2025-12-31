import { useQuery } from '@tanstack/react-query';

import type { PaginationType } from '@/types/pagination';

import { getAllCategory, getCategoryById } from './category.api';
import { categoryKeys } from './category.key';

export const useGetAllCategory = (params?: PaginationType) => {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => getAllCategory(params),
    retry: 1,
  });
};

export const useGetCategoryById = (categoryId: string) => {
  return useQuery({
    queryKey: categoryKeys.detail(categoryId),
    queryFn: () => getCategoryById(categoryId),
    retry: 1,
  });
};
