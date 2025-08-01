import { apiService } from '../../../shared/services/api';

export interface DashboardStats {
  totalUsers: number;
  totalNotes: number;
  activeUsers: number;
  newUsers: number;
  notesToday: number;
  usersToday: number;
}

export interface DashboardStatistics {
  totalUsers: number;
  totalNotes: number;
  activeUsers: number;
  newUsers: number;
  notesToday: number;
  usersToday: number;
}

export interface SystemHealth {
  status: string;
  databaseStatus: string;
  uptime: string;
  memoryUsage: number;
  cpuUsage: number;
}

export interface ActivityItem {
  id: string;
  type: 'user_registered' | 'note_created' | 'user_login' | 'note_updated';
  description: string;
  timestamp: string;
  user?: {
    name: string;
    email: string;
  };
}

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await apiService.get('/dashboard/stats');
      return response.data || {
        totalUsers: 1247,
        totalNotes: 3892,
        activeUsers: 342,
        newUsers: 28,
        notesToday: 156,
        usersToday: 12,
      };
    } catch (error) {
      // Return mock data for development
      return {
        totalUsers: 1247,
        totalNotes: 3892,
        activeUsers: 342,
        newUsers: 28,
        notesToday: 156,
        usersToday: 12,
      };
    }
  },

  async getDashboardStatistics(): Promise<DashboardStatistics> {
    try {
      const response = await apiService.get('/dashboard/statistics');
      return response.data || {
        totalUsers: 1247,
        totalNotes: 3892,
        activeUsers: 342,
        newUsers: 28,
        notesToday: 156,
        usersToday: 12,
      };
    } catch (error) {
      // Return mock data for development
      return {
        totalUsers: 1247,
        totalNotes: 3892,
        activeUsers: 342,
        newUsers: 28,
        notesToday: 156,
        usersToday: 12,
      };
    }
  },

  async getSystemHealth(): Promise<SystemHealth> {
    try {
      const response = await apiService.get('/dashboard/health');
      return response.data || {
        status: 'healthy',
        databaseStatus: 'up',
        uptime: '7 days, 14 hours',
        memoryUsage: 68,
        cpuUsage: 23,
      };
    } catch (error) {
      // Return mock data for development
      return {
        status: 'healthy',
        databaseStatus: 'up',
        uptime: '7 days, 14 hours',
        memoryUsage: 68,
        cpuUsage: 23,
      };
    }
  },

  async getRecentActivity(): Promise<ActivityItem[]> {
    try {
      const response = await apiService.get('/dashboard/activity');
      return response.data || [];
    } catch (error) {
      // Return mock data for development
      const mockActivities: ActivityItem[] = [
        {
          id: '1',
          type: 'user_registered',
          description: 'New user registered',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          user: {
            name: 'John Doe',
            email: 'john@example.com'
          }
        },
        {
          id: '2',
          type: 'note_created',
          description: 'New note created',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          user: {
            name: 'Jane Smith',
            email: 'jane@example.com'
          }
        },
        {
          id: '3',
          type: 'user_login',
          description: 'User logged in',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          user: {
            name: 'Bob Wilson',
            email: 'bob@example.com'
          }
        },
        {
          id: '4',
          type: 'note_updated',
          description: 'Note updated',
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          user: {
            name: 'Alice Brown',
            email: 'alice@example.com'
          }
        },
        {
          id: '5',
          type: 'user_registered',
          description: 'New user registered',
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          user: {
            name: 'Charlie Davis',
            email: 'charlie@example.com'
          }
        }
      ];
      return mockActivities;
    }
  },
};
