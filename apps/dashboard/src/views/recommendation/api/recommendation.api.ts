import { jwt } from '@/configs/api.config';

import type { ApiResponse } from '@/types/api-response.type';
import type { PaginationType } from '@/types/pagination';
import { handleErrorApi } from '@/utils/handle-error-api';

import type { Recommendation } from '../types/recommendation.type';

export const getAllRecommendation = async (params: PaginationType): Promise<ApiResponse<Recommendation[]>> => {
  try {
    const response = await jwt.get<ApiResponse<Recommendation[]>>('/recommendations', { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getRecommendationById = async (recommendationId: string): Promise<ApiResponse<Recommendation>> => {
  try {
    const response = await jwt.get(`/recommendations/id/${recommendationId}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const createRecommendation = async (payload: FormData): Promise<ApiResponse<Recommendation>> => {
  try {
    const response = await jwt.post('/recommendations', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const updateRecommendation = async (
  payload: FormData,
  recommendationId: string,
): Promise<ApiResponse<Recommendation>> => {
  try {
    const response = await jwt.put(`/recommendations/${recommendationId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const deleteRecommendation = async (recommendationId: string) => {
  try {
    const response = await jwt.delete(`/recommendations/${recommendationId}`);
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};
