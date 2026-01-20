import { createJwt } from './auth/jwt-service';
import { env } from './env.config';

export const jwt = createJwt({ baseURL: env.BASE_JWT_URL });
