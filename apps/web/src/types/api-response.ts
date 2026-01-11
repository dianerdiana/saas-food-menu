export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  status?: "success" | "error";
  message?: string;
  data?: T;
  statusCode?: number;
  meta?: PaginationMeta;
};
