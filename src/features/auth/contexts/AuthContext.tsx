import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthState, AuthAction } from '../types';
import { authService } from '../services/authService';
import { tokenService } from '../services/tokenService';

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

/**
 * Authentication state reducer
 */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload.error,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };
    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component
 * Manages authentication state and provides auth methods to the app
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Initialize authentication state on app load
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: 'AUTH_START' });
        
        const token = tokenService.getToken();
        
        if (token && !tokenService.isTokenExpired(token)) {
          // Token exists and is valid, restore user session
          const userData = tokenService.getUserFromToken(token);
          if (userData) {
            // Restore user from token without API call
            dispatch({ type: 'AUTH_SUCCESS', payload: { user: userData } });
            return;
          }
        }
        
        // No valid token found, clear any stored data
        tokenService.removeToken();
        dispatch({ type: 'AUTH_LOGOUT' });
      } catch (error) {
        console.error('Auth initialization error:', error);
        tokenService.removeToken();
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with email and password
   */
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.login({ email, password });
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: response.user } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: { error: errorMessage } });
      throw error;
    }
  }, []);

  /**
   * Logout user and clear session
   */
  const logout = useCallback((): void => {
    authService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
  }, []);

  /**
   * Clear authentication error
   */
  const clearError = useCallback((): void => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  }, []);

  /**
   * Refresh user data from server
   */
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: { user } });
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      // If refresh fails, logout user
      logout();
    }
  }, [logout]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = Boolean(state.user);

  /**
   * Check if user has admin role
   */
  const isAdmin = useCallback((): boolean => {
    return state.user?.role === 'admin' || false;
  }, [state.user]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback((role: string): boolean => {
    return state.user?.role === role || false;
  }, [state.user]);

  /**
   * Check if user has specific permission
   */
  const hasPermission = useCallback((permission: string): boolean => {
    // Simple permission check based on role
    if (!state.user) return false;
    
    switch (state.user.role) {
      case 'admin':
        return true; // Admin has all permissions
      case 'moderator':
        return ['read', 'write', 'moderate'].includes(permission);
      case 'user':
        return ['read'].includes(permission);
      default:
        return false;
    }
  }, [state.user]);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
    refreshUser,
    isAuthenticated,
    isAdmin,
    hasRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use authentication context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
