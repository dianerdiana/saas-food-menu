import { jwt } from '@/configs/api.config';

import type { ResponseApi } from '@/types/response-api.type';
import { handleErrorApi } from '@/utils/handle-error-api';

import type { Category } from '../types/category.type';

export const getAllCategory = async (): Promise<ResponseApi<Category[]>> => {
  try {
    const response = await jwt.get<ResponseApi<Category[]>>('/categories');
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const createCategory = async (payload: FormData): Promise<ResponseApi<Category>> => {
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
