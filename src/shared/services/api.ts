import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { tokenService } from '../../features/auth/services/tokenService';

/**
 * API Response interface matching the documented format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
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

/**
 * API Configuration using Vite environment variables
 */
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 30000, // Increased timeout for dashboard queries
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create axios instance with default configuration
 */
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create(API_CONFIG);

  // Request interceptor to add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = tokenService.getToken();
      if (token && !tokenService.isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Log API requests in development
      if (import.meta.env.DEV) {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
      }
      
      return config;
    },
    (error) => {
      console.error('❌ API Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle API responses
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // Log API responses in development
      if (import.meta.env.DEV) {
        console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });
      }
      
      return response;
    },
    async (error: AxiosError<ApiResponse>) => {
      const originalRequest = error.config as any;

      // Log API errors in development
      if (import.meta.env.DEV) {
        console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data,
        });
      }

      // Handle token refresh for 401 errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const currentToken = tokenService.getToken();
          if (currentToken) {
            // Try to refresh the token
            const refreshResponse = await instance.post<ApiResponse<{ token: string }>>('/v1/auth/refresh', {
              token: currentToken,
            });

            if (refreshResponse.data.success && refreshResponse.data.data?.token) {
              const newToken = refreshResponse.data.data.token;
              tokenService.setToken(newToken);
              
              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return instance(originalRequest);
            }
          }
        } catch (refreshError) {
          // Refresh failed, clear token and redirect to login
          console.error('Token refresh failed:', refreshError);
          tokenService.removeToken();
          
          // Only redirect if we're not already on the login page
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }

      // Handle 403 Forbidden (Admin role required)
      if (error.response?.status === 403) {
        console.error('Admin role required for this action');
        // You might want to show a toast notification here
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error - API server might be down');
      }

      // Transform axios error to our API error format
      const apiError: ApiError = {
        success: false,
        message: error.response?.data?.message || error.message || 'An unexpected error occurred',
        data: null,
        status: error.response?.status,
      };

      return Promise.reject(apiError);
    }
  );

  return instance;
};

/**
 * API service class with typed methods
 */
class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = createApiInstance();
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * Update base URL (useful for environment switching)
   */
  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }

  /**
   * Get current base URL
   */
  getBaseURL(): string {
    return this.instance.defaults.baseURL || '';
  }

  /**
   * Get axios instance for advanced usage
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const apiService = new ApiService();
