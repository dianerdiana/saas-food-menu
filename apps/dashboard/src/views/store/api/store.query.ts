import { useQuery } from '@tanstack/react-query';

import { getStoreById } from './store.api';
import { storeKeys } from './store.key';

export const useGetStoreById = (storeId: string) => {
  return useQuery({
    queryKey: storeKeys.detail(storeId),
    queryFn: () => getStoreById(storeId),
    retry: 1,
  });
};
