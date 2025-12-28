import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createStore } from './store.api';
import { storeKeys } from './store.key';

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.create(),
        exact: false,
      });
    },
  });
};
