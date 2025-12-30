import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCategory } from './category.api';
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
