import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCategory, deleteCategory, updateCategory } from './category.api';
import { categoryKeys } from './category.key';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.create(),
        exact: false,
      });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, categoryId }: { payload: FormData; categoryId: string }) =>
      updateCategory(payload, categoryId),
    onSuccess: (payload) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(payload.data?.id || ''),
        exact: false,
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.lists(),
        exact: false,
      });
    },
  });
};
