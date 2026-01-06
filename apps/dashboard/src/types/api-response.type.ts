import { RESPONSE_STATUS } from '@/utils/constants/response-status';

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  status?: keyof typeof RESPONSE_STATUS;
  message?: string;
  data?: T;
  statusCode?: number;
  meta?: PaginationMeta;
};
