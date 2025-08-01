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
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
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
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle API responses
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // Return the response as-is for successful requests
      return response;
    },
    async (error: AxiosError<ApiResponse>) => {
      const originalRequest = error.config as any;

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
          tokenService.removeToken();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
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
}

// Export singleton instance
export const apiService = new ApiService();
