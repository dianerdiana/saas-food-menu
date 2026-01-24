import { api } from "@/configs/api.config";
import type {
  Category,
  CategoryWithProductList,
} from "@/views/category/types/category";
import type { ProductWithCategories } from "@/views/product/types/product";
import type { RecommendationWithProductList } from "@/views/recommendation/types/recommendation-type";
import type { Store } from "@/views/store/types/store.type";

import type { ApiResponse } from "@/types/api-response";
import { handleErrorApi } from "@/utils/handle-error-api";

export const getHomeData = async (
  storeSlug: string,
): Promise<
  ApiResponse<{
    store: Store;
    categories: Category[];
    recommendations: RecommendationWithProductList[];
  }>
> => {
  try {
    const response = await api.get(`/stores/${storeSlug}`);
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getStoreProduct = async (
  storeSlug: string,
  productSlug: string,
): Promise<
  ApiResponse<{
    store: Store;
    product: ProductWithCategories;
  }>
> => {
  try {
    const response = await api.get(
      `/stores/${storeSlug}/products/${productSlug}`,
    );
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};

export const getStoreProductList = async (
  storeSlug: string,
): Promise<
  ApiResponse<{
    store: Store;
    categories: Category[];
    categoryProducts: CategoryWithProductList[];
  }>
> => {
  try {
    const response = await api.get(`/stores/${storeSlug}/products`);
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};
