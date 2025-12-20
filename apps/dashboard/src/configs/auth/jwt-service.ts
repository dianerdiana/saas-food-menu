import axios from 'axios';
import { ApiService } from './api-service';
import jwtDefaultConfig from './jwt-default-config';
import { env } from '../env.config';

export type JwtServiceConfig = {
  baseURL?: string;
  tokenType?: string;
  storageTokenKeyName?: string;
};

export class JwtService extends ApiService {
  jwtConfig = { ...jwtDefaultConfig };

  constructor({ baseURL, ...overrideServiceConfig }: JwtServiceConfig) {
    super({ baseURL });
    this.jwtConfig = { ...this.jwtConfig, ...overrideServiceConfig };

    this.axin = axios.create({
      baseURL: this.jwtConfig.baseURL || env.BASE_API_URL || '',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axin.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken();
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axin.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
      },
    );
  }

  getToken() {
    try {
      return JSON.parse(localStorage.getItem(this.jwtConfig.storageTokenKeyName) || '""');
    } catch {
      return null;
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
  }
}

export const createJwt = (jwtConfig: JwtServiceConfig) => {
  return new JwtService(jwtConfig);
};
