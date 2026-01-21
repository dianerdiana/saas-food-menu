import { jwt } from '@/configs/api.config';

import type { ApiResponse } from '@/types/api-response.type';
import type { PaginationType } from '@/types/pagination';
import { handleErrorApi } from '@/utils/handle-error-api';
import type { Category } from '@/views/category/types/category.type';
import type { Product } from '@/views/product/types/product.type';

import type { Store } from '../types/store.type';

export const getAllStore = async (params: PaginationType): Promise<ApiResponse<Store[]>> => {
  try {
    const response = await jwt.get<ApiResponse<Store[]>>('/stores', { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getStoreCategories = async (params: PaginationType, storeId: string): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await jwt.get<ApiResponse<Category[]>>(`/stores/${storeId}/categories`, { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getStoreProducts = async (params: PaginationType, storeId: string): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await jwt.get<ApiResponse<Product[]>>(`/stores/${storeId}/products`, { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getStoreSelectData = async (params: PaginationType): Promise<ApiResponse<Store[]>> => {
  try {
    const response = await jwt.get<ApiResponse<Store[]>>('/stores/select-data', { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getStoreById = async (storeId: string): Promise<ApiResponse<Store>> => {
  try {
    const response = await jwt.get(`/stores/${storeId}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const getStoreBySlug = async (slug: string): Promise<ApiResponse<Store | null>> => {
  try {
    const response = await jwt.get(`/stores/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const createStore = async (payload: FormData): Promise<ApiResponse<Store>> => {
  try {
    const response = await jwt.post('/stores', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const updateStore = async (payload: FormData, storeId: string): Promise<ApiResponse<Store>> => {
  try {
    const response = await jwt.put(`/stores/${storeId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const deleteStore = async (store: string) => {
  try {
    const response = await jwt.delete(`/stores/${store}`);
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};
