export interface JwtAuthPayload {
  sub: string;
  email: string;
  username: string;
  iat?: string;
  exp?: string;
}
