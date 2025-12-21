import { EnvironmentInterface } from '@/shared/types/env.type';

export default (): EnvironmentInterface => ({
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',
  database: {
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'postgres',
  },
  jwt: {
    accessToken: process.env.ACCESS_TOKEN_KEY || 'accessToken',
    refreshToken: process.env.REFRESH_TOKEN_KEY || 'refreshToken',
  },
});
