import { HttpStatus } from '@nestjs/common';
import { RESPONSE_STATUS } from '../constants/response-status.constant';

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export class Response<T> {
  status: string;
  message?: string;
  data?: T;
  statusCode: number;
  meta?: PaginationMeta;

  constructor({
    status = RESPONSE_STATUS.success,
    message,
    data,
    statusCode = HttpStatus.OK,
    meta,
  }: {
    status: string;
    data?: any;
    message?: string;
    statusCode: number;
    meta?: PaginationMeta;
  }) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.meta = meta;
  }
}
