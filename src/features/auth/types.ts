/**
 * User interface representing a user in the system
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'moderator' | 'user';
  isActive: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  avatar?: string;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Authentication response from login
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Authentication state for context
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Authentication actions for reducer
 */
export type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User } }
  | { type: 'AUTH_FAILURE'; payload: { error: string } }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' };

/**
 * JWT Token payload interface
 */
export interface TokenPayload {
  sub: string; // user ID
  email: string;
  role: 'admin' | 'moderator' | 'user';
  exp: number; // expiration timestamp
  iat: number; // issued at timestamp
}

/**
 * API Error interface
 */
export interface ApiError {
  success: false;
  message: string;
  data: null;
  status?: number;
}
