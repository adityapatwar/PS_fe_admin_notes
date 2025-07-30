import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApiService } from '../services/dashboardApiService';
import { AnalyticsParams, ActivitiesParams, UpdateDashboardConfigRequest } from '../types/api';

// Query keys for caching
export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  statistics: () => [...dashboardQueryKeys.all, 'statistics'] as const,
  userAnalytics: (params: AnalyticsParams) => [...dashboardQueryKeys.all, 'userAnalytics', params] as const,
  notesAnalytics: (params: AnalyticsParams) => [...dashboardQueryKeys.all, 'notesAnalytics', params] as const,
  systemHealth: () => [...dashboardQueryKeys.all, 'systemHealth'] as const,
  activities: (params: ActivitiesParams) => [...dashboardQueryKeys.all, 'activities', params] as const,
  config: () => [...dashboardQueryKeys.all, 'config'] as const,
};

/**
 * Hook for dashboard statistics
 */
export const useDashboardStatistics = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.statistics(),
    queryFn: async () => {
      const response = await dashboardApiService.getStatistics();
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute cache
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

/**
 * Hook for user analytics
 */
export const useUserAnalytics = (params: AnalyticsParams = { days: 30 }) => {
  return useQuery({
    queryKey: dashboardQueryKeys.userAnalytics(params),
    queryFn: async () => {
      const response = await dashboardApiService.getUserAnalytics(params);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for notes analytics
 */
export const useNotesAnalytics = (params: AnalyticsParams = { days: 30 }) => {
  return useQuery({
    queryKey: dashboardQueryKeys.notesAnalytics(params),
    queryFn: async () => {
      const response = await dashboardApiService.getNotesAnalytics(params);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for system health
 */
export const useSystemHealth = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.systemHealth(),
    queryFn: async () => {
      const response = await dashboardApiService.getSystemHealth();
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds cache
    cacheTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

/**
 * Hook for recent activities
 */
export const useRecentActivities = (params: ActivitiesParams = { limit: 20 }) => {
  return useQuery({
    queryKey: dashboardQueryKeys.activities(params),
    queryFn: async () => {
      const response = await dashboardApiService.getRecentActivities(params);
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute cache
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

/**
 * Hook for dashboard configuration
 */
export const useDashboardConfig = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.config(),
    queryFn: async () => {
      const response = await dashboardApiService.getDashboardConfig();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook for updating dashboard configuration
 */
export const useUpdateDashboardConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: UpdateDashboardConfigRequest) =>
      dashboardApiService.updateDashboardConfig(config),
    onSuccess: () => {
      // Invalidate and refetch dashboard config
      queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.config() });
    },
  });
};

/**
 * Hook to invalidate all dashboard queries
 */
export const useInvalidateDashboard = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
  };
};
