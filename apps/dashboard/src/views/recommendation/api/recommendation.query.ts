import { useQuery } from '@tanstack/react-query';

import type { PaginationType } from '@/types/pagination';

import { getAllProduct, getProductById } from './recommendation.api';
import { productKeys } from './recommendation.key';

export const useGetAllProduct = (params: PaginationType) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getAllProduct(params),
    retry: 1,
  });
};

export const useGetProductById = (categoryId: string) => {
  return useQuery({
    queryKey: productKeys.detail(categoryId),
    queryFn: () => getProductById(categoryId),
    retry: 1,
  });
};
