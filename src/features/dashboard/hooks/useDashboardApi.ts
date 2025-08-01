import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApiService } from '../services/dashboardApiService';
import { 
  DashboardStatistics, 
  UserAnalyticsData, 
  NotesAnalyticsData, 
  SystemHealth, 
  RecentActivitiesData,
  DashboardConfig,
  UpdateDashboardConfigRequest,
  AnalyticsParams,
  ActivitiesParams
} from '../types/api';

// API Hook functions using real API service
export const useDashboardStatistics = () => {
  return useQuery({
    queryKey: ['dashboard-statistics'],
    queryFn: () => dashboardApiService.getStatistics(),
    select: (response) => response.data,
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useUserAnalytics = (params?: AnalyticsParams) => {
  return useQuery({
    queryKey: ['user-analytics', params],
    queryFn: () => dashboardApiService.getUserAnalytics(params),
    select: (response) => response.data,
    refetchInterval: 60000, // Refresh every minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useNotesAnalytics = (params?: AnalyticsParams) => {
  return useQuery({
    queryKey: ['notes-analytics', params],
    queryFn: () => dashboardApiService.getNotesAnalytics(params),
    select: (response) => response.data,
    refetchInterval: 60000, // Refresh every minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: () => dashboardApiService.getSystemHealth(),
    select: (response) => response.data,
    refetchInterval: 15000, // Refresh every 15 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useRecentActivities = (params?: ActivitiesParams) => {
  return useQuery({
    queryKey: ['recent-activities', params],
    queryFn: () => dashboardApiService.getRecentActivities(params),
    select: (response) => response.data,
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useDashboardConfig = () => {
  return useQuery({
    queryKey: ['dashboard-config'],
    queryFn: () => dashboardApiService.getDashboardConfig(),
    select: (response) => response.data,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useUpdateDashboardConfig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (config: UpdateDashboardConfigRequest) => 
      dashboardApiService.updateDashboardConfig(config),
    onSuccess: (response) => {
      // Update the cache with new config
      queryClient.setQueryData(['dashboard-config'], response);
      // Optionally refetch related queries
      queryClient.invalidateQueries({ queryKey: ['dashboard-config'] });
    },
    onError: (error) => {
      console.error('Failed to update dashboard config:', error);
    },
  });
};

// Utility hook to refresh all dashboard data
export const useRefreshDashboard = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['dashboard-statistics'] });
    queryClient.invalidateQueries({ queryKey: ['user-analytics'] });
    queryClient.invalidateQueries({ queryKey: ['notes-analytics'] });
    queryClient.invalidateQueries({ queryKey: ['system-health'] });
    queryClient.invalidateQueries({ queryKey: ['recent-activities'] });
  };
};
