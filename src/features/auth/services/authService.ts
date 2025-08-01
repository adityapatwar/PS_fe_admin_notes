import { User, LoginRequest, AuthResponse } from '../types';
import { apiService } from '../../../shared/services/api';
import { tokenService } from './tokenService';

/**
 * Parse user data from API response
 */
const parseUserFromApiResponse = (userData: any): User => {
  return {
    id: userData.id,
    email: userData.email,
    firstName: userData.first_name || userData.firstName || '',
    lastName: userData.last_name || userData.lastName || '',
    role: userData.role || 'user',
    isActive: userData.is_active !== false,
    createdAt: new Date(userData.created_at || userData.createdAt || Date.now()),
    lastLoginAt: userData.last_login_at ? new Date(userData.last_login_at) : new Date(),
    avatar: userData.avatar,
  };
};

/**
 * Simulate API delay for development
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  /**
   * Login user with email and password
   * Implements /api/v1/auth/login endpoint
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiService.post<{ token: string }>('/v1/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      if (!response.success || !response.data?.token) {
        throw new Error(response.message || 'Login failed');
      }

      const token = response.data.token;
      
      // Parse user data from JWT token
      const userData = tokenService.getUserFromToken(token);
      if (!userData) {
        throw new Error('Invalid token received from server');
      }

      // Store token
      tokenService.setToken(token);

      return {
        user: userData,
        token,
      };
    } catch (error: any) {
      // Handle API errors with proper status codes
      if (error.status === 401) {
        throw new Error('Invalid email or password');
      } else if (error.status === 400) {
        throw new Error(error.message || 'Please provide valid email and password');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  },

  /**
   * Logout user
   * Note: No server-side logout endpoint as per API documentation
   */
  logout: async (): Promise<void> => {
    await delay(300); // Small delay for UX
    tokenService.removeToken();
  },

  /**
   * Get current user profile from token
   */
  getCurrentUser: async (): Promise<User> => {
    const token = tokenService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    if (tokenService.isTokenExpired(token)) {
      throw new Error('Authentication token expired');
    }

    const userData = tokenService.getUserFromToken(token);
    if (!userData) {
      throw new Error('Invalid authentication token');
    }

    return userData;
  },

  /**
   * Refresh authentication token
   * Implements /api/v1/auth/refresh endpoint
   */
  refreshToken: async (): Promise<string> => {
    try {
      const currentToken = tokenService.getToken();
      if (!currentToken) {
        throw new Error('No token to refresh');
      }

      const response = await apiService.post<{ token: string }>('/v1/auth/refresh', {
        token: currentToken,
      });

      if (!response.success || !response.data?.token) {
        throw new Error(response.message || 'Token refresh failed');
      }

      const newToken = response.data.token;
      
      // Store new token
      tokenService.setToken(newToken);

      return newToken;
    } catch (error: any) {
      // Handle refresh errors
      if (error.status === 401) {
        // Token is invalid, clear it and force re-login
        tokenService.removeToken();
        throw new Error('Session expired. Please log in again.');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to refresh session. Please log in again.');
      }
    }
  },

  /**
   * Update user profile (placeholder for future implementation)
   */
  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay(1000);
    throw new Error('Profile update not yet implemented');
  },

  /**
   * Change user password (placeholder for future implementation)
   */
  changePassword: async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
    await delay(1000);
    throw new Error('Password change not yet implemented');
  },

  /**
   * Request password reset (placeholder for future implementation)
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    await delay(1000);
    throw new Error('Password reset not yet implemented');
  },

  /**
   * Verify email address (placeholder for future implementation)
   */
  verifyEmail: async (token: string): Promise<void> => {
    await delay(1000);
    throw new Error('Email verification not yet implemented');
  },
};
