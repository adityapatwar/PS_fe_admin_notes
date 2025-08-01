import { apiService } from '../../../shared/services/api';
import { ApiResponse } from '../../../shared/types/api';
import {
  DashboardStatistics,
  UserAnalyticsData,
  NotesAnalyticsData,
  SystemHealth,
  RecentActivitiesData,
  DashboardConfig,
  UpdateDashboardConfigRequest,
  AnalyticsParams,
  ActivitiesParams,
} from '../types/api';

/**
 * Dashboard API Service
 * Handles all dashboard-related API calls based on real API documentation
 */
class DashboardApiService {
  private readonly baseUrl = '/v1/dashboard';

  /**
   * Get dashboard statistics
   * GET /api/v1/dashboard/statistics
   */
  async getStatistics(): Promise<ApiResponse<DashboardStatistics>> {
    try {
      return await apiService.get<DashboardStatistics>(`${this.baseUrl}/statistics`);
    } catch (error) {
      console.error('Failed to fetch dashboard statistics:', error);
      throw error;
    }
  }

  /**
   * Get user analytics data
   * GET /api/v1/dashboard/analytics/users
   */
  async getUserAnalytics(params: AnalyticsParams = {}): Promise<ApiResponse<UserAnalyticsData>> {
    try {
      return await apiService.get<UserAnalyticsData>(`${this.baseUrl}/analytics/users`, { params });
    } catch (error) {
      console.error('Failed to fetch user analytics:', error);
      throw error;
    }
  }

  /**
   * Get notes analytics data
   * GET /api/v1/dashboard/analytics/notes
   */
  async getNotesAnalytics(params: AnalyticsParams = {}): Promise<ApiResponse<NotesAnalyticsData>> {
    try {
      return await apiService.get<NotesAnalyticsData>(`${this.baseUrl}/analytics/notes`, { params });
    } catch (error) {
      console.error('Failed to fetch notes analytics:', error);
      throw error;
    }
  }

  /**
   * Get system health status
   * GET /api/v1/dashboard/health
   */
  async getSystemHealth(): Promise<ApiResponse<SystemHealth>> {
    try {
      return await apiService.get<SystemHealth>(`${this.baseUrl}/health`);
    } catch (error) {
      console.error('Failed to fetch system health:', error);
      throw error;
    }
  }

  /**
   * Get recent activities
   * GET /api/v1/dashboard/activities
   */
  async getRecentActivities(params: ActivitiesParams = {}): Promise<ApiResponse<RecentActivitiesData>> {
    try {
      const defaultParams = { page: 1, limit: 20, ...params };
      return await apiService.get<RecentActivitiesData>(`${this.baseUrl}/activities`, { params: defaultParams });
    } catch (error) {
      console.error('Failed to fetch recent activities:', error);
      throw error;
    }
  }

  /**
   * Get dashboard configuration
   * GET /api/v1/dashboard/config
   */
  async getDashboardConfig(): Promise<ApiResponse<DashboardConfig>> {
    try {
      return await apiService.get<DashboardConfig>(`${this.baseUrl}/config`);
    } catch (error) {
      console.error('Failed to fetch dashboard config:', error);
      throw error;
    }
  }

  /**
   * Update dashboard configuration
   * PUT /api/v1/dashboard/config
   */
  async updateDashboardConfig(config: UpdateDashboardConfigRequest): Promise<ApiResponse<DashboardConfig>> {
    try {
      return await apiService.put<DashboardConfig>(`${this.baseUrl}/config`, config);
    } catch (error) {
      console.error('Failed to update dashboard config:', error);
      throw error;
    }
  }
}

export const dashboardApiService = new DashboardApiService();
