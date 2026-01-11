import { createApi } from './auth/api-service';
import { createJwt } from './auth/jwt-service';
import { env } from './env.config';

export const api = createApi({ baseURL: env.BASE_API_URL });
export const jwt = createJwt({ baseURL: env.BASE_JWT_URL });
