import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { 
  AnalyticsParams, 
  ActivitiesParams, 
  UpdateDashboardConfigRequest 
} from '../types/api';

// Legacy hooks for backward compatibility
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardService.getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: dashboardService.getRecentActivity,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

// New hooks using real API endpoints
export const useDashboardStatistics = () => {
  return useQuery({
    queryKey: ['dashboardStatistics'],
    queryFn: dashboardService.getDashboardStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUserAnalytics = (params: AnalyticsParams = {}) => {
  return useQuery({
    queryKey: ['userAnalytics', params],
    queryFn: () => dashboardService.getUserAnalytics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useNotesAnalytics = (params: AnalyticsParams = {}) => {
  return useQuery({
    queryKey: ['notesAnalytics', params],
    queryFn: () => dashboardService.getNotesAnalytics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['systemHealth'],
    queryFn: dashboardService.getSystemHealth,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export const useRecentActivities = (params: ActivitiesParams = {}) => {
  return useQuery({
    queryKey: ['recentActivities', params],
    queryFn: () => dashboardService.getRecentActivities(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

export const useDashboardConfig = () => {
  return useQuery({
    queryKey: ['dashboardConfig'],
    queryFn: dashboardService.getDashboardConfig,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useUpdateDashboardConfig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (config: UpdateDashboardConfigRequest) => 
      dashboardService.updateDashboardConfig(config),
    onSuccess: () => {
      // Invalidate and refetch dashboard config
      queryClient.invalidateQueries({ queryKey: ['dashboardConfig'] });
    },
  });
};
