import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { 
  User, 
  UserNote, 
  CreateUserRequest, 
  UpdateUserRequest, 
  ChangeRoleRequest,
  UserStats, 
  PaginationParams,
  UsersListResponse,
  UsersStatsResponse
} from '../types';

/**
 * Hook for fetching paginated users list
 */
export const useUsers = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // Keep previous data while fetching new page
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors (no users found)
      if (error?.status === 404 || error?.code === 404) return false;
      return failureCount < 3;
    },
  });
};

/**
 * Hook for fetching users with statistics
 */
export const useUsersWithStats = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: ['usersWithStats', params],
    queryFn: () => userService.getUsersWithStats(params),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors (no users found)
      if (error?.status === 404 || error?.code === 404) return false;
      return failureCount < 3;
    },
  });
};

/**
 * Hook for fetching single user by ID
 */
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors
      if (error?.status === 404 || error?.code === 404) return false;
      return failureCount < 3;
    },
  });
};

/**
 * Hook for fetching user notes
 */
export const useUserNotes = (userId: string) => {
  return useQuery({
    queryKey: ['userNotes', userId],
    queryFn: () => userService.getUserNotes(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook for fetching user statistics
 */
export const useUserStats = () => {
  return useQuery({
    queryKey: ['userStats'],
    queryFn: userService.getUserStats,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false, // Don't refetch on window focus for stats
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors (no users found)
      if (error?.status === 404 || error?.code === 404) return false;
      return failureCount < 3;
    },
  });
};

/**
 * Hook for creating new user
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      // Invalidate and refetch users data
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['usersWithStats']);
      queryClient.invalidateQueries(['userStats']);
    },
    onError: (error: any) => {
      console.error('Failed to create user:', error);
    },
  });
};

/**
 * Hook for updating user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: UpdateUserRequest }) => 
      userService.updateUser(userId, userData),
    onSuccess: (data, variables) => {
      // Update specific user in cache
      queryClient.setQueryData(['user', variables.userId], data);
      
      // Invalidate related queries
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['usersWithStats']);
      queryClient.invalidateQueries(['userStats']);
    },
    onError: (error: any) => {
      console.error('Failed to update user:', error);
    },
  });
};

/**
 * Hook for deleting user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: (_, deletedUserId) => {
      // Remove user from cache
      queryClient.removeQueries(['user', deletedUserId]);
      
      // Invalidate lists and stats
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['usersWithStats']);
      queryClient.invalidateQueries(['userStats']);
    },
    onError: (error: any) => {
      console.error('Failed to delete user:', error);
    },
  });
};

/**
 * Hook for changing user role
 */
export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, roleData }: { userId: string; roleData: ChangeRoleRequest }) => 
      userService.changeUserRole(userId, roleData),
    onSuccess: (data, variables) => {
      // Update specific user in cache
      queryClient.setQueryData(['user', variables.userId], data);
      
      // Invalidate related queries
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['usersWithStats']);
      queryClient.invalidateQueries(['userStats']);
    },
    onError: (error: any) => {
      console.error('Failed to change user role:', error);
    },
  });
};

/**
 * Hook for bulk operations (if needed in the future)
 */
export const useBulkUserOperations = () => {
  const queryClient = useQueryClient();

  const invalidateAllUserQueries = () => {
    queryClient.invalidateQueries(['users']);
    queryClient.invalidateQueries(['usersWithStats']);
    queryClient.invalidateQueries(['userStats']);
  };

  return {
    invalidateAllUserQueries,
  };
};
