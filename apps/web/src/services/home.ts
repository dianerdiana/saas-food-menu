import { api } from "@/configs/api.config";
import type { ApiResponse } from "@/types/api-response";

export const getHomeData = async () => {
  try {
    const response = await api.get<ApiResponse<{}>>("/bff/stores/papagesha");
    return response.data;
  } catch (error) {
    return error;
  }
};
