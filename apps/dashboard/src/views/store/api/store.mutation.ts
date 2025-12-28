import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createStore } from './store.api';
import { storeKeys } from './store.key';

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStore,
    onSuccess: (payload) => {
      queryClient.invalidateQueries({
        queryKey: [storeKeys.create(), storeKeys.detail(payload.data?.id || '')],
        exact: false,
      });
    },
  });
};
