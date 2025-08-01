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
    return apiService.get<DashboardStatistics>(`${this.baseUrl}/statistics`);
  }

  /**
   * Get user analytics data
   * GET /api/v1/dashboard/analytics/users
   */
  async getUserAnalytics(params: AnalyticsParams = {}): Promise<ApiResponse<UserAnalyticsData>> {
    return apiService.get<UserAnalyticsData>(`${this.baseUrl}/analytics/users`, { params });
  }

  /**
   * Get notes analytics data
   * GET /api/v1/dashboard/analytics/notes
   */
  async getNotesAnalytics(params: AnalyticsParams = {}): Promise<ApiResponse<NotesAnalyticsData>> {
    return apiService.get<NotesAnalyticsData>(`${this.baseUrl}/analytics/notes`, { params });
  }

  /**
   * Get system health status
   * GET /api/v1/dashboard/health
   */
  async getSystemHealth(): Promise<ApiResponse<SystemHealth>> {
    return apiService.get<SystemHealth>(`${this.baseUrl}/health`);
  }

  /**
   * Get recent activities
   * GET /api/v1/dashboard/activities
   */
  async getRecentActivities(params: ActivitiesParams = {}): Promise<ApiResponse<RecentActivitiesData>> {
    const defaultParams = { page: 1, limit: 20, ...params };
    return apiService.get<RecentActivitiesData>(`${this.baseUrl}/activities`, { params: defaultParams });
  }

  /**
   * Get dashboard configuration
   * GET /api/v1/dashboard/config
   */
  async getDashboardConfig(): Promise<ApiResponse<DashboardConfig>> {
    return apiService.get<DashboardConfig>(`${this.baseUrl}/config`);
  }

  /**
   * Update dashboard configuration
   * PUT /api/v1/dashboard/config
   */
  async updateDashboardConfig(config: UpdateDashboardConfigRequest): Promise<ApiResponse<DashboardConfig>> {
    return apiService.put<DashboardConfig>(`${this.baseUrl}/config`, config);
  }
}

export const dashboardApiService = new DashboardApiService();
