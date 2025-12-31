import { jwt } from '@/configs/api.config';

import type { PaginationType } from '@/types/pagination';
import type { ResponseApi } from '@/types/response-api.type';
import { handleErrorApi } from '@/utils/handle-error-api';

import type { Product } from '../types/product.type';

export const getAllProduct = async (params: PaginationType): Promise<ResponseApi<Product[]>> => {
  try {
    const response = await jwt.get<ResponseApi<Product[]>>('/products', { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getProductById = async (productId: string): Promise<ResponseApi<Product>> => {
  try {
    const response = await jwt.get(`/products/id/${productId}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const createProduct = async (payload: FormData): Promise<ResponseApi<Product>> => {
  try {
    const response = await jwt.post('/products', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const updateProduct = async (payload: FormData, productId: string): Promise<ResponseApi<Product>> => {
  try {
    const response = await jwt.put(`/products/${productId}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await jwt.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};
