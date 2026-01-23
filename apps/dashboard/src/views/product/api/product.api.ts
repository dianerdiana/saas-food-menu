import { jwt } from '@/configs/api.config';

import type { ApiResponse } from '@/types/api-response.type';
import type { PaginationType } from '@/types/pagination';
import { handleErrorApi } from '@/utils/handle-error-api';

import type { Product, ProductWithCategory } from '../types/product.type';

export const getAllProduct = async (params: PaginationType): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await jwt.get<ApiResponse<Product[]>>('/products', { params });
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getProductById = async (productId: string): Promise<ApiResponse<ProductWithCategory>> => {
  try {
    const response = await jwt.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw handleErrorApi(error);
  }
};

export const createProduct = async (payload: FormData): Promise<ApiResponse<Product>> => {
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

export const updateProduct = async (payload: FormData, productId: string): Promise<ApiResponse<Product>> => {
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
