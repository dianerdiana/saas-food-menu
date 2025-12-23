export interface JwtAuthPayload {
  sub: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}
