// Dashboard API Types based on real API documentation
export interface DashboardStatistics {
  totalUsers: number;
  activeUsers: number;
  totalNotes: number;
  averageNotesPerUser: number;
  newUsers: number;
  usersToday: number;
  notesToday: number;
}

export interface RegistrationTrend {
  date: string;
  count: number;
}

export interface Demographics {
  roleDistribution: {
    admin: number;
    user: number;
  };
  activityPatterns: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export interface UserAnalyticsData {
  registrationTrends: RegistrationTrend[];
  demographics: Demographics;
}

export interface CreationTrend {
  date: string;
  count: number;
}

export interface ActivityPatterns {
  averageLength: number;
  mostActiveHours: number[];
  topCategories: string[];
}

export interface NotesAnalyticsData {
  creationTrends: CreationTrend[];
  activityPatterns: ActivityPatterns;
}

export interface DatabaseHealth {
  status: string;
  connectionPool: {
    active: number;
    idle: number;
    max: number;
  };
  responseTime: string;
}

export interface SystemMetrics {
  uptime: string;
  memoryUsage: string;
  cpuUsage: string;
  diskUsage: string;
}

export interface ApiMetrics {
  requestsPerMinute: number;
  averageResponseTime: string;
  errorRate: string;
}

export interface SystemHealth {
  database: DatabaseHealth;
  system: SystemMetrics;
  api: ApiMetrics;
}

export interface ActivityDetails {
  ip?: string;
  userAgent?: string;
  noteId?: string;
  title?: string;
  [key: string]: any;
}

export interface Activity {
  id: string;
  type: 'user_login' | 'user_registration' | 'note_created' | 'note_updated' | 'note_deleted' | 'admin_action';
  userId: string;
  userEmail: string;
  timestamp: string;
  details?: ActivityDetails;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export interface RecentActivitiesData {
  activities: Activity[];
  pagination: Pagination;
}

export interface DashboardConfig {
  userId: string;
  theme: 'light' | 'dark';
  refreshInterval: number;
  widgets: string[];
  layout: 'grid' | 'list' | 'compact';
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDashboardConfigRequest {
  theme?: 'light' | 'dark';
  refreshInterval?: number;
  widgets?: string[];
  layout?: 'grid' | 'list' | 'compact';
}

export interface AnalyticsParams {
  days?: number;
  page?: number;
  limit?: number;
}

export interface ActivitiesParams {
  page?: number;
  limit?: number;
}

// Legacy types for backward compatibility
export interface RecentActivity extends Activity {}
