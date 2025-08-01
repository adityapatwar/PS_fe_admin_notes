import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardService.getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
  });
};

// Add the missing export for useDashboardStatistics
export const useDashboardStatistics = () => {
  return useQuery({
    queryKey: ['dashboardStatistics'],
    queryFn: dashboardService.getDashboardStatistics,
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

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: dashboardService.getRecentActivity,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

// Add the missing export for useRecentActivities (alias for useRecentActivity)
export const useRecentActivities = (params?: { limit?: number }) => {
  return useQuery({
    queryKey: ['recentActivities', params],
    queryFn: () => dashboardService.getRecentActivity(),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

// Add the missing export for useUserAnalytics
export const useUserAnalytics = (params?: { days?: number }) => {
  return useQuery({
    queryKey: ['userAnalytics', params],
    queryFn: () => dashboardService.getUserAnalytics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Add the missing export for useNotesAnalytics
export const useNotesAnalytics = (params?: { days?: number }) => {
  return useQuery({
    queryKey: ['notesAnalytics', params],
    queryFn: () => dashboardService.getNotesAnalytics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
