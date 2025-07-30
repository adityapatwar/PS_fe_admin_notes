import { apiService } from '../../../shared/services/api';
import { ApiResponse } from '../../../shared/types/api';
import {
  DashboardStatistics,
  UserAnalyticsData,
  NotesAnalyticsData,
  SystemHealth,
  RecentActivity,
  DashboardConfig,
  UpdateDashboardConfigRequest,
  AnalyticsParams,
  ActivitiesParams,
} from '../types/api';

/**
 * Dashboard API Service
 * Handles all dashboard-related API calls
 */
class DashboardApiService {
  private readonly baseUrl = '/v1/dashboard';

  /**
   * Get dashboard statistics
   */
  async getStatistics(): Promise<ApiResponse<DashboardStatistics>> {
    return apiService.get<DashboardStatistics>(`${this.baseUrl}/statistics`);
  }

  /**
   * Get user analytics data
   */
  async getUserAnalytics(params: AnalyticsParams = {}): Promise<ApiResponse<UserAnalyticsData[]>> {
    return apiService.get<UserAnalyticsData[]>(`${this.baseUrl}/analytics/users`, params);
  }

  /**
   * Get notes analytics data
   */
  async getNotesAnalytics(params: AnalyticsParams = {}): Promise<ApiResponse<NotesAnalyticsData[]>> {
    return apiService.get<NotesAnalyticsData[]>(`${this.baseUrl}/analytics/notes`, params);
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<ApiResponse<SystemHealth>> {
    return apiService.get<SystemHealth>(`${this.baseUrl}/health`);
  }

  /**
   * Get recent activities
   */
  async getRecentActivities(params: ActivitiesParams = {}): Promise<ApiResponse<RecentActivity[]>> {
    return apiService.get<RecentActivity[]>(`${this.baseUrl}/activities`, params);
  }

  /**
   * Get dashboard configuration
   */
  async getDashboardConfig(): Promise<ApiResponse<DashboardConfig>> {
    return apiService.get<DashboardConfig>(`${this.baseUrl}/config`);
  }

  /**
   * Update dashboard configuration
   */
  async updateDashboardConfig(config: UpdateDashboardConfigRequest): Promise<ApiResponse<null>> {
    return apiService.put<null>(`${this.baseUrl}/config`, config);
  }
}

export const dashboardApiService = new DashboardApiService();
