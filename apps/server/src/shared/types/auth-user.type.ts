export interface AuthUser {
  userId: string;
  email: string;
  username: string;
  storeId: string;
  storeName: string;
  iat?: number;
  exp?: number;
}
