import { apiService } from '../../../shared/services/api';
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
 * User management service with real API integration and empty state handling
 */
export const userService = {
  /**
   * Get paginated list of users
   */
  async getUsers(params: PaginationParams = {}): Promise<UsersListResponse> {
    const { page = 1, limit = 10 } = params;
    
    try {
      const response = await apiService.get<UsersListResponse>('/v1/users', {
        params: { page, limit }
      });

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch users');
      }

      return response.data;
    } catch (error: any) {
      // Handle 404 as empty state instead of error
      if (error?.status === 404 || error?.code === 404) {
        return {
          users: [],
          pagination: {
            page: page,
            limit: limit,
            total: 0
          }
        };
      }
      throw error;
    }
  },

  /**
   * Get users with statistics
   */
  async getUsersWithStats(params: PaginationParams = {}): Promise<UsersStatsResponse> {
    const { page = 1, limit = 15 } = params;
    
    try {
      const response = await apiService.get<UsersStatsResponse>('/v1/users/stats', {
        params: { page, limit }
      });

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch users with statistics');
      }

      return response.data;
    } catch (error: any) {
      // Handle 404 as empty state instead of error
      if (error?.status === 404 || error?.code === 404) {
        return {
          users: [],
          pagination: {
            page: page,
            limit: limit,
            total: 0
          }
        };
      }
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    const response = await apiService.get<User>(`/v1/users/${userId}`);

    if (!response.success || !response.data) {
      throw new Error(response.message || `User with id ${userId} not found`);
    }

    return response.data;
  },

  /**
   * Create new user
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await apiService.post<User>('/v1/users', userData);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to create user');
    }

    return response.data;
  },

  /**
   * Update user
   */
  async updateUser(userId: string, userData: UpdateUserRequest): Promise<User> {
    const response = await apiService.put<User>(`/v1/users/${userId}`, userData);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update user');
    }

    return response.data;
  },

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    const response = await apiService.delete(`/v1/users/${userId}`);

    if (!response.success) {
      throw new Error(response.message || 'Failed to delete user');
    }
  },

  /**
   * Change user role
   */
  async changeUserRole(userId: string, roleData: ChangeRoleRequest): Promise<User> {
    const response = await apiService.patch<User>(`/v1/users/${userId}/role`, roleData);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to change user role');
    }

    return response.data;
  },

  /**
   * Get user notes (mock implementation - adjust based on actual API)
   */
  async getUserNotes(userId: string): Promise<UserNote[]> {
    // This is a mock implementation since the API spec doesn't include notes endpoints
    // Replace with actual API call when available
    const mockUserNotes: UserNote[] = [
      {
        id: '1',
        userId: userId,
        title: 'Sample Note',
        content: 'This is a sample note for user ' + userId,
        category: 'work',
        priority: 'medium',
        tags: ['sample', 'note'],
        isArchived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUserNotes;
  },

  /**
   * Get user statistics (computed from users data with empty state handling)
   */
  async getUserStats(): Promise<UserStats> {
    try {
      // Get all users to compute statistics
      const usersResponse = await this.getUsersWithStats({ page: 1, limit: 1000 });
      const users = usersResponse.users;
      
      const totalUsers = usersResponse.pagination.total;
      
      // Handle empty state
      if (totalUsers === 0 || users.length === 0) {
        return {
          totalUsers: 0,
          activeUsers: 0,
          inactiveUsers: 0,
          adminUsers: 0,
          moderatorUsers: 0,
          regularUsers: 0,
          totalNotes: 0,
          averageNotesPerUser: 0,
          mostActiveUser: null,
        };
      }
      
      const activeUsers = users.filter(u => u.status === 'active').length;
      const inactiveUsers = totalUsers - activeUsers;
      const adminUsers = users.filter(u => u.role === 'admin').length;
      const moderatorUsers = users.filter(u => u.role === 'moderator').length;
      const regularUsers = users.filter(u => u.role === 'user').length;
      const totalNotes = users.reduce((sum, user) => sum + (user.notesCount || 0), 0);
      const averageNotesPerUser = totalUsers > 0 ? Math.round(totalNotes / totalUsers) : 0;
      
      // Find most active user
      const mostActiveUser = users.reduce((prev, current) => 
        ((prev?.notesCount || 0) > (current?.notesCount || 0)) ? prev : current
      );

      return {
        totalUsers,
        activeUsers,
        inactiveUsers,
        adminUsers,
        moderatorUsers,
        regularUsers,
        totalNotes,
        averageNotesPerUser,
        mostActiveUser: mostActiveUser ? {
          id: mostActiveUser.id,
          name: mostActiveUser.email.split('@')[0], // Use email prefix as name
          notesCount: mostActiveUser.notesCount || 0,
        } : null,
      };
    } catch (error: any) {
      // Handle 404 as empty state for statistics
      if (error?.status === 404 || error?.code === 404) {
        return {
          totalUsers: 0,
          activeUsers: 0,
          inactiveUsers: 0,
          adminUsers: 0,
          moderatorUsers: 0,
          regularUsers: 0,
          totalNotes: 0,
          averageNotesPerUser: 0,
          mostActiveUser: null,
        };
      }
      
      console.error('Failed to compute user statistics:', error);
      throw new Error('Failed to retrieve user statistics');
    }
  },
};
