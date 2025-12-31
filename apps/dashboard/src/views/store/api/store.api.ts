import { jwt } from '@/configs/api.config';

import type { PaginationType } from '@/types/pagination';
import type { ResponseApi } from '@/types/response-api.type';
import { handleErrorApi } from '@/utils/handle-error-api';

import type { Store } from '../types/store.type';

export const getAllStore = async (params: PaginationType): Promise<ResponseApi<Store[]>> => {
  try {
    const response = await jwt.get<ResponseApi<Store[]>>('/stores', { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};
export const getStoreById = async (storeId: string): Promise<ResponseApi<Store>> => {
  try {
    const response = await jwt.get(`/stores/id/${storeId}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const getStoreBySlug = async (slug: string): Promise<ResponseApi<Store | null>> => {
  try {
    const response = await jwt.get(`/stores/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const createStore = async (payload: FormData): Promise<ResponseApi<Store>> => {
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

export const updateStore = async (payload: FormData, storeId: string): Promise<ResponseApi<Store>> => {
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
