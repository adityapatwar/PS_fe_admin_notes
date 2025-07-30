import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenService = {
  /**
   * Store authentication token
   */
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Get stored authentication token
   */
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Remove authentication token
   */
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Store refresh token
   */
  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Get stored refresh token
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Set both access and refresh tokens
   */
  setTokens: (accessToken: string, refreshToken?: string): void => {
    tokenService.setToken(accessToken);
    if (refreshToken) {
      tokenService.setRefreshToken(refreshToken);
    }
  },

  /**
   * Clear all stored tokens
   */
  clearAll: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Get access token (alias for getToken)
   */
  getAccessToken: (): string | null => {
    return tokenService.getToken();
  },

  /**
   * Set user data in localStorage
   */
  setUser: (user: User): void => {
    localStorage.setItem('user_data', JSON.stringify(user));
  },

  /**
   * Get user data from localStorage
   */
  getStoredUser: (): User | null => {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to parse stored user data:', error);
      return null;
    }
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Add 30 seconds buffer to account for clock skew
      return payload.exp < (currentTime + 30);
    } catch (error) {
      console.error('Failed to parse token:', error);
      return true; // If we can't parse the token, consider it expired
    }
  },

  /**
   * Get user data from JWT token
   */
  getUserFromToken: (token: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      return {
        id: payload.sub || payload.id || payload.user_id,
        email: payload.email,
        firstName: payload.first_name || payload.firstName || '',
        lastName: payload.last_name || payload.lastName || '',
        role: payload.role || 'user',
        isActive: payload.is_active !== false && payload.isActive !== false,
        createdAt: new Date(payload.created_at || payload.createdAt || payload.iat * 1000),
        lastLoginAt: payload.last_login_at ? new Date(payload.last_login_at) : new Date(),
        avatar: payload.avatar,
      };
    } catch (error) {
      console.error('Failed to parse user from token:', error);
      return null;
    }
  },

  /**
   * Get token expiration time
   */
  getTokenExpiration: (token: string): Date | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      console.error('Failed to get token expiration:', error);
      return null;
    }
  },

  /**
   * Get time until token expires (in seconds)
   */
  getTimeUntilExpiration: (token: string): number => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return Math.max(0, payload.exp - currentTime);
    } catch (error) {
      console.error('Failed to calculate time until expiration:', error);
      return 0;
    }
  },

  /**
   * Get authorization header for API requests
   */
  getAuthHeader: (): Record<string, string> => {
    const token = tokenService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
