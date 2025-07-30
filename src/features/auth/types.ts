export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'moderator' | 'user';
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User } }
  | { type: 'AUTH_FAILURE'; payload: { error: string } }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' };

/**
 * JWT Token payload structure
 */
export interface JWTPayload {
  sub: string; // User ID
  email: string;
  role: string;
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  avatar?: string;
}
