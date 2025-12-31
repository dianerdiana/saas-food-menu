import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProduct, deleteProduct, updateProduct } from './product.api';
import { productKeys } from './product.key';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.create(),
        exact: false,
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, productId }: { payload: FormData; productId: string }) => updateProduct(payload, productId),
    onSuccess: (payload) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(payload.data?.id || ''),
        exact: false,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
        exact: false,
      });
    },
  });
};
