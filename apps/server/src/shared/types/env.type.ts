export interface EnvironmentInterface {
  nodeEnv: string;
  host: string;
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpire: string;
    refreshTokenExpire: string;
  };
  bucket: {
    gcpProjectId: string;
    gcpClientEmail: string;
    gcpPrivateKey: string;
    gcpBucketName: string;
  };
  image: {
    baseUrl: string;
  };
}
