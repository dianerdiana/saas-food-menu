import { jwt } from '@/configs/api.config';

import type { ApiResponse } from '@/types/api-response.type';
import type { PaginationType } from '@/types/pagination';
import { handleErrorApi } from '@/utils/handle-error-api';

import type { Category } from '../types/category.type';

export const getAllCategory = async (params?: PaginationType): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await jwt.get<ApiResponse<Category[]>>('/categories', { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getCategoryById = async (categoryId: string): Promise<ApiResponse<Category>> => {
  try {
    const response = await jwt.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const createCategory = async (payload: FormData): Promise<ApiResponse<Category>> => {
  try {
    const response = await jwt.post('/categories', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const updateCategory = async (payload: FormData, categoryId: string): Promise<ApiResponse<Category>> => {
  try {
    const response = await jwt.put(`/categories/${categoryId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await jwt.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};
