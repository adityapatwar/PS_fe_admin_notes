import { DashboardStats, SystemHealth, RecentActivity } from '../types';

// Mock data for development
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(500);
    return {
      totalUsers: 1234,
      activeUsers: 987,
      totalNotes: 5678,
      systemUptime: '99.9%',
    };
  },

  async getSystemHealth(): Promise<SystemHealth> {
    await delay(300);
    return {
      status: 'healthy',
      apiResponseTime: 125,
      databaseStatus: 'connected',
      memoryUsage: 68,
      cpuUsage: 45,
      uptime: '15 days',
    };
  },

  async getRecentActivity(): Promise<RecentActivity[]> {
    await delay(400);
    return [
      {
        id: '1',
        type: 'user_registration',
        description: 'New user registered',
        user: 'John Doe',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
      {
        id: '2',
        type: 'system_backup',
        description: 'System backup completed',
        user: 'System',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
      {
        id: '3',
        type: 'database_optimization',
        description: 'Database optimized',
        user: 'Admin',
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      },
    ];
  },
};
