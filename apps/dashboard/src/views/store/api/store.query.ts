import { useQuery } from '@tanstack/react-query';

import type { PaginationType } from '@/types/pagination';

import { getAllStore, getStoreById } from './store.api';
import { storeKeys } from './store.key';

export const useGetAllStore = (params: PaginationType) => {
  return useQuery({
    queryKey: storeKeys.list(params),
    queryFn: () => getAllStore(params),
    retry: 1,
  });
};

export const useGetStoreById = (storeId: string) => {
  return useQuery({
    queryKey: storeKeys.detail(storeId),
    queryFn: () => getStoreById(storeId),
    retry: 1,
  });
};

export const useGetStoreBySlug = (slug: string) => {
  return useQuery({
    queryKey: storeKeys.detail(slug),
    queryFn: () => getStoreById(slug),
    retry: 0,
  });
};
