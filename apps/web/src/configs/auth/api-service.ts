/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { env } from '../env.config';

export type ApiServiceConfig = {
  baseURL?: string;
};

export class ApiService {
  axin: AxiosInstance;

  constructor({ baseURL }: ApiServiceConfig = {}) {
    this.axin = axios.create({
      baseURL: baseURL || env.BASE_API_URL || '',
    });
  }

  get<TResponse = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TResponse>> {
    return this.axin.get(url, config);
  }

  post<TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axin.post(url, data, config);
  }

  put<TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axin.put(url, data, config);
  }

  delete<TResponse = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<TResponse>> {
    return this.axin.delete(url, config);
  }
}

export const createApi = ({ baseURL }: ApiServiceConfig) => {
  return new ApiService({ baseURL });
};
