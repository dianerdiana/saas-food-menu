import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/utils/hooks/use-auth';

import { createStore, deleteStore, updateStore } from './store.api';
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

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, storeId }: { payload: FormData; storeId: string }) => updateStore(payload, storeId),
    onSuccess: (payload) => {
      queryClient.invalidateQueries({
        queryKey: [storeKeys.detail(payload.data?.id || '')],
        exact: false,
      });
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.lists(),
        exact: false,
      });
    },
  });
};

export const useChangeStore = () => {
  const queryClient = useQueryClient();
  const { changeStore } = useAuth();

  return useMutation({
    mutationFn: changeStore,
    onSuccess: (payload) => {
      queryClient.invalidateQueries({
        queryKey: [storeKeys.create(), storeKeys.detail(payload.data?.id || '')],
        exact: false,
      });
    },
  });
};
