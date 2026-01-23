import { EnvironmentInterface } from '../../shared/types/env.type';

export default (): EnvironmentInterface => ({
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'production',
  database: {
    host: process.env.DB_HOST || 'postgres',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER || 'postgress',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'postgres',
  },
  jwt: {
    accessToken: process.env.ACCESS_TOKEN_KEY || 'accessToken',
    refreshToken: process.env.REFRESH_TOKEN_KEY || 'refreshToken',
    accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE || '1h',
    refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || '7d',
  },
  bucket: {
    gcpProjectId: process.env.GCP_PROJECT_ID || '',
    gcpClientEmail: process.env.GCP_CLIENT_EMAIL || '',
    gcpPrivateKey: process.env.GCP_PRIVATE_KEY || '',
    gcpBucketName: process.env.GCP_BUCKET_NAME || '',
  },
  image: {
    baseUrl: process.env.IMAGE_BASE_URL || '',
  },
});
