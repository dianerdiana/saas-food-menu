import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createRecommendation, deleteRecommendation, updateRecommendation } from './recommendation.api';
import { recommendationKeys } from './recommendation.key';

import type { UpdateRecommendationType } from '../types/update-recommendation.type';

export const useCreateRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecommendation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recommendationKeys.create(),
        exact: false,
      });
    },
  });
};

export const useUpdateRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, recommendationId }: { payload: UpdateRecommendationType; recommendationId: string }) =>
      updateRecommendation(payload, recommendationId),
    onSuccess: (payload) => {
      queryClient.invalidateQueries({
        queryKey: recommendationKeys.detail(payload.data?.id || ''),
        exact: false,
      });
    },
  });
};

export const useDeleteRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecommendation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recommendationKeys.lists(),
        exact: false,
      });
    },
  });
};
