export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalNotes: number;
  systemUptime: string;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  apiResponseTime: number;
  databaseStatus: 'connected' | 'disconnected' | 'slow';
  memoryUsage: number;
  cpuUsage: number;
  uptime: string;
}

export interface RecentActivity {
  id: string;
  type: 'user_registration' | 'system_backup' | 'database_optimization' | 'security_scan';
  description: string;
  user: string;
  timestamp: Date;
}
