export interface AuthUser {
  userId: string;
  email: string;
  username: string;
  storeId?: string | null;
  iat?: number;
  exp?: number;
}
