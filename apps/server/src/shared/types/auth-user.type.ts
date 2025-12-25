export interface AuthUser {
  userId: string;
  email: string;
  username: string;
  storeId: string;
  iat?: number;
  exp?: number;
}
