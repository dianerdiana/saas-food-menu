import { jwt } from '@/configs/api.config';

import type { ResponseApi } from '@/types/response-api.type';
import { handleErrorApi } from '@/utils/handle-error-api';

import type { StoreModel } from '../models/store.model';

export const getStoreById = async (storeId: string): Promise<ResponseApi<StoreModel>> => {
  try {
    const response = await jwt.get(`/stores/id/${storeId}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const getStoreBySlug = async (slug: string): Promise<ResponseApi<StoreModel | null>> => {
  try {
    const response = await jwt.get(`/stores/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const createStore = async (payload: FormData): Promise<ResponseApi<StoreModel>> => {
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

export const updateStore = async (payload: FormData, storeId: string): Promise<ResponseApi<StoreModel>> => {
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
