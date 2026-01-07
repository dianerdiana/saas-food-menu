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

export const useGetRecommendationById = (categoryId: string) => {
  return useQuery({
    queryKey: recommendationKeys.detail(categoryId),
    queryFn: () => getRecommendationById(categoryId),
    retry: 1,
  });
};
