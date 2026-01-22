import { api } from "@/configs/api.config";
import type { ApiResponse } from "@/types/api-response";
import { handleErrorApi } from "@/utils/handle-error-api";
import type { Category } from "@/views/category/types/category";
import type { RecommendationWithProductList } from "@/views/recommendation/types/recommendation-type";
import type { Store } from "@/views/store/types/store.type";

export const getHomeData = async (
  storeName: string,
): Promise<
  ApiResponse<{
    store: Store;
    categories: Category[];
    recommendations: RecommendationWithProductList[];
  }>
> => {
  try {
    const response = await api.get(`/web/stores/${storeName}`);
    return response.data;
  } catch (error) {
    return handleErrorApi(error);
  }
};
