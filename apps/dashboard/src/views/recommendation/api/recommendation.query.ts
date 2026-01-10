import { useQuery } from '@tanstack/react-query';

import type { PaginationType } from '@/types/pagination';

import { getAllRecommendation, getRecommendationById } from './recommendation.api';
import { recommendationKeys } from './recommendation.key';

export const useGetAllRecommendation = (params: PaginationType) => {
  return useQuery({
    queryKey: recommendationKeys.list(params),
    queryFn: () => getAllRecommendation(params),
    retry: 1,
  });
};

export const useGetRecommendationById = (recommendationId: string) => {
  return useQuery({
    queryKey: recommendationKeys.detail(recommendationId),
    queryFn: () => getRecommendationById(recommendationId),
    retry: 1,
  });
};
